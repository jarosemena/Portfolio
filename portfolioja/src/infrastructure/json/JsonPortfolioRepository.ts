import { IPortfolioRepository } from "../../domain/repositories/IPortfolioRepository";
import { PortfolioState } from "../../domain/models/portfolio/types";
import portfolioData from '../../../public/data/portfolio.json'; // Datos locales
import { ExperienceItem } from "../../domain/models/experience/types";
import { ProjectItem } from "../../domain/models/projects/types";
import { EducationItem } from "../../domain/models/education/types";

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

    async updateExperience(data: Array<{ id: string; updates: Partial<ExperienceItem>; }>): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.data.experience = this.data.experience.map(item => {
                    const update = data.find(u => u.id === item.id);
                    return update ? { ...item, ...update.updates } : item;
                });
                console.log("Experiences updated locally:", this.data.experience);
                resolve();
            }, 200);
        });
    }

    async updateProjects(data: Array<{ id: string; updates: Partial<ProjectItem>; }>): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.data.projects = this.data.projects.map(item => {
                    const update = data.find(u => u.id === item.id);
                    return update ? { ...item, ...update.updates } : item;
                });
                console.log("Experiences updated locally:", this.data.experience);
                resolve();
            }, 200);
        });
    }

    async updateEducation(data: Array<{ id: string; updates: Partial<EducationItem>; }>): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.data.education = this.data.education.map(item => {
                    const update = data.find(u => u.id === item.id);
                    return update ? { ...item, ...update.updates } : item;
                });
                console.log("Experiences updated locally:", this.data.experience);
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