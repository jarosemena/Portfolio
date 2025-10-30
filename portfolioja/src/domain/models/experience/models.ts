import { ExperienceItem } from './types';
import { v4 as uuidv4 } from 'uuid';

export const createExperienceItem = (data: Partial<ExperienceItem> = {}): ExperienceItem => ({
  id: data.id || uuidv4(),
  period: data.period || "",
  position: data.position || "",
  company: data.company || "",
  description: data.description || "",
  technologies: data.technologies || [],
  link: data.link || undefined,
  highlights: data.highlights || []
});