import React from 'react'
import Alink from '../Alink/Alink'
import SignUpButton from '../Button/SignUpButton'
import { FaLeaf } from "react-icons/fa";
import { Link } from 'react-router-dom';


const Links = () => {
    const data = [
        {url : "/", text:"Home"},
        {url : "/about", text:"About"},
        {url: "/secure", text:"Search"}
    ]
  return (
    <div className='font-medium flex gap-10 items-center'
    >
        {
            data.map(({url, text})=>(
                <Alink url={url} text={text} key={text} />
            ))
        }

        <SignUpButton>
        <Link to="/auth/login" className='flex flex-row gap-2 items-center justify-center'> <FaLeaf /> Join Us! </Link>
        </SignUpButton>
    </div>
  )
}

export default Links