import { IPortfolioRepository } from "../../domain/repositories/IPortfolioRepository";
import { PortfolioState } from "../../domain/models/portfolio/types";

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
        const response = await fetch(`${this.baseUrl}/aboutMe`, {
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

    async updateExperience(data: Partial<PortfolioState['experience']>): Promise<void> {
        const response = await fetch(`${this.baseUrl}/experience`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`Failed to update experience: ${response.statusText}`);
        }
    }

    async updateProjects(data: Partial<PortfolioState['projects']>): Promise<void> {
        const response = await fetch(`${this.baseUrl}/projects`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`Failed to update projects: ${response.statusText}`);
        }
    }
    
    async updateEducation(data: Partial<PortfolioState['education']>): Promise<void> {
        const response = await fetch(`${this.baseUrl}/education`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`Failed to update education: ${response.statusText}`);
        }
    }
    
    async updateSkills(data: Partial<PortfolioState['skills']>): Promise<void> {
        const response = await fetch(`${this.baseUrl}/skills`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`Failed to update skills: ${response.statusText}`);
        }
    }  
    // Implementar otros métodos...
}