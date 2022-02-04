import { inject, injectable } from 'tsyringe';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';

@injectable()
export default class GetAppointmentByIdService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentsRepository: IAppointmentRepository
  ) {}

  public async execute(id : number): Promise<Appointment | undefined>{
    const appointment = await this.appointmentsRepository.findAppointmentById(id);
    return appointment;
  }
}
