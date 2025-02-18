import { Router } from 'express';
import { DroneController } from '../controllers/droneController';

/* This code snippet is setting up routes for a drone-related API using Express. */
const router = Router();
const droneController = new DroneController();

router.post('/drones', droneController.registerDrone);
router.post('/drones/:id/load', droneController.loadDrone);
router.get('/drones/:id/battery', droneController.getDroneBattery);
router.get('/drones/available', droneController.getAvailableDrones);
router.get('/all-drones', droneController.getAllDrones);
router.get('/all-drones/with-medications', droneController.getAllDronesWithMedications);

export default router;
