import { injectable, inject } from 'tsyringe';

import Customer from '@modules/customers/infra/typeorm/entities/Customer'
import ICustomerRepository from '../repositories/ICustomerRepository';

@injectable()
export default class GetAllCustomerService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository
  ) {}
  
  public async execute(): Promise<Customer[] | undefined>{
    const users = await this.customerRepository.find();
    return users;
  }
}
