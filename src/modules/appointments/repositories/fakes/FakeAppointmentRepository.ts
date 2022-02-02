import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import IAppointmentDTO from '@modules/appointments/dtos/IAppointmentDTO';
import {isEqual} from 'date-fns'

export default class AppointmentRepository implements IAppointmentRepository{
  private appointments: Appointment [] = [];

  public async getAllAppointments(): Promise<Appointment[] | undefined> {
    return this.appointments;
  }
  public async findAppointmentById(id: number): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(
        appointment => appointment.id = id 
    )
    return findAppointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(
        appointment => isEqual(appointment.appointment_to,date) 
    )
    return findAppointment;
  }
  public async create({provider, customer, 
    appointment_to, scheduled_at}: IAppointmentDTO): Promise<Appointment>{
      const appointment = new Appointment();
      Object.assign(appointment, {
          provider,
          customer,
          appointment_to,
          scheduled_at,
      })
      this.appointments.push(appointment)
      return appointment;
  }
  public async update(id: number, updateAppointment: any ): Promise<Appointment | undefined>{
    let findAppointment = this.appointments.find(
        appointment => appointment.id = id
    )
    return findAppointment;
  }
}