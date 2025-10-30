import { AboutMe } from './types';

export const createAboutMe = (data: Partial<AboutMe> = {}): AboutMe => ({
  title: data.title || "About Me",
  paragraphs: data.paragraphs || [],
  contact: data.contact || undefined
});