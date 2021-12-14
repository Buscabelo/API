import Service from '@modules/services/infra/typeorm/entities/Service';
import { injectable, inject } from 'tsyringe';
import IServiceRepository from '../repositories/iServiceRepository';

@injectable()
export default class FindByProviderManager{
  constructor(
    @inject("ServiceRepostiory")
    private serviceRepository : IServiceRepository
    ){}

  public async execute(providerId: string): Promise<Service[] | undefined>{

    const services = await this.serviceRepository.findByProvider(providerId);

    return services;
  }
}