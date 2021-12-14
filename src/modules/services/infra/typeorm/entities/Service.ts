import {
  Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import Provider from '@modules/providers/infra/typeorm/entities/Provider';
import Image from './Image';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

export enum Type{
  Haircut = 'Corte',
  Haircare = 'Tratamento',
  Barb = 'Barba',
  Default = ''
}
@Entity()
export default class Service {
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'float' })
  value: number;

  @Column({
    type: 'enum',
    enum: Type,
    default: Type.Default,
  })
  type: Type;

  @ManyToOne((type) => Provider, (provider) => provider.services, { eager: true })
  provider: Provider

  @OneToMany(() => Image, (image) => image.service)
  images: Image [];

  @OneToMany(() => Appointment, (appointment) => appointment.provider)
  appointments: Appointment[];
}
