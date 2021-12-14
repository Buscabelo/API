import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import Customer from "@modules/customers/infra/typeorm/entities/Customer";
import Provider from "@modules/providers/infra/typeorm/entities/Provider";
import Service from "@modules/services/infra/typeorm/entities/Service";
import Rating from '@modules/appointments/infra/typeorm/entities/Rating';

@Entity()
export default class Appointment{
  @PrimaryGeneratedColumn()
  id:number;

  @Column('timestamp')
  scheduled_at: Date;

  @Column('timestamp')
  appointment_to: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  time_done_at: Date;

  @Column({
    type:'timestamp',
    nullable:true,
  })
  canceled_at: Date;

  @ManyToOne(() => Provider, (provider) => provider.appointments, {
    eager: true
  })
  provider: Provider;

  @ManyToOne(() => Customer, (customer) => customer.appointments, {
    eager: true
  })
  customer: Customer;

  @ManyToOne(() => Service, (service) => service.appointments, {
    eager: true
  })
  service: Service;

  @ManyToOne(() => Rating, (rating) => rating.appointments)
  rating: Rating;
}
