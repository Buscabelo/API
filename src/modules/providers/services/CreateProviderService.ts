import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import Provider from '../infra/typeorm/entities/Provider';
import IProviderRepository from '../repositories/IProviderRepository';

export default interface IUser {
  name: string,
  email: string;
  password: string;
}

@injectable()
export default class CreateProviderService {
  constructor(
    @inject('ProviderRepository')
    private providerRepository: IProviderRepository
  ) {}

  public async execute(newProvider: any): Promise<Provider> {
    const checkProviderExists =  await this.providerRepository.findByEmail(newProvider.email);

    if (checkProviderExists)
      throw new Error ('Email address already used');

    const hashedPassword = await hash(newProvider.password, 8);
    const provider = this.providerRepository.create({
      name: newProvider.name,
      email: newProvider.email,
      password: hashedPassword,
      description: newProvider.description,
      address: newProvider.address
    });
  
    provider.then(provider => {
      provider.password = '';
    });
    
    return provider;
  }
}
