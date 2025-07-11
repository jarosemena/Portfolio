import { PortfolioState } from "../models/portfolio/types";

export interface IPortfolioRepository {
  getPortfolioData(): Promise<PortfolioState>;
  updateAboutMe(data: Partial<PortfolioState['aboutMe']>): Promise<void>;
  updateExperience(experience: Partial<PortfolioState['experience']>): Promise<void>;
  updateEducation(experience: Partial<PortfolioState['education']>): Promise<void>;
  updateSkills(experience: Partial<PortfolioState['skills']>): Promise<void>;
  updateProjects(experience: Partial<PortfolioState['projects']>): Promise<void>;
  // ... otros métodos CRUD según necesidad
}