import 'reflect-metadata';

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Medication } from './medication';
 

export enum DroneState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  LOADED = 'LOADED',
  DELIVERING = 'DELIVERING',
  DELIVERED = 'DELIVERED',
  RETURNING = 'RETURNING'
}

@Entity()
export class Drone {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  serialNumber!: string;

  @Column()
  model!: string;

  @Column('float')
  weightLimit!: number;

  @Column('float')
  batteryCapacity!: number;

  @Column({
    type: 'enum',
    enum: DroneState,
    default: DroneState.IDLE,
  })
  state!: DroneState;

  @OneToMany(() => Medication, medication => medication.drone)
  medications!: Medication[];
}
