import { inject, injectable } from 'tsyringe';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';

@injectable()
export default class GetAllAppointmentsService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentsRepository: IAppointmentRepository
  ) {}

  public async execute(): Promise<Appointment[] | undefined>{
    const appointments = await this.appointmentsRepository.getAllAppointments()
    return appointments;
  }
}
