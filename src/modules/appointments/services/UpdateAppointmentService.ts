import { inject, injectable } from 'tsyringe';

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';

@injectable()
export default class UpdateAppointmentService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentsRepository: IAppointmentRepository
  ) {}

  public async execute(id: number, updateAppointment : any){
    await this.appointmentsRepository.update(id, updateAppointment);
    const currenteAppointment = await this.appointmentsRepository.findAppointmentById(id);
    return currenteAppointment;
  }
}
