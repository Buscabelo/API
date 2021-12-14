import {getRepository, Repository, ILike} from 'typeorm';
import Service from '../entities/Service';
import IServiceRepository from '@modules/services/repositories/iServiceRepository'
import IServiceDTO from '@modules/services/dtos/IServiceDTO';

export default class ServiceRepository implements IServiceRepository{
  private ormRepository : Repository<Service>
  
  public constructor(){
    this.ormRepository = getRepository(Service);
  }
  public async create(serviceDTO: IServiceDTO): Promise<Service>{
      const service = await this.ormRepository.create(serviceDTO);
      
      this.ormRepository.save(serviceDTO);

      return service;
  }
  public async findByProvider(provider: string): Promise<Service[] | undefined>{
    const services = await this.ormRepository.find({
      where: {
        provider,
      }
    });

    return services;
  }
  public async findById(id: number): Promise<Service | undefined>{
    const service = this.ormRepository.findOne(id);
    return service;
  }
  public async filterByName(name: any): Promise<Service []| undefined>{ 
   const services = await this.ormRepository.find({
      name: ILike(`%${name}%`)
    })
    return services;
  }
  public async update(id: number, data: IServiceDTO): Promise<Service | undefined>{
   this.ormRepository.update(id, data);
   const service = this.ormRepository.findOne({id: id});  
    
   return service;
  }
  public async delete(id:number): Promise<Service | undefined>{
    const service = this.ormRepository.findOne(id);
    this.ormRepository.delete(id);
    
    return service;
  }
}