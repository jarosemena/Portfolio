import { IPortfolioRepository } from "../repositories/IPortfolioRepository";
import { PortfolioRepositoryFactory, DataSource } from "../repositories/PortfolioRepositoryFactory";
import { PortfolioState } from "../models/portfolio/types";
import { ExperienceItem } from "../models/experience/types";
import { ProjectItem } from "../models/projects/types";
import { EducationItem } from "../models/education/types";

export class PortfolioService {
  private repository: IPortfolioRepository;

  constructor(dataSource: DataSource = this.getDefaultDataSource()) {
    this.repository = PortfolioRepositoryFactory.createRepository(dataSource);
  }

  private getDefaultDataSource(): DataSource {
    return 'json';
  }

  async getPortfolioData(): Promise<PortfolioState> {
    return this.repository.getPortfolioData();
  }

  async updateAboutMe(data: Partial<PortfolioState['aboutMe']>): Promise<void> {
    return this.repository.updateAboutMe(data);
  }

  async updateExperience(data: Array<{ id: string; updates: Partial<ExperienceItem> }>): Promise<void> {
    return this.repository.updateExperience(data);
  }

    async updateProjects(data: Array<{ id: string; updates: Partial<ProjectItem> }>): Promise<void> {
    return this.repository.updateProjects(data);
  }

    async updateEducation(data: Array<{ id: string; updates: Partial<EducationItem> }>): Promise<void> {
    return this.repository.updateEducation(data);
  }

    async updateSkills(data: Partial<PortfolioState['skills']>): Promise<void> {
    return this.repository.updateSkills(data);
  }

  // Otros métodos del servicio...
}