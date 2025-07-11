import { IPortfolioRepository } from "../repositories/IPortfolioRepository";
import { PortfolioRepositoryFactory, DataSource } from "../repositories/PortfolioRepositoryFactory";
import { PortfolioState } from "../models/portfolio/types";

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

  async updateExperience(data: Partial<PortfolioState['experience']>): Promise<void> {
    return this.repository.updateExperience(data);
  }

    async updateProjects(data: Partial<PortfolioState['projects']>): Promise<void> {
    return this.repository.updateProjects(data);
  }

    async updateEducation(data: Partial<PortfolioState['education']>): Promise<void> {
    return this.repository.updateEducation(data);
  }

    async updateSkills(data: Partial<PortfolioState['skills']>): Promise<void> {
    return this.repository.updateSkills(data);
  }

  // Otros métodos del servicio...
}