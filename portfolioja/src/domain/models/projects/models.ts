import { ProjectItem } from './types';
import { v4 as uuidv4 } from 'uuid';

export const createProjectItem = (data: Partial<ProjectItem> = {}): ProjectItem => ({
  id: data.id || uuidv4(),
  name: data.name || "",
  description: data.description || "",
  detailedDescription: data.detailedDescription || undefined,
  technologies: data.technologies || [],
  repoUrl: data.repoUrl || undefined,
  liveUrl: data.liveUrl || undefined,
  imageUrl: data.imageUrl || "/images/default-project.jpg", // Imagen por defecto
  screenshots: data.screenshots || [],
  featured: data.featured || false,
  year: data.year || new Date().getFullYear().toString(),
  client: data.client || undefined,
  role: data.role || undefined
});