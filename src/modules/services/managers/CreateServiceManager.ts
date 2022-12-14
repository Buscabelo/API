import { inject, injectable } from 'tsyringe';

import Provider from '@modules/providers/infra/typeorm/entities/Provider';
import Service from '@modules/services/infra/typeorm/entities/Service';
import IServiceRepository from '../repositories/iServiceRepository';
import ICustomerRepository from '@modules/customers/repositories/ICustomerRepository';
import IProviderRepository from '@modules/providers/repositories/IProviderRepository';

interface IService{
  name: string;
  description: string;
  value: number;
  provider: Provider;
  type?: string;
}

@injectable()
export default class CreateServiceManager{
  constructor(
    @inject('ServiceRepository')
    private serviceRepository : IServiceRepository, 
    @inject('ProviderRepository')
    private providerRepository : IProviderRepository
  ) {}

  public async execute(newService:IService): Promise<Service> {
    const checkIsProvider = await this.providerRepository.findById(newService.provider.toString());
    if(!checkIsProvider){
      throw new Error ('User must be a provider');
    }

    const service = this.serviceRepository.create(newService);
    return service;
  }
}
