import { inject, injectable } from 'tsyringe';

import Provider from '../infra/typeorm/entities/Provider';
import IProviderRepository from '../repositories/IProviderRepository';

@injectable()
export default class GetAllProviderService {
  constructor(
    @inject('ProviderRepository')
    private providerRepository: IProviderRepository
  ) {}

  public async execute(): Promise<Provider[] | undefined> {
    const provider = await this.providerRepository.find();
    return provider;
  }
}
