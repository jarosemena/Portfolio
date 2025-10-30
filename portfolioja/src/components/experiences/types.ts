export interface Technology {
    name: string;
  }
  
  export interface ExperienceItem {
    id: string;
    period: string;
    position: string;
    company: string;
    descriptions: string[];
    technologies: Technology[];
    link?: string;
  }
  
  export interface ExperienceTimelineProps {
    experiences: ExperienceItem[];
  }