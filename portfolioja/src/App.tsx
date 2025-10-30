import React from 'react'
import './App.css'
import CustumHeader from './components/header/header'
import Footer from './components/footer/footer'
import AboutMe from './components/aboutme/aboutme'
import ExperienceTimeline from './components/experiences/experience'
import Skills from './components/skills'
import { experiences } from './components/experiences/getexperienceData';

function App() {
  // Estado no necesario para este efecto

  const handleMouseMove = (event: React.MouseEvent) => {
    const hoverContainer = document.querySelector('.hover-container') as HTMLElement;
    if (hoverContainer) {
      hoverContainer.style.setProperty('--mouse-x', `${event.clientX}px`);
      hoverContainer.style.setProperty('--mouse-y', `${event.clientY}px`);
      hoverContainer.style.opacity = '1';
    }
  };

  const handleMouseLeave = () => {
    const hoverContainer = document.querySelector('.hover-container') as HTMLElement;
    if (hoverContainer) {
      hoverContainer.style.opacity = '0';
    }
  };

  return (
    <>
      <div onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
        <div className="hover-container" />
        <CustumHeader/>
        <AboutMe/>
        <ExperienceTimeline experiences={experiences} />
        <Skills />
        <Footer/>
      </div>
    </>
  )
}

export default App
