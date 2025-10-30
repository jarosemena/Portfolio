// components/about/AboutMe.tsx
import React from 'react';
import './aboutme.css';
import data from './aboutme.json';
import '../common/pharagraph'
import { Paragraph } from '../common/pharagraph/paragraph';


const AboutMe: React.FC = () => {
  return (
    <section 
      id="about" 
      className="scroll-mt-16 bg-slate-900/75 backdrop-blur rounded-2xl p-6 md:p-8 lg:p-10 my-12 max-w-4xl mx-auto"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-6">
         {data.aboutme.title}
      </h2>
      
      
      <div className="space-y-5">

      {data.aboutme.paragraphs.map((text, index) => (
        <Paragraph key={index} className="text-slate-400" text={text} />
      ))}
        
       
      </div>
      
    
    </section>
  );
};

export default AboutMe;