import { useState } from 'react'
import './App.css'
import CustumHeader from './components/header/header'
import Footer from './components/footer/footer'
import AboutMe from './components/aboutme/aboutme'
import ExperienceTimeline from './components/experiences/experience'
import { experiences } from './components/experiences/getexperienceData';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <div>
        <CustumHeader/>
        <AboutMe/>
        <ExperienceTimeline experiences={experiences} />
        <Footer/>
      </div>
    </>
  )
}

export default App
