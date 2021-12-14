import { ChildEntity, OneToMany } from 'typeorm';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import User from '@modules/users/infra/typeorm/entities/User';

@ChildEntity()
export default class Customer extends User {
  @OneToMany(() => Appointment, (appointment) => appointment.customer)
  appointments: Appointment[];
}
