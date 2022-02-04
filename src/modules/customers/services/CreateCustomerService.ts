import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import Customer from '@modules/customers/infra/typeorm/entities/Customer'
import IUser from '@modules/users/dtos/IUserDTO';
import ICustomerRepository from '../repositories/ICustomerRepository';

@injectable()
export default class CreateCustomerService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository
  ) {}

  public async execute(newCustomer: IUser): Promise<Customer> {
    const checkcustomerExists = await this.customerRepository.findByEmail(newCustomer.email);

    if (checkcustomerExists){
      throw new Error ('Email address already used');
    }
    const hashedPassword = await hash(newCustomer.password, 8);
    const customer = this.customerRepository.create({
      name: newCustomer.name,
      email: newCustomer.email,
      password: hashedPassword,
    });
  
    customer.then( customer => {
      customer.password = ''
    });
    
    return customer;
  }
}
