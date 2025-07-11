import { IPortfolioRepository } from "../../domain/repositories/IPortfolioRepository";
import { PortfolioState } from "../../domain/models/portfolioTypes";

export class ApiPortfolioRepository implements IPortfolioRepository {
  private baseUrl: string;

  constructor(baseUrl: string = import.meta.env.VITE_API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async getPortfolioData(): Promise<PortfolioState> {
    const response = await fetch(`${this.baseUrl}/portfolio`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch portfolio data: ${response.statusText}`);
    }

    return await response.json();
  }

  async updateAboutMe(data: Partial<PortfolioState['aboutMe']>): Promise<void> {
    const response = await fetch(`${this.baseUrl}/about`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`Failed to update about me: ${response.statusText}`);
    }
  }

  // Implementar otros métodos...
}