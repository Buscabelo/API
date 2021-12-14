import path from 'path';
import fs from 'fs';
import uploadConfig from '@config/upload'
import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository';
import { injectable, inject } from 'tsyringe';

interface Request{
  user_id: string,
  avatarFileName?: string,
}
injectable()
export default class UpdateAvatarService {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
    ){}
  public async execute({user_id, avatarFileName}: Request): Promise<User>{

    const user = await this.userRepository.findByEmail(user_id);

    if (!user){
      throw new Error('You should be authenticated to get this');
    }

    if (user.avatar){
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists){
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    user.avatar = avatarFileName as string;
    this.userRepository.save(user);

    return user;
  }

}