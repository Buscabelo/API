import {getRepository, Repository} from 'typeorm';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import IAppointmentDTO from '@modules/appointments/dtos/IAppointmentDTO';
 
export default class AppointmentRepository implements IAppointmentRepository{
  private ormRepository : Repository<Appointment>
  
  public constructor(){
    this.ormRepository = getRepository(Appointment);
  }
  public async getAllAppointments(): Promise<Appointment[] | undefined> {
    const appointments = await this.ormRepository.find();
    return appointments;
  }
  public async findAppointmentById(id: number): Promise<Appointment | undefined> {
    const appointment = await this.ormRepository.findOne({id: id})
    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await this.ormRepository.findOne({
      where: {appointment_to: date}
    }); 
    
    return findAppointment || null;
  }
  public async create({provider, customer, 
    appointment_to, scheduled_at}: IAppointmentDTO): Promise<Appointment>{
      const appointment = await this.ormRepository.create({
        provider,
        customer,
        appointment_to,
        scheduled_at
      });
      
      this.ormRepository.save(appointment);

      return appointment;
  }
  public async update(id: number, updateAppointment: any ): Promise<Appointment | undefined>{
    await this.ormRepository.update(id, updateAppointment);
    const appointment = await this.ormRepository.findOne({id : id});
    return appointment;
  }
}