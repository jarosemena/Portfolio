import { IPortfolioRepository } from "../../domain/repositories/IPortfolioRepository";
import { PortfolioState } from "../../domain/models/portfolioTypes";
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

  // Implementar otros métodos...
}