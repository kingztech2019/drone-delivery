import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Drone } from './entities/drone';
import { Medication } from './entities/medication';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: ':memory:',  
  entities: [Drone, Medication],
  synchronize: true,  
  logging: false,
});

AppDataSource.initialize()
  .then(() => console.log('Database connection established'))
  .catch((err) => console.error('Database connection failed:', err));
