// src/tests/factories/PortfolioRepositoryFactory.test.ts
import { PortfolioRepositoryFactory } from '../../../domain/repositories/PortfolioRepositoryFactory';
import { ApiPortfolioRepository } from '../../../infrastructure/api/ApiPortfolioRepository';
import { JsonPortfolioRepository } from '../../../infrastructure/json/JsonPortfolioRepository';

jest.mock('../../../infrastructure/api/ApiPortfolioRepository');
jest.mock('../../../infrastructure/json/JsonPortfolioRepository');

describe('PortfolioRepositoryFactory', () => {
  it('should create API repository', () => {
    const repo = PortfolioRepositoryFactory.createRepository('api');
    expect(repo).toBeInstanceOf(ApiPortfolioRepository);
  });

  // Más pruebas...
});