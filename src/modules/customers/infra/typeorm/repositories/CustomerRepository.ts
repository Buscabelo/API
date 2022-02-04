import {getRepository, Repository} from 'typeorm';
import Customer from '../entities/Customer';
import ICustomerRepository from '@modules/customers/repositories/ICustomerRepository'
import IUserDTO from '@modules/users/dtos/IUserDTO';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
 
export default class CustomerRepository implements ICustomerRepository{
  private ormRepository : Repository<Customer>
  private appointmentRepository : Repository<Appointment>
  
  public constructor(){
    this.ormRepository = getRepository(Customer);
    this.appointmentRepository = getRepository(Appointment);
  }
  public async create(userDTO: IUserDTO): Promise<Customer>{
      const customer = await this.ormRepository.create(userDTO);
      
      this.ormRepository.save(userDTO);

      return customer;
  }
  public async findById(id: string): Promise<Customer | undefined>{
    const customer = await this.ormRepository.findOne(id);
    return customer;
  }
  public async find(): Promise<Customer[] | undefined>{
    const customers = await this.ormRepository.find();

    return customers;
  }
  public async findByEmail(email: string): Promise<Customer | undefined>{
    const customer = await this.ormRepository.findOne({
      where: {email}
    })
    return customer;
  }
  public async findAppointmentsByCustomer(id: string): Promise<Appointment[] | undefined>{
    const appointments = await this.appointmentRepository.find({
      customer: {id: id}
    });
    return appointments; 
  }
}
