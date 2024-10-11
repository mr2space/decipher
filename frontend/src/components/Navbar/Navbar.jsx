import React from 'react'
import Links from './Links'
import LogoText from './LogoText'
const Navbar = () => {
  return (
    <div className='absolute top-0 left-0 w-screen flex gap-5 items-center justify-between px-24 py-6 z-50 backdrop-blur-lg'>
      <LogoText text="sanjeevani"/>
      <Links />
    </div>
  )
} 

export default Navbar