import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import  Service  from "./Service";

@Entity()
export default class Image{
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  url: string;

  @ManyToOne(() => Service, service => service.images)
  service: Service
}



