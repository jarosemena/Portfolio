import React, { useState } from 'react';
import './projects.css';
import { Project, ProjectCardProps } from './types';
import projectsData from '../../data/projects.json';
import { LazyLoad } from '../common/lazy-load';

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    console.error(`Failed to load project image: ${project.imageUrl}`);
  };

  const handleCardClick = () => {
    if (project.projectUrl) {
      window.open(project.projectUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (project.projectUrl && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      handleCardClick();
    }
  };

  const isClickable = !!project.projectUrl;

  return (
    <LazyLoad threshold={0.1} rootMargin="100px">
      <article
        className={`project-card ${isClickable ? 'clickable' : ''}`}
        onClick={isClickable ? handleCardClick : undefined}
        onKeyDown={isClickable ? handleKeyDown : undefined}
        tabIndex={isClickable ? 0 : undefined}
        role={isClickable ? 'button' : undefined}
        aria-label={isClickable ? `View project: ${project.name}` : undefined}
      >
        <div className="project-image-container">
          {!imageError ? (
            <img
              src={project.imageUrl}
              alt={`${project.name} screenshot`}
              loading="lazy"
              onLoad={handleImageLoad}
              onError={handleImageError}
              className={`project-image ${imageLoaded ? 'loaded' : ''}`}
            />
          ) : (
            <div className="image-placeholder">
              {project.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        
        <div className="project-content">
          <h3 className="project-name">{project.name}</h3>
          <p className="project-description">{project.description}</p>
          
          {project.technologies.length > 0 && (
            <div className="technologies">
              {project.technologies.map((tech, index) => (
                <span key={index} className="technology">
                  {tech.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </LazyLoad>
  );
};

const Projects: React.FC = () => {
  const projects = projectsData.projects as Project[];

  // Filter out projects with missing required fields
  const validProjects = projects.filter(project => {
    const isValid = project.id && project.name && project.description && project.imageUrl;
    if (!isValid) {
      console.warn('Project with missing required fields:', project);
    }
    return isValid;
  });

  if (validProjects.length === 0) {
    return (
      <section id="projects" className="section projects-container">
        <div className="section-container">
          <div className="titleContainer">
            <h2 className="title">Projects</h2>
          </div>
          <p className="no-projects-message">No projects available</p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="section projects-container">
      <div className="section-container">
        <div className="titleContainer">
          <h2 className="title">Projects</h2>
        </div>
        <div className="projects-grid">
          {validProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
