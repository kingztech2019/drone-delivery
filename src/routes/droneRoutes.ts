import { Router } from 'express';
import { DroneController } from '../controllers/droneController';

/* This code snippet is setting up routes for a drone-related API using Express. */
const router = Router();
const droneController = new DroneController();

router.post('/drones', (req, res) => droneController.registerDrone(req, res));
router.post('/drones/:id/load', (req, res) => droneController.loadDrone(req, res));
router.get('/drones/:id/battery', (req, res) => droneController.getDroneBattery(req, res));
router.get('/drones/available', (req, res) => droneController.getAvailableDrones(req, res));
router.get('/all-drones', (req, res) => droneController.getAllDrones(req, res));
router.get('/all-drones/with-medications', (req, res) => droneController.getAllDronesWithMedications(req, res));

export default router;
