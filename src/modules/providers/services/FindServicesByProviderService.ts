import Service from '@modules/services/infra/typeorm/entities/Service';
import { injectable, inject } from 'tsyringe';
import IProviderRepository from '../repositories/IProviderRepository';

@injectable()
export default class FindServicesByProviderService {
  constructor(
    @inject("ProviderRepository")
    private providerRepository: IProviderRepository
    ){}

  public async execute(id: string): Promise<Service[]> {
    const provider = await this.providerRepository.findById(id);
    const services = provider?.services;

    if(!services) {
      throw new Error ('no services found!');
    }

    return services;
  }

}