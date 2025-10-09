// src/tests/infrastructure/api/ApiPortfolioRepository.test.ts
import { ApiPortfolioRepository } from '../../infrastructure/api/ApiPortfolioRepository';
import { mockPortfolioData } from '..s/testData';

describe('ApiPortfolioRepository', () => {
  let repository: ApiPortfolioRepository;
  const baseUrl = 'http://test-api.example.com';

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
    repository = new ApiPortfolioRepository(baseUrl);
  });

  describe('getPortfolioData', () => {
    it('should fetch portfolio data successfully', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockPortfolioData)
      });

      const result = await repository.getPortfolioData();
      
      expect(fetch).toHaveBeenCalledWith(`${baseUrl}/portfolio`);
      expect(result).toEqual(mockPortfolioData);
    });

    // Más pruebas...
  });

  // Pruebas para otros métodos...
});