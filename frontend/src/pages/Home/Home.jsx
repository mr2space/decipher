import React from 'react'
import { components } from '../../components'

import HeroSection from "./HeroSection"
import AppSection from './AppSection'
import TechStackSection from './TechStackSection'
import AppFeatureSection from './AppFeatureSection'

const Home = () => {
  return (
    <>
        <components.Navbar />
        <HeroSection />
        <TechStackSection />        
        <AppSection />
        <AppFeatureSection />
        <components.Footer />
    </>
  )
}

export default Home