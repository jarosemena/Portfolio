// src/tests/services/PortfolioService.test.ts
import { PortfolioService } from '../../../domain/services/PortfolioService';
import { mockPortfolioData } from '../testData.ts';

// Mock del repositorio
const mockRepository = {
  getPortfolioData: jest.fn(),
  updateAboutMe: jest.fn(),
  // ...otros métodos
};

jest.mock('../../infrastructure/factories/PortfolioRepositoryFactory', () => ({
  PortfolioRepositoryFactory: {
    createRepository: jest.fn(() => mockRepository)
  }
}));

describe('PortfolioService', () => {
  let service: PortfolioService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new PortfolioService();
  });

  describe('getPortfolioData', () => {
    it('should return data from repository', async () => {
      mockRepository.getPortfolioData.mockResolvedValue(mockPortfolioData);
      const result = await service.getPortfolioData();
      expect(result).toEqual(mockPortfolioData);
    });
  });

  // Más pruebas...
});