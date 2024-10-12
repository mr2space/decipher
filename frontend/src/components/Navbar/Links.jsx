import React from 'react'
import Alink from '../Alink/Alink'
import SignUpButton from '../Button/SignUpButton'
import { FaLeaf } from "react-icons/fa";

const Links = () => {
    const data = [
        {url : "", text:"Home"},
        {url : "/about", text:"About"},
        {url: "/search", text:"Search"}
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
        <FaLeaf /> Join Us!
        </SignUpButton>
    </div>
  )
}

export default Links