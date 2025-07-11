import { IPortfolioRepository } from "./IPortfolioRepository";
import { ApiPortfolioRepository } from "../../infrastructure/api/ApiPortfolioRepository";
import { JsonPortfolioRepository } from "../../infrastructure/json/JsonPortfolioRepository";
//import { DbPortfolioRepository } from "../../infrastructure/database/DbPortfolioRepository";

export type DataSource = 'api' | 'json' | 'database';

export class PortfolioRepositoryFactory {
  static createRepository(source: DataSource): IPortfolioRepository {
    switch (source) {
      case 'api':
        return new ApiPortfolioRepository();
      case 'json':
        return new JsonPortfolioRepository();
      //case 'database':
      //  return new DbPortfolioRepository();
      default:
        throw new Error(`Unsupported data source: ${source}`);
    }
  }
}