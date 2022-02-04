import { inject, injectable } from 'tsyringe';

import Service from '@modules/services/infra/typeorm/entities/Service';
import IServiceRepository from '../repositories/iServiceRepository';

@injectable()
export default class FindByProviderManager{
  constructor(
    @inject('ServiceRepository')
    private serviceRepository : IServiceRepository
  ) {}

  public async execute(providerId: string): Promise<Service[] | undefined>{
    const services = await this.serviceRepository.findByProvider(providerId);
    return services;
  }
}
