import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICustomerRepository from '../repositories/ICustomerRepository';
import { injectable, inject } from "tsyringe";

@injectable()
export default class FindAppointmentsByCustomerService {
  constructor(
    @inject("CustomerRepository")
    private CustomerRepository: ICustomerRepository
    ){}

  public async execute(id: string): Promise<Appointment[]> {
    const appointments = await this.CustomerRepository.findAppointmentsByCustomer(id);

    if(!appointments) {
      throw new Error ('no services found!');
    }
    return appointments;
  }
}
