import { AppDataSource } from '../database';
import { Drone, DroneState } from '../entities/drone';
import { Medication } from '../entities/medication';

 
/**
 * The function `loadDummyData` seeds dummy data for drones and medications if no drones exist in the
 * repository.
 * @returns If there are existing drones in the database, the function will log 'Dummy data already
 * loaded. Skipping seeding.' and return without inserting any new data. If there are no existing
 * drones, it will insert the dummy drone and medication data into the database and log 'Drones seeded
 * successfully!' and 'Medications seeded successfully!'.
 */
export const loadDummyData = async () => {
  const droneRepository = AppDataSource.getRepository(Drone);
  const medicationRepository = AppDataSource.getRepository(Medication);

  // Check if drones already exist
  const existingDrones = await droneRepository.count().catch(() => 0);
  if (existingDrones > 0) {
    console.log('Dummy data already loaded. Skipping seeding.');
    return;
  }
  

  // Drones data
  const drones = [
    {
      serialNumber: 'DRONE001',
      model: 'Lightweight',
      weightLimit: 450,
      batteryCapacity: 80,
      state: DroneState.IDLE,
    },
    {
      serialNumber: 'DRONE002',
      model: 'Middleweight',
      weightLimit: 400,
      batteryCapacity: 60,
      state: DroneState.IDLE,
    },
    {
      serialNumber: 'DRONE003',
      model: 'Cruiserweight',
      weightLimit: 300,
      batteryCapacity: 40,
      state: DroneState.LOADING,
    },
    {
      serialNumber: 'DRONE004',
      model: 'Heavyweight',
      weightLimit: 500,
      batteryCapacity: 20,
      state: DroneState.RETURNING,
    },
  ];

  // Medications data
  const medications = [
    {
      name: 'Paracetamol-500',
      weight: 50,
      code: 'MED_001',
      image: 'https://via.placeholder.com/150',
    },
    {
      name: 'Ibuprofen-400',
      weight: 40,
      code: 'MED_002',
      image: 'https://via.placeholder.com/150',
    },
    {
      name: 'Aspirin-300',
      weight: 30,
      code: 'MED_003',
      image: 'https://via.placeholder.com/150',
    },
    {
      name: 'Antibiotic-250',
      weight: 25,
      code: 'MED_004',
      image: 'https://via.placeholder.com/150',
    },
  ];

  // Insert drones
  await droneRepository.save(drones);
  console.log('Drones seeded successfully!');

  // Insert medications
  await medicationRepository.save(medications);
  console.log('Medications seeded successfully!');
};
