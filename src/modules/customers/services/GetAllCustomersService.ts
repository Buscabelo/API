import Customer from '@modules/customers/infra/typeorm/entities/Customer'
import ICustomerRepository from '../repositories/ICustomerRepository';
import { injectable, inject } from "tsyringe";

@injectable()
export default class GetAllCustomerService {
  constructor(
    @inject("CustomerRepository")
    private CustomerRepository: ICustomerRepository
    ){}
  
  public async execute(): Promise<Customer[] | undefined>{
    const users = await this.CustomerRepository.find();
    return users;
  }
}
