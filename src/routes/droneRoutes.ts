import { Router } from 'express';
import { DroneController } from '../controllers/droneController';

const router = Router();
const droneController = new DroneController();

router.post('/drones', droneController.registerDrone);
router.post('/drones/:id/load', droneController.loadDrone);
router.get('/drones/:id/battery', droneController.getDroneBattery);
router.get('/drones/available', droneController.getAvailableDrones);
router.get('/all-drones', droneController.getAllDrones);

export default router;
