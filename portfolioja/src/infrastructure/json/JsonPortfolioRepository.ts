import { IPortfolioRepository } from "../../domain/repositories/IPortfolioRepository";
import { PortfolioState } from "../../domain/models/portfolio/types";
import portfolioData from '../../../public/data/portfolio.json'; // Datos locales

export class JsonPortfolioRepository implements IPortfolioRepository {
  private data: PortfolioState;

  constructor() {
    this.data = portfolioData as PortfolioState;
  }

  async getPortfolioData(): Promise<PortfolioState> {
    // Simulamos un retardo de red
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.data);
      }, 300);
    });
  }

  async updateAboutMe(data: Partial<PortfolioState['aboutMe']>): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.data.aboutMe = { ...this.data.aboutMe, ...data };
        console.log("AboutMe updated locally:", this.data.aboutMe);
        resolve();
      }, 200);
    });
  }

  async updateExperience(data: Partial<PortfolioState['experience']>): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.data.experience = { ...this.data.experience, ...data };
        console.log("experience updated locally:", this.data.experience);
        resolve();
      }, 200);
    });
  }

  async updateProjects(data: Partial<PortfolioState['projects']>): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.data.projects = { ...this.data.projects, ...data };
        console.log("projects updated locally:", this.data.projects);
        resolve();
      }, 200);
    });
  }

  async updateEducation(data: Partial<PortfolioState['education']>): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.data.education = { ...this.data.education, ...data };
        console.log("education updated locally:", this.data.education);
        resolve();
      }, 200);
    });
  }

  async updateSkills(data: Partial<PortfolioState['skills']>): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.data.skills = { ...this.data.skills, ...data };
        console.log("skills updated locally:", this.data.skills);
        resolve();
      }, 200);
    });
  }

 

  // Implementar otros métodos...
}