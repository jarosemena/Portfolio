import { PortfolioState } from "../models/portfolio/types";
import {ExperienceItem} from "../models/experience/types"
import { EducationItem } from "../models/education/types";
import { ProjectItem } from "../models/projects/types";

export interface IPortfolioRepository {
  getPortfolioData(): Promise<PortfolioState>;
  updateAboutMe(data: Partial<PortfolioState['aboutMe']>): Promise<void>;
  updateExperience(data: Array<{ id: string; updates: Partial<ExperienceItem> }>): Promise<void>;
  updateEducation(data: Array<{ id: string; updates: Partial<EducationItem> }>): Promise<void>;
  updateSkills(data: Partial<PortfolioState['skills']>): Promise<void>;
  updateProjects(data: Array<{ id: string; updates: Partial<ProjectItem> }>): Promise<void>;
  // ... otros métodos CRUD según necesidad
}