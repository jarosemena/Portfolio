// components/about/AboutMe.tsx
import React from 'react';
import './aboutme.css';
import './aboutme.json';


const AboutMe: React.FC = () => {
  return (
    <section 
      id="about" 
      className="scroll-mt-16 bg-slate-900/75 backdrop-blur rounded-2xl p-6 md:p-8 lg:p-10 my-12 max-w-4xl mx-auto"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-6">
        Sobre <span className="text-teal-400">Mí</span>
      </h2>
      
      array.forEach(element => {
        
      });
      <div className="space-y-5">
        <p className="text-slate-400">
          Soy un <span className="text-slate-200 font-medium">desarrollador full-stack</span> con más de 5 años de experiencia creando aplicaciones web de alto rendimiento. Mi enfoque combina diseño atractivo con funcionalidad robusta, siempre buscando las mejores soluciones técnicas para cada desafío.
        </p>
        
        <p className="text-slate-400">
          Especializado en el ecosistema <span className="text-slate-200 font-medium">JavaScript </span>
          
           mi stack incluye React, TypeScript, Node.js y bases de datos modernas. Creo en el código limpio, las pruebas automatizadas y la mejora continua.
        </p>
        
        <p className="text-slate-400">
          Fuera del desarrollo, me apasionan los videojuegos indie, la fotografía de paisajes y contribuir a proyectos open-source. Puedes ver algunos de mis trabajos en mi <a href="#projects" className="text-slate-200 hover:text-teal-300 transition-colors font-medium">portafolio</a> o revisar mi código en <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-slate-200 hover:text-teal-300 transition-colors font-medium">GitHub</a>.
        </p>
      </div>
      
    
    </section>
  );
};

export default AboutMe;