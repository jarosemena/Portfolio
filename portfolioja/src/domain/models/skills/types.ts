export type ProficiencyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export type Technology = {
  name: string;
  proficiency?: ProficiencyLevel;
  yearsOfExperience?: number;
  category?: 'language' | 'framework' | 'tool' | 'cloud' | 'database';
  icon?: string;
  lastUsed?: string;
  featured?: boolean;
};

export type SkillCategory = {
  category: string;
  items: Technology[];
};

export type SkillsState = {
  title?: string;
  categories: SkillCategory[];
  technicalSummary?: string;
};