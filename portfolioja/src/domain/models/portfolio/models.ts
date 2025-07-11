import { PortfolioState } from './types';
import { createAboutMe } from '../about/models';
import { createSkillsState } from '../skills/models';

export const createPortfolioState = (data: Partial<PortfolioState> = {}): PortfolioState => ({
  aboutMe: data.aboutMe || createAboutMe(),
  experience: data.experience || [],
  education: data.education || [],
  skills: data.skills || createSkillsState(),
  projects: {
    title: data.projects?.title || "Featured Projects",
    items: data.projects?.items || []
  }
});