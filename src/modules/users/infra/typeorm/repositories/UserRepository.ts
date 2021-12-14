import IUserRepository from '@modules/users/repositories/IUserRepository';
import {getRepository, Repository} from 'typeorm';
import User from '../entities/User';
 
export default class UserRepository implements IUserRepository{
  private ormRepository : Repository<User>
  
  public constructor(){
    this.ormRepository = getRepository(User);
  }
  public async findByEmail(email: string): Promise<User | undefined>{
    const user = await this.ormRepository.findOne({
      where: {email}
    })
    return user;
  }
  public async findById(id: string): Promise<User | undefined>{
    const user = await this.ormRepository.findOne(id);
    return user;
  }
  public async save(user: User): Promise<User>{
    const updatedUser = await this.ormRepository.save(user);
    return updatedUser;
  }
}