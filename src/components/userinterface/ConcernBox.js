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
import { grey } from '@mui/material/colors';
import { Navigate, useNavigate } from 'react-router-dom';

export default function CategoryBox(props) {

    var navigate = useNavigate();
    var sld = createRef();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

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

    var concern = props.data;
    var title = props.title;
    console.log(props.tile, 'asas', title);

    const handleGoToFilterPage = (item) => {
        // alert(item)
        // alert(item.concernid);
        navigate('/filterpage/null', { state: { concernid: item.concernid } });
    }


    // var name = Object.values(banners)[0].name.split(",");




    // const showName = () => {
    //     return name.map((item) => (
    //         <div className="name" key={item}>
    //             {item}
    //         </div>
    //     ));
    // };

    const showImageSlide = () => {
        return concern?.map((item) => {
            return (
                <div onClick={()=>{handleGoToFilterPage(item)}}  key={item} className=' flex items-center justify-center'>
                    <img
                        src={`${serverURL}/images/${item.concernicon}`}
                        style={{
                            width: matches ? '85%' : '85%',
                            borderRadius: 10,
                            height: matches ? 80 : (isTablet ? 120 : 160),
                            display: 'block',
                            marginLeft: 'auto',
                            background: '#e1e3e1',
                            marginRight: 'auto',
                            cursor: 'pointer'
                        }}
                    />
                    <div className="name  flex items-center justify-center py-[5px] text-[13px]">
                        {item.concernname}

                    </div>
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
        <div className='w-[100%]  border-t-4  border-gray-100' >
            <div className="main-container bg-[white] max-w-[1800px] flex justify-between  mx-auto p-[20px] flex-col">
                <div className="title font-extrabold text-[18px]">
                    {/* Browse By Category */}
                    {title}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', overflow: 'hidden' }} >
                    <div style={{ width: '100%', position: 'relative' }}>

                        {isTablet ? <></> : (
                            <div className="arrowback w-[36px] h-[36px] flex items-center justify-center pl-[11px] rounded-[18px] bg-gray-300 opacity-[0.6] absolute z-[10] top-[35%] cursor-pointer hover:bg-gray-400 hover:text-[white] active:bg-gray-300 active:text-[black] transition-all duration-500">
                                <ArrowBackIosIcon onClick={handleBackward} />
                            </div>)
                        }

                        <Slider ref={sld} {...settings} className="mt-[10px] mb-[10px]">
                            {showImageSlide()}

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
