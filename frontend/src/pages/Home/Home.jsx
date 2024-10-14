import React from 'react'
import { components } from '../../components'
import HeroSection from "./HeroSection"
import AppSection from './AppSection'

import TechStackSection from './TechStackSection'

const Home = () => {
  return (
    <>
        <components.Navbar />
        <HeroSection />
        <TechStackSection />        
        <AppSection />
    </>
  )
}

export default Home