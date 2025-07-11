import { IPortfolioRepository } from "../../domain/repositories/IPortfolioRepository";
import { PortfolioState } from "../../domain/models/portfolio/types";
import { ExperienceItem } from "../../components/experiences/types";
import { ProjectItem } from "../../domain/models/projects/types";
import { EducationItem } from "../../domain/models/education/types";

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

    async updateExperience(data: Array<{ id: string; updates: Partial<ExperienceItem> }>): Promise<void> {
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

    async updateProjects(data: Array<{ id: string; updates: Partial<ProjectItem> }>): Promise<void> {
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
    
    async updateEducation(data: Array<{ id: string; updates: Partial<EducationItem> }>): Promise<void> {
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