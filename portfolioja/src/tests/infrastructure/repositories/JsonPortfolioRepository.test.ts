// src/tests/infrastructure/json/JsonPortfolioRepository.test.ts
import { JsonPortfolioRepository } from '../../../../infrastructure/json/JsonPortfolioRepository';
import { mockPortfolioData } from '../../../testData';

jest.mock('../../../../../public/data/portfolio.json', () => mockPortfolioData, { virtual: true });

describe('JsonPortfolioRepository', () => {
  let repository: JsonPortfolioRepository;

  beforeEach(() => {
    jest.useFakeTimers();
    repository = new JsonPortfolioRepository();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('getPortfolioData', () => {
    it('should return portfolio data with delay', async () => {
      const promise = repository.getPortfolioData();
      jest.advanceTimersByTime(300);
      const result = await promise;
      expect(result).toEqual(mockPortfolioData);
    });
  });

  // Pruebas para otros métodos...
});