export type ExpertiseLevel = 'none' | 'beginner' | 'basic' | 'intermediate' | 'advanced' | 'expert';

export interface Skill {
  id: string;
  name: string;
  icon: string;
  category: string;
  level: ExpertiseLevel;
  description: string;
  yearsOfExperience: number;
}

export interface SkillsByCategory {
  [category: string]: Skill[];
}

export interface SkillsProps {
  skills: Skill[];
}