import { inject, injectable } from 'tsyringe';

import IServiceRepository from '../repositories/iServiceRepository';

@injectable()
export default class DeleteServiceManager{
  constructor(
    @inject('ServiceRepository')
    private serviceRepository : IServiceRepository
  ) {}

  public async execute(id: number){
    const service = this.serviceRepository.delete(id);
    return service;
  }
}
