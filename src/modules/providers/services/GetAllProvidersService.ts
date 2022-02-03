import Provider from '../infra/typeorm/entities/Provider';
import IProviderRepository from '../repositories/IProviderRepository';

export default class GetAllProviderService {
  constructor(
    private providerRepository: IProviderRepository
    ){}

  public async execute(): Promise<Provider[] | undefined> {
    const provider = await this.providerRepository.find();
    return provider;
  }

}