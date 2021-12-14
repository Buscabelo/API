import { ChildEntity, Column, OneToMany } from 'typeorm';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import Service from '@modules/services/infra/typeorm/entities/Service';
import User from '@modules/users/infra/typeorm/entities/User';

@ChildEntity()
export default class Provider extends User {
  @Column()
  description: string;

  @Column()
  address: string;

  @Column({ type: "float" })
  rating_average: number;

  @OneToMany(() => Service, service => service.provider)
  services: Service[];

  @OneToMany(() => Appointment, appointment => appointment.provider)
  appointments: Appointment[];
}

