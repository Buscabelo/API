import { injectable, inject } from 'tsyringe';
import IServiceDTO from '../dtos/IServiceDTO';
import IServiceRepository from '../repositories/iServiceRepository';

@injectable()
export default class UpdateServiceManager{
  constructor(
    @inject("ServiceRepostiory")
    private serviceRepository : IServiceRepository
    ){}

  public async execute(id: number, updateService : IServiceDTO){
    
    const service = this.serviceRepository.update(id, updateService);

    return service;
  }

}
