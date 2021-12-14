import { hash } from 'bcryptjs';
import Customer from '@modules/customers/infra/typeorm/entities/Customer'
import IUser from '@modules/users/dtos/IUserDTO';
import ICustomerRepository from '../repositories/ICustomerRepository';
import { injectable, inject } from "tsyringe";

@injectable()
export default class CreateCustomerService {
  constructor(
    @inject("CustomerRepository")
    private CustomerRepository: ICustomerRepository
    ){}

  public async execute(newCustomer: IUser): Promise<Customer> {

    const checkcustomerExists =  await this.CustomerRepository.findByEmail(newCustomer.email);

    if (checkcustomerExists){
      throw new Error ('Email address already used');
    }
    const hashedPassword = await hash(newCustomer.password, 8);
    const customer = this.CustomerRepository.create({
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
