import { AboutMe } from '../aboutme/types';
import { ExperienceItem } from '../experience/types';
import { EducationItem } from '../education/types';
import { SkillsState } from '../skills/types';
import { ProjectItem } from '../projects/types';

export type PortfolioState = {
  aboutMe: AboutMe;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillsState;
  projects: {
    title?: string;
    items: ProjectItem[];
  };
};