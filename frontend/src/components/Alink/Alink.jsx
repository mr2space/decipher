import React from 'react'
import { Link } from 'react-router-dom'

const Alink = ({text, url}) => {
  return (
    <div className='font-poppins font-semibold text-darkgray text hover:text-black transition-all' >
        <Link to={url}> {text} </Link>
    </div>
  )
}
export default Alink; 