import { injectable, inject } from 'tsyringe';

import ICustomerRepository from '../repositories/ICustomerRepository';

@injectable()
export default class GoogleAuthService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository
  ) {}

  public async execute(userEmail: string): Promise<Boolean> {
    const checkcustomerExists = await this.customerRepository.findByEmail(userEmail);
    return !!checkcustomerExists;
  }
} 
