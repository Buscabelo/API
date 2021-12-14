import ICustomerRepository from '../repositories/ICustomerRepository';
import { injectable, inject } from "tsyringe";

@injectable()
export default class GoogleAuthService {
  constructor(
    @inject("CustomerRepository")
    private CustomerRepository: ICustomerRepository
    ){}
  public async execute(userEmail: string): Promise<Boolean> {
    
    const checkcustomerExists =  await this.CustomerRepository.findByEmail(userEmail);
  
    if (checkcustomerExists){return true}
    return false;
  }
} 
