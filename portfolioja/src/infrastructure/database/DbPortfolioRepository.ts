import { IPortfolioRepository } from "../../domain/repositories/IPortfolioRepository";
import { PortfolioState } from "../../domain/models/portfolio/types";
import { db } from './database'; // Suponiendo una conexión a DB

export class DbPortfolioRepository implements IPortfolioRepository {
  async getPortfolioData(): Promise<PortfolioState> {
    try {
      // Ejemplo con Firebase Firestore
      const docRef = db.collection('portfolios').doc('user123');
      const doc = await docRef.get();
      
      if (!doc.exists) {
        throw new Error('Portfolio document not found');
      }
      
      return doc.data() as PortfolioState;
    } catch (error) {
      //throw new Error(`Database error: ${error.message}`);
    }
  }

  async updateAboutMe(data: Partial<PortfolioState['aboutMe']>): Promise<void> {
    try {
      const docRef = db.collection('portfolios').doc('user123');
      await docRef.update({
        'aboutMe': data
      });
    } catch (error) {
      _//throw new Error(`Failed to update about me: ${error.message}`);
    }
  }

  async updateExperience(data: Partial<PortfolioState['experience']>): Promise<void> {
    try {
      const docRef = db.collection('portfolios').doc('user123');
      await docRef.update({
        'experience': data
      });
    } catch (error) {
      _//throw new Error(`Failed to update about me: ${error.message}`);
    }
  }

  async updateProjects(data: Partial<PortfolioState['projects']>): Promise<void> {
    try {
      const docRef = db.collection('portfolios').doc('user123');
      await docRef.update({
        'projects': data
      });
    } catch (error) {
      _//throw new Error(`Failed to update about me: ${error.message}`);
    }
  }

  async updateEducation(data: Partial<PortfolioState['education']>): Promise<void> {
    try {
      const docRef = db.collection('portfolios').doc('user123');
      await docRef.update({
        'education': data
      });
    } catch (error) {
      _//throw new Error(`Failed to update about me: ${error.message}`);
    }
  }

  async updateSkills(data: Partial<PortfolioState['skills']>): Promise<void> {
    try {
      const docRef = db.collection('portfolios').doc('user123');
      await docRef.update({
        'skills': data
      });
    } catch (error) {
      _//throw new Error(`Failed to update about me: ${error.message}`);
    }
  }

  

  // Implementar otros métodos...
}