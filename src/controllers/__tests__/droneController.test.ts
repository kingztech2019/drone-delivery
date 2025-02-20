import { Request, Response } from 'express';
import { DroneController } from '../droneController';
import { DroneService } from '../../services/droneService';
import { Drone, DroneState } from '../../entities/drone';

jest.mock('../../services/droneService');

describe('DroneController', () => {
  let droneController: DroneController;
  let mockDroneService: jest.Mocked<DroneService>;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    mockDroneService = new DroneService() as jest.Mocked<DroneService>;
    droneController = new DroneController();
    (droneController as any).droneService = mockDroneService;

    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe('registerDrone', () => {
    it('should register a drone and return 201', async () => {
      const mockDrone: Drone = {
        id: 1,
        serialNumber: 'DRONE001',
        model: 'Lightweight',
        weightLimit: 500,
        batteryCapacity: 100,
        state: DroneState.IDLE,
        medications: [],
      };

      // Mock the registerDrone method to return the mockDrone
      mockDroneService.registerDrone.mockResolvedValue(mockDrone);
      req.body = mockDrone;

      await droneController.registerDrone(req as Request, res as Response);
      // Log the arguments passed to res.json
               

      // Verify the response
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockDrone);
    });
  });
});