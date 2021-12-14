import {getRepository, Repository, ILike} from 'typeorm';
import IProviderRepository from '@modules/providers/repositories/IProviderRepository'
import Provider from '../entities/Provider';
import IUserDTO from '@modules/users/dtos/IUserDTO';

export default class ProviderRepository implements IProviderRepository{
  private ormRepository : Repository<Provider>
  
  public constructor(){
    this.ormRepository = getRepository(Provider);
  }
  public async create(userDTO: IUserDTO): Promise<Provider>{
      const provider = await this.ormRepository.create(userDTO);
      
      this.ormRepository.save(userDTO);

      return provider;
  }
  public async findById(id: string): Promise<Provider | undefined>{
    const provider = await this.ormRepository.findOne(id);
    return provider;
  }
  public async find(): Promise<Provider[] | undefined>{
    const providers = await this.ormRepository.find();

    return providers;
  }
  public async findByEmail(email: string): Promise<Provider | undefined>{
    const provider = await this.ormRepository.findOne({
      where: {email}
    })
    return provider;
  }
  public async filterByName(name: string): Promise<Provider[] | undefined>{
    const providers = await this.ormRepository.find({
      name: ILike(`%${name}%`)
    });
    return providers;
  }
}