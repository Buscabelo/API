import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';

export default class GetAppointmentByIdService {
  constructor(
    private appointmentsRepository: IAppointmentRepository
    ){}

  public async execute(id : number): Promise<Appointment | undefined>{
    const appointment = await this.appointmentsRepository.findAppointmentById(id);
    return appointment;
  }
  }