import Service from '../infra/typeorm/entities/Service';
import IServiceRepository from '../repositories/iServiceRepository';

export default class FindServiceByFilterManager {
  constructor(
    private serviceRepository: IServiceRepository
  ) { }
  public async execute(name: string | null = null, maxPrice: number | null = null, minPrice: number | null = null, serviceType: string | null = null): Promise<Service []> {
    
    const service = await this.serviceRepository.filterByArguments(name, maxPrice, minPrice, serviceType);

    if (!service) {
      throw new Error('no service found!');
    }

    return service;
  }
}
