import { AppDataSource } from '../data-source'; // Update with your actual data source import
import { Drone, DroneState } from '../entities/drone';
import { Medication } from '../entities/medication';
import { MoreThanOrEqual } from 'typeorm';

export class DroneService {
  async registerDrone(droneData: Partial<Drone>) {
    const droneRepository = AppDataSource.getRepository(Drone);
    const drone = droneRepository.create(droneData);
    return droneRepository.save(drone);
  }

  async loadDroneWithMedications(droneId: number, medications: Medication[]) {
    const droneRepository = AppDataSource.getRepository(Drone);
    const drone = await droneRepository.findOne({
      where: { id: droneId },
      relations: ['medications'],
    });

    if (!drone) {
      throw new Error('Drone not found');
    }

    if (drone.state === DroneState.LOADING || drone.state === DroneState.LOADED) {
      throw new Error('Drone is already loading or loaded');
    }

    if (drone.batteryCapacity < 25) {
      throw new Error('Drone battery too low to load');
    }

    const totalWeight = medications.reduce((acc, med) => acc + med.weight, 0);
    if (totalWeight > drone.weightLimit) {
      throw new Error('Exceeds weight limit');
    }

    drone.state = DroneState.LOADING;
    drone.medications = medications;
    await droneRepository.save(drone);
    drone.state = DroneState.LOADED;
    return drone;
  }

  async getDroneBatteryLevel(droneId: number) {
    const droneRepository = AppDataSource.getRepository(Drone);
    const drone = await droneRepository.findOneBy({ id: droneId });
    if (!drone) {
      throw new Error('Drone not found');
    }
    return drone.batteryCapacity;
  }

  async getAvailableDrones() {
    const droneRepository = AppDataSource.getRepository(Drone);
    return droneRepository.find({
      where: { state: DroneState.IDLE, batteryCapacity: MoreThanOrEqual(25) },
    });
  }
}
