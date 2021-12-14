import Provider from '@modules/providers/infra/typeorm/entities/Provider';
import Service from '@modules/services/infra/typeorm/entities/Service';
import IServiceRepository from '../repositories/iServiceRepository';
import ICustomerRepository from '@modules/customers/repositories/ICustomerRepository';
import { inject, injectable } from 'tsyringe';

interface IService{
  name: string;
  description: string;
  value: number;
  provider: Provider;
}

@injectable()
export default class CreateServiceManager{
    constructor(
    @inject("CustomerRepository")
    @inject("ServiceRepostiory")
    private serviceRepository : IServiceRepository, 
    private customerRepository : ICustomerRepository
    ){}

  public async execute(newService:IService): Promise<Service> {
   
    const checkIsCustomer =  await this.customerRepository.findById(newService.provider.id);

    if(checkIsCustomer){
      throw new Error ('User must be a provider');
    }

    const service = this.serviceRepository.create(newService);

    return service;
  }
}
