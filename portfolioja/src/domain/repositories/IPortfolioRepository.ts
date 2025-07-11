import { PortfolioState } from "../models/portfolioTypes";

export interface IPortfolioRepository {
  getPortfolioData(): Promise<PortfolioState>;
  updateAboutMe(data: Partial<PortfolioState['aboutMe']>): Promise<void>;
  addExperience(experience: ExperienceItem): Promise<void>;
  // ... otros métodos CRUD según necesidad
}