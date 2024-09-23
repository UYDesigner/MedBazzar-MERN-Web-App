import React from 'react'
import { useNavigate } from 'react-router-dom'
import mainlogo from '../../../src/assets/logo.png'
import list from '../../../src/assets/list.png'
import fileicon from '../../../src/assets/fileicon.png'


export default function TitleComponent({title,logo,listicon,page}) {

    var navigate = useNavigate();


    return (
        <div className='flex flex-col m-[5px]'>
            <div className='flex items-center justify-between  p-[10px] '>
                <div className='flex items-start p-[5px] gap-[5px] flex-col'>
                    <img src={mainlogo} alt="" width='200' />
                    <div className='font-extrabold  text-[18px] text-[#4a4a4a] pl-[10px] '>{title}</div>
                </div>
                <div className='cursor-pointer' onClick={(e)=>navigate(page)}>
                    <img src={list} alt="" width='40' />
                    
                </div>
            </div>
            <div className="hr h-[1px] bg-[#aeadad]" style={{ boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.5)" }}>
                {/* Your content goes here */}
            
            </div>

        </div>
    )
}
