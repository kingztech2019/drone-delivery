import { AppDataSource } from '../../database';
import { DroneService } from '../droneService';
import { Drone } from '../../entities/drone';

jest.mock('../../database');

describe('DroneService', () => {
  let droneService: DroneService;
  let mockDroneRepository: any;

  beforeEach(() => {
    mockDroneRepository = {
      create: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
    };

    (AppDataSource.getRepository as jest.Mock).mockReturnValue(mockDroneRepository);
    droneService = new DroneService();
  });

  describe('registerDrone', () => {
    it('should register a drone', async () => {
      const droneData = { serialNumber: 'DRONE001', weightLimit: 500 };
      const drone = { id: 1, ...droneData };

      mockDroneRepository.create.mockReturnValue(drone);
      mockDroneRepository.save.mockResolvedValue(drone);

      const result = await droneService.registerDrone(droneData);
      expect(result).toEqual(drone);
    });
  });
});