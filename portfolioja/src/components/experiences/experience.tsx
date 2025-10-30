import React, { useState } from 'react';
import './experience.css';
import { ExperienceItem, ExperienceTimelineProps } from './types';

const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ experiences }) => {
  const [visibleCount, setVisibleCount] = useState(2);
  const hasMoreExperiences = experiences.length > visibleCount;
  const isShowingAll = visibleCount >= experiences.length;

  const handleShowMore = () => {
    setVisibleCount(prev => Math.min(prev + 2, experiences.length));
  };

  const handleShowLess = () => {
    setVisibleCount(2);
  };

  const visibleExperiences = experiences.slice(0, visibleCount);

  return (
    <div className="timelineContainer">
      <div className="container">
        <div className="titleContainer">
          <h2 className="title">Work Experience</h2>
          {hasMoreExperiences && (
            <button 
              className="expandButton" 
              onClick={handleShowMore}
              title="Show more experiences"
            >
              +
            </button>
          )}
          {isShowingAll && (
            <button 
              className="expandButton collapseButton" 
              onClick={handleShowLess}
              title="Show less experiences"
            >
              −
            </button>
          )}
        </div>
        
        <div className="experienceList">
          {visibleExperiences.map((experience) => (
            <ExperienceItemComponent key={experience.id} experience={experience} />
          ))}
        </div>

        {hasMoreExperiences && !isShowingAll && (
          <button 
            className="showMoreButton"
            onClick={handleShowMore}
          >
            Show More Experiences
          </button>
        )}
        
        {isShowingAll && (
          <div className="closeSection">
            <p className="closeSectionText">
              You've reached the end of my professional journey so far.
              Thank you for your interest!
            </p>
            <button 
              className="showLessButton"
              onClick={handleShowLess}
            >
              Show Less
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const ExperienceItemComponent: React.FC<{ experience: ExperienceItem }> = ({ experience }) => {
  return (
    <div className="experienceItem">
      <div>
        <p className="period">{experience.period}</p>
      </div>
      <div>
        <div>
          <h3 className="position">{experience.position}</h3>
          <h4 className="company">{experience.company}</h4>
          <ul className="descriptions">
            {experience.descriptions.map((description, index) => (
              <li key={index} className="description">
                {description}
              </li>
            ))}
          </ul>
          
          {experience.technologies.length > 0 && (
            <div className="technologies">
              {experience.technologies.map((tech, index) => (
                <span key={index} className="technology">
                  {tech.name}
                </span>
              ))}
            </div>
          )}
          
          {experience.link && (
            <a 
              href={experience.link} 
              className="link"
              target="_blank"
              rel="noopener noreferrer"
            >
              View projects
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" 
                fill="currentColor" 
                className="linkIcon"
              >
                <path 
                  fillRule="evenodd" 
                  d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" 
                  clipRule="evenodd" 
                />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExperienceTimeline;