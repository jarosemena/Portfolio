export interface Technology {
  name: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  projectUrl?: string;
  technologies: Technology[];
  year?: string;
  featured?: boolean;
}

export interface ProjectsProps {
  projects: Project[];
}

export interface ProjectCardProps {
  project: Project;
}
