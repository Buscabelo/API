import { startOfHour } from 'date-fns';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import IAppointmentDTO from '../dtos/IAppointmentDTO';
import { injectable, inject } from 'tsyringe';

@injectable()
export default class CreateAppointmentService {
  constructor(
    @inject("AppointmentRepository")
    private appointmentsRepository: IAppointmentRepository
    ){}
  public async execute({
    provider,
    customer,
    appointment_to,
    scheduled_at,
    service
  }: IAppointmentDTO): Promise<Appointment> {

    const appointmentDate = startOfHour(appointment_to);

    const scheduledDate = startOfHour(scheduled_at);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );


    if (findAppointmentInSameDate) {
      throw Error("this time it's already booked");
    }

    const appointment = await this.appointmentsRepository.create({
      provider,
      customer,
      service,
      appointment_to: appointmentDate,
      scheduled_at: scheduledDate,
    });

    return appointment;
  }
}