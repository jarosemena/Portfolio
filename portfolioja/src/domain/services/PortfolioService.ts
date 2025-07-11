import { IPortfolioRepository } from "../repositories/IPortfolioRepository";
import { PortfolioRepositoryFactory, DataSource } from "../repositories/PortfolioRepositoryFactory";
import { PortfolioState } from "../models/portfolioTypes";

export class PortfolioService {
  private repository: IPortfolioRepository;

  constructor(dataSource: DataSource = this.getDefaultDataSource()) {
    this.repository = PortfolioRepositoryFactory.createRepository(dataSource);
  }

  private getDefaultDataSource(): DataSource {
    // Puede basarse en variables de entorno o configuración
    return import.meta.env.MODE === 'production' ? 'api' : 'json';
  }

  async getPortfolioData(): Promise<PortfolioState> {
    return this.repository.getPortfolioData();
  }

  async updateAboutMe(data: Partial<PortfolioState['aboutMe']>): Promise<void> {
    return this.repository.updateAboutMe(data);
  }

  async addExperience(experience: ExperienceItem): Promise<void> {
    return this.repository.addExperience(experience);
  }

  // Otros métodos del servicio...
}