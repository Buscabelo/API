import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment";
import IAppointmentDTO from "@modules/appointments/dtos/IAppointmentDTO";

export default interface IAppointmentRepository {
  create(data: IAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | null>;
  update(id: Number, data: any): Promise<Appointment | undefined>;
  getAllAppointments(): Promise<Appointment[] | undefined>;
  findAppointmentById(id: Number): Promise<Appointment | undefined>; 
}