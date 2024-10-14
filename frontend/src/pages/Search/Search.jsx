import React from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentData } from '../../utils/speciesSlice'


const Search = () => {
    const data = useSelector(selectCurrentData);
    console.log(data);
    try {
        const val = JSON.stringify(data || {});
    } catch (error) {
        
    }
    
  return (
    <div>
        {JSON.stringify(data || {})}
        hello
    </div>
  )
}

export default Search