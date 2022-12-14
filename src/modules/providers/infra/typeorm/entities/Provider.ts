import { ChildEntity, Column, OneToMany } from 'typeorm';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import Service from '@modules/services/infra/typeorm/entities/Service';
import Rating from '@modules/providers/infra/typeorm/entities/Rating';
import User from '@modules/users/infra/typeorm/entities/User';

@ChildEntity()
export default class Provider extends User {
  @Column()
  description: string;

  @Column()
  address: string;

  @Column({default: -5.81164, type: 'float'})
  latitude: number;

  @Column({default: -35.20317, type: 'float'})
  longitude: number;

  @Column({default: 5})
  rating_average: number;

  @OneToMany(() => Rating, rating => rating.provider)
  ratings: Rating[];

  @OneToMany(() => Service, service => service.provider)
  services: Service[];

  @OneToMany(() => Appointment, appointment => appointment.provider)
  appointments: Appointment[];
}

