import { EducationItem } from './types';
import { v4 as uuidv4 } from 'uuid';

export const createEducationItem = (data: Partial<EducationItem> = {}): EducationItem => ({
  id: data.id || uuidv4(),
  institution: data.institution || "",
  degree: data.degree || "",
  fieldOfStudy: data.fieldOfStudy || undefined,
  period: data.period || "",
  description: data.description || undefined,
  link: data.link || undefined,
  achievements: data.achievements || []
});