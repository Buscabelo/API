import { inject, injectable } from 'tsyringe';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICustomerRepository from '../repositories/ICustomerRepository';

@injectable()
export default class FindAppointmentsByCustomerService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository,
  ) {}

  public async execute(id: string): Promise<Appointment[]> {
    const appointments = await this.customerRepository.findAppointmentsByCustomer(id);

    if(!appointments) {
      throw new Error ('no appointments found!');
    }

    return appointments;
  }
}
