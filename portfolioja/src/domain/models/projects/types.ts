import { Technology } from '../skills/types';

export type ProjectItem = {
  id: string;
  name: string;
  description: string;
  detailedDescription?: string;
  technologies: Technology[];
  repoUrl?: string;
  liveUrl?: string;
  imageUrl: string; // URL de imagen principal (requerida)
  screenshots?: string[]; // URLs de capturas adicionales
  featured?: boolean;
  year: string;
  client?: string;
  role?: string;
};