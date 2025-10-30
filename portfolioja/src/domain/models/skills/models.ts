import { Technology, SkillCategory, SkillsState } from './types';

export const createTechnology = (data: Partial<Technology> = {}): Technology => ({
  name: data.name || "",
  proficiency: data.proficiency || 'intermediate',
  yearsOfExperience: data.yearsOfExperience || undefined,
  category: data.category || undefined,
  icon: data.icon || undefined,
  lastUsed: data.lastUsed || undefined,
  featured: data.featured || false
});

export const createSkillCategory = (data: Partial<SkillCategory> = {}): SkillCategory => ({
  category: data.category || "",
  items: data.items || []
});

export const createSkillsState = (data: Partial<SkillsState> = {}): SkillsState => ({
  title: data.title || "Technical Skills",
  categories: data.categories || [],
  technicalSummary: data.technicalSummary || ""
});