import {Entity, Column, PrimaryGeneratedColumn, TableInheritance} from 'typeorm';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export default abstract class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
  
  @Column({
    unique:true,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    nullable:true,
  })
  avatar: string;

}
