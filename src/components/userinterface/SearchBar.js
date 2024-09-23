import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function SearchBar() {

    var navigate = useNavigate();
    const [pattern, setPattern] = useState('');
    // alert(pattern);
    const handleFilterPage = () => {
       
        // navigate('/filterpage', { state: { pattern: pattern } })
        navigate(`/filterpage/${pattern}`)

    }
    const handleEnter = (e) => {
        if (e.key === 'Enter') 
            navigate(`/filterpage/${e.target.value}`);
    }

    return (
        <div className='text-black  relative'>



            <input
                type="text"
                placeholder="Search Product..."
                className=' sm:w-[300px]   md:w-[400px] lg:w-[700px] w-[200px]  border-solid  rounded-[50px] border px-6  py-[10px] focus:outline-none focus:border-sky-300 bg-[#f7f7f7] shadow-lg shadow-gray-200 '
                onChange={(e)=>setPattern(e.target.value)}
                onKeyDown={(e)=>handleEnter(e)}
                


            />
            <SearchIcon style={{ color: '#c2c2c2', fontSize: '40' }} className='px-[10px] cursor-pointer absolute top-[4px] right-[10px] ' type='button' arial-aria-label='Search' 
             onClick={handleFilterPage}
            />




        </div>
    )
}
