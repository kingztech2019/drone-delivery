import { Request, Response } from 'express';
import { DroneService } from '../services/droneService';

const droneService = new DroneService();

/* The DroneController class in TypeScript contains methods for registering drones, loading drones with
medications, getting drone battery levels, and retrieving available drones. */
export class DroneController {
  private droneService: DroneService;
  
  constructor(droneService?: DroneService) {
    this.droneService = droneService || new DroneService();
  }

  async registerDrone(req: Request, res: Response) {
    try {
      const drone = await this.droneService.registerDrone(req.body);
      res.status(201).json(drone);
    } catch (error:any) {
      res.status(400).json({ message: error.message });
    }
  }

  async loadDrone(req: Request, res: Response) {
    try {
      const droneId = Number(req.params.id);
      const medications = req.body.medications;
      console.log(medications);
      
      const drone = await this.droneService.loadDroneWithMedications(droneId, medications);
      res.status(200).json(drone);
    } catch (error:any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getDroneBattery(req: Request, res: Response) {
    try {
      const droneId = Number(req.params.id);
      const batteryLevel = await this.droneService.getDroneBatteryLevel(droneId);
      res.status(200).json({ batteryLevel });
    } catch (error:any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAvailableDrones(req: Request, res: Response) {
    try {
      const drones = await this.droneService.getAvailableDrones();
      res.status(200).json(drones);
    } catch (error:any) {
      res.status(400).json({ message: error.message });
    }
  }
  async getAllDrones(req: Request, res: Response) {
    try {
      const drones = await this.droneService.getAllDrones();
      res.status(200).json(drones);
    } catch (error:any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAllDronesWithMedications(req: Request, res: Response) {
    try {
      const drones = await this.droneService.getAllDronesWithMedications();
      res.status(200).json(drones);
    } catch (error:any) {
      res.status(400).json({ message: error.message });
    }
  }
}
