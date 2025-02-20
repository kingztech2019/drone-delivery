const { mocked } = require('jest-mock');

jest.mock('./src/database', () => ({
  AppDataSource: {
    getRepository: jest.fn(),
  },
}));
