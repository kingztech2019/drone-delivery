 
import { AppDataSource } from '../database';
import { Drone } from '../entities/drone';
import cron from 'node-cron';

// Function to check and log drone battery levels
const checkBatteries = async () => {
  try {
    const droneRepository = AppDataSource.getRepository(Drone);
    const drones = await droneRepository.find();

    drones.forEach((drone: Drone) => {
        console.log(`[${new Date().toISOString()}] Drone ID: ${drone.id}, Battery: ${drone.batteryCapacity}%`);
      });
      
  } catch (error) {
    console.error('Error while checking drone batteries:', error);
  }
};

// Schedule the cron job to run every hour
export const startBatteryCheckScheduler = () => {
  cron.schedule('* * * * *', () => {
    console.log('Running battery check cron job...');
    checkBatteries();
  });
}