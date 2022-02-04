import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository';
import IStorageProvider from '@shared/containers/providers/StorageProvider/models/IStorageProvider';
import { inject, injectable } from 'tsyringe';

interface Request{
  user_id: string,
  avatarFileName?: string,
}

@injectable()
export default class UpdateAvatarService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('S3StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  public async execute({user_id, avatarFileName}: Request): Promise<User>{
    const user = await this.userRepository.findById(user_id);
    if (!user){
      throw new Error('You should be authenticated to get this');
    }

    if (user.avatar){
      await this.storageProvider.deleteFile(user.avatar);
    }
    const fileName = await this.storageProvider.saveFile(avatarFileName!);

    user.avatar = `https://buscabelo-cdn.s3.amazonaws.com/${fileName}`;
    await this.userRepository.save(user);
    
    return user;
  }
}
