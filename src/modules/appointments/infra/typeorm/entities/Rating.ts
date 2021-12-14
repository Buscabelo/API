import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Appointment from "./Appointment";
import Customer from "@modules/customers/infra/typeorm/entities/Customer";

@Entity()
export default class Rating{
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ nullable: true })
  description: string;

  @Column()
  rating_number: number;

  @ManyToMany(type => Customer, {eager: true})
  customer: Customer;

  @OneToMany(() => Appointment, appointment => appointment.rating)
  appointments: Appointment[];
}
