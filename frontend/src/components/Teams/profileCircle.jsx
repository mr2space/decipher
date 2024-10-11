import React from 'react'

const profileCircle = ({imageUrl, left}) => {
    const possible = ["translate-x-[-40%]", "translate-x-[-80%]", "translate-x-[-120%]"]
  return (
    <div className={`transform translate-x-[${left}] inline-block w-[55px] h-[55px] rounded-full border-4 border-whitegray object-cover overflow-hidden`}>
        <img src={imageUrl} alt="imageUrl" className='w-full h-full' />
    </div>
  )
}

export default profileCircle