import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CustumHeader from './components/header/header'
import Footer from './components/footer/footer'
import AboutMe from './components/aboutme/aboutme'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <div>
        <CustumHeader/>
        <AboutMe/>
     
        <Footer/>
      </div>
    </>
  )
}

export default App
