import { Technology } from '../skills/types';

export type ExperienceItem = {
  id: string;
  period: string;
  position: string;
  company: string;
  description: string;
  technologies: Technology[];
  link?: string;
  highlights?: string[];
};