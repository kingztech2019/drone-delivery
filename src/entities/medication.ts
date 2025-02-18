import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Drone } from './drone';

@Entity()
export class Medication {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column('float')
  weight!: number;

  @Column()
  code!: string;

  @Column()
  image!: string;

  @ManyToOne(() => Drone, drone => drone.medications)
  drone!: Drone;
}
