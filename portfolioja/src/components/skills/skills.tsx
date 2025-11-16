import React, { useState } from 'react';
import './skills.css';
import { Skill, SkillsByCategory } from './types';
import skillsData from '../../data/skills.json';
import { LazyLoad } from '../common/lazy-load';

const ExpertiseLevelStars: React.FC<{ level: Skill['level'] }> = ({ level }) => {
  const levels = {
    'none': 0,
    'beginner': 1,
    'basic': 2,
    'intermediate': 3,
    'advanced': 4,
    'expert': 5
  };

  const stars = levels[level];

  return (
    <div className="stars">
      {[...Array(5)].map((_, index) => (
        <span 
          key={index} 
          className={`star ${index < stars ? 'filled' : 'empty'}`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const SkillCard: React.FC<{ skill: Skill }> = ({ skill }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <LazyLoad threshold={0.1} rootMargin="100px">
      <div className="skill-card">
        <div className="skill-icon">
          <img 
            src={`/src/assets/icons/${skill.icon}`}
            alt={skill.name} 
            loading="lazy"
            onLoad={handleImageLoad}
            className={imageLoaded ? 'loaded' : ''}
          />
        </div>
        <h3 className="skill-name">{skill.name}</h3>
        <ExpertiseLevelStars level={skill.level} />
        <p className="skill-description">{skill.description}</p>
        <p className="skill-experience">
          {skill.yearsOfExperience} {skill.yearsOfExperience === 1 ? 'year' : 'years'} of experience
        </p>
      </div>
    </LazyLoad>
  );
};

const Skills: React.FC = () => {
  const skills = skillsData.skills as Skill[];

  const skillsByCategory = skills.reduce<SkillsByCategory>((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="section section-dark skills-container">
      <div className="section-container">
        <div className="titleContainer">
          <h2 className="title">Technical Skills</h2>
        </div>
        <div className="categories-grid">
          {Object.entries(skillsByCategory).map(([category, skills]) => (
            <div 
              key={category} 
              className={`category-section ${
                skills.length === 1 ? 'small' : 
                skills.length === 2 ? 'medium' : 
                skills.length === 3 ? 'large' :
                skills.length === 4 ? 'xlarge' :
                'xxlarge'
              }`}
            >
              <h3 className="category-title">{category}</h3>
              <div className="skills-grid">
                {skills.map(skill => (
                  <SkillCard key={skill.id} skill={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;