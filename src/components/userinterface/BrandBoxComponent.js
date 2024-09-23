import React from 'react'
import { Paper } from '@mui/material'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverURL } from "../../services/FetchNodeServices";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { createRef } from "react";
import { useNavigate } from 'react-router-dom';

export default function BrandBoxComponent(props) {
  var navigate = useNavigate();
    var sld=createRef()
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md')); // Adjust the breakpoint for tablets if needed

    var settings = {
        dots: false,
        infinite: true,
        speed: 400,
        slidesToScroll: 1,
        autoplay: false,
        centerMode: true,
        centerPadding: '0',
    };

    settings.slidesToShow = matches ? 4 : (isTablet ? 6 : 8);

    var brands = props.data;
    console.log('brands to show', brands);

    const handleGoToFilterPage =(item)=>{
        // alert(item)
        // alert(item.brandid);
        navigate('/filterpage/null', {state:{brandid : item.brandid}});
    }


    // var images = Object.values(brands)?.brandicon;

    const showSlide = () => {

        return brands?.map((item) => {
            return (
                <div onClick={()=>{handleGoToFilterPage(item)}}  key={item}>
                    <img src={`${serverURL}/images/${item.brandicon}`} style={{
                        width: matches ? '85%' : '85%',
                        borderRadius: 10,
                        height: matches ? 80 : (isTablet ? 120 : 160),
                        display: 'block',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        cursor:'pointer'

                    }}
                        className='
                    shadow-lg shadow-black-500/50
                    '/>

                </div>
            );
        });
    };

    const handleForward = () => {
        sld.current.slickNext()

    }
    const handleBackward = () => {
        sld.current.slickPrev()
    }

    return (
        <div className='w-[100%] mt-[20px]  border-t-4 border-gray-100' >
            <div className="main-container bg-[white] max-w-[1800px] flex justify-between  mx-auto p-[20px] flex-col">
                <div className="title font-extrabold text-[18px]">
                    Brands
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', overflow: 'hidden' }} >
                    <div style={{ width: '100%', position: 'relative' }}>

                        {isTablet ? <></> : (
                            <div className="arrowback w-[36px] h-[36px] flex items-center justify-center pl-[11px] rounded-[18px] bg-gray-300 opacity-[0.6] absolute z-[10] top-[35%] cursor-pointer hover:bg-gray-400 hover:text-[white] active:bg-gray-300 active:text-[black] transition-all duration-500">
                                <ArrowBackIosIcon onClick={handleBackward} />
                            </div>)
                        }


                        <Slider ref={sld} {...settings} className="mt-[10px] mb-[10px]">
                            {showSlide()}
                        </Slider>

                        {isTablet ? <></> : (
                            <div className="arrorForward w-[36px] h-[36px] flex items-center justify-center  pl-[2px] rounded-[18px] bg-gray-300 opacity-[0.6] absolute z-[10] top-[35%] right-[0%] cursor-pointer hover:bg-gray-400 hover:text-[white] active:bg-gray-300 active:text-[black] transition-all duration-300">
                                <ArrowForwardIosIcon onClick={handleForward} />
                            </div>)
                        }

                    </div>
                </div>

            </div>
        </div>
    )
}
