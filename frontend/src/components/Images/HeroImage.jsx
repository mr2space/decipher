import React from 'react'
import {Images} from "../../assets";


const HeroImage = () => {
  return (
    <div className='flex flex-row items-center justify-between w-full px-24 h-[100vh-2000px]'>
      <div className=''>
        Hello
      </div>
      <div className="image__box w-[350px] h-[500px] object-cover overflow-hidden rounded-tl-full rounded-tr-full rounded-bl-full rounded-br-3xl">
        <img src={Images.plant2} alt="plant image" />
      </div>
    </div>
  )
}

export default HeroImage