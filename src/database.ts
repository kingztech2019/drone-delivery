import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Drone } from './entities/drone';
import { Medication } from './entities/medication';

/* This code snippet is setting up a data source using TypeORM for a TypeScript project.   */
export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'databases.sqlite',  
    entities: [Drone, Medication],  
    synchronize: false, // Automatically creates tables based on your entities
    logging: true,
    migrations: ['src/migrations/*.ts'],
  });
  
  AppDataSource.initialize()
    .then(() => console.log('Database connection established'))
    .catch((err) => console.error('Database connection failed:', err));
  