import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { serverURL } from '../../services/FetchNodeServices';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import FooterComponent from '../../components/userinterface/FooterComponent';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Button, Divider } from '@mui/material';
import { useLocation } from 'react-router-dom';
import PlusMinusComponent from '../../components/userinterface/PlusMinusComponent';
import parse from 'html-react-parser';

import { useDispatch, useSelector } from "react-redux";
import Headers from '../../components/userinterface/Headers';
import { Navigate, useNavigate } from "react-router-dom";
import renderHTML from 'react-render-html';




export default function ProductPageComponent(props) {
    var dispatch = useDispatch();
    var location = useLocation();
    var item = location.state?.data;
    console.log('ppppppppppppppppppppppppppppppppp',item);
   
    var navigate = useNavigate();



    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    // State to track the selected index in the navigation slider
    const [navSliderIndex, setNavSliderIndex] = useState(0);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [quantity, setQuantity] = useState(1)
    const [addedToCart, setAddedToCart] = useState(true)
    const [pageRefesh, setPageRefesh] = useState(false)

    //  cart handle from past data and present data
    var productFromRedux = useSelector(state => state.data);
    var values = Object.values(productFromRedux);
    if (values?.length == 0) {
        // alert('blank')
        item['qty'] = 0;
    }
    else {
        // alert('data exist');
        var prd = productFromRedux[item?.productdetailid]
        // alert(JSON.stringify(prd));
        if (prd === undefined) {
            item = location.state?.data;
            item['qty'] = 0;

        }
        else {
            item = prd;
        }

    }


    // Main Slider Settings
    var mainSliderSettings = {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,

        dots: false,
        arrows: false,


    };

    // Navigation Slider Settings
    var navSliderSettings = {
        slidesToShow: 3,
        slidesToScroll: 1,

        dots: true,
        centerMode: true,
        focusOnSelect: true,
        beforeChange: (current, next) => setCurrentSlide(next),

    };

    mainSliderSettings.slidesToShow = matches ? 1 : isTablet ? 3 : 3;



    var images = item.multi_picture.split(',');
    const [slider, setSlider] = useState(images[0])



    console.log('checking...........', slider)


    const showDownSlide = () => {
        return images?.map((item, index) => {
            return (

                <div key={`${item}-${index}`}>
                    <img
                        src={`${serverURL}/images/${item}`}
                        style={{
                            width: 'auto', // Let the image adjust its width based on its natural dimensions
                            maxWidth: '70%', // Limit the maximum width to 70% of the container
                            height: 'auto',
                            borderRadius: 10,
                            height: matches ? 50 : isTablet ? 80 : 100,
                            display: 'block',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            cursor: 'pointer'
                        }}


                    />
                </div>
            );
        });
    };

    const handleChange = (v, item) => {

        if (v > 0) {
            item['qty'] = v;
            dispatch({ type: 'ADD_PRODUCT', payload: [item.productdetailid, item] })
        }
        else {
            dispatch({ type: 'DELETE_PRODUCT', payload: [item.productdetailid] })
        }
        setPageRefesh(!pageRefesh)
        console.log(v);
    }





    const handleToggle = () => {
        addedToCart ? setAddedToCart(false) : setAddedToCart(true);
    };

    return (
        <div>
            <div className='w-[100%] '>

                <Headers />
                <div className={` main-container max-w-[1200px] my-[30px] mx-auto p-[20px] grid ${isTablet ? 'grid-cols-1' : 'grid-cols-2'} gap-6`}>

                    <div className='left bg-[#e6e6e4] py-[20px] flex flex-col'>

                        {/* Main Slider */}

                        <div className='topslider mt-[25px] mb-[10px] '>
                            <img
                                src={`${serverURL}/images/${item.picture}`}
                                alt=""
                                style={{
                                    width: '68%',
                                    borderRadius: 10,
                                    height: matches ? 250 : isTablet ? 250 : 300,
                                    display: 'block',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                }}
                            />
                        </div>


                        <div className=' w-[70%] mx-auto' >
                            {/* Navigation Slider */}
                            <div>
                                <Slider {...navSliderSettings} className='bottomslider mt-[25px] mb-[20px]'>
                                    {showDownSlide()}
                                </Slider>
                            </div>
                        </div>

                    </div>



                    <div className='right bg-[white] p-[30px] border-[1px] border-gray-300'>
                        <div className={`productname font-[700] ${isTablet ? 'text-[20px]' : 'text-[23px]'}  font-serif`}>
                            {item.productname}, {item.weight} {item.weighttype}
                        </div>
                        <div className="description font-[600] ${isTablet ? 'text-[18px]' : 'text-[23px]'} font-serif pt-[10px]">
                            {item.productsubname}
                        </div>
                        <div className='flex gap-[10px]'>
                            <div className="price text-[27px] font-serif flex items-center gap-1">
                                <span>&#8377;</span>
                                <s className=' items-center font-bold '>

                                    {item.price}
                                </s>

                            </div>
                            <div className="offerprice font-[700] text-[27px]  font-serif">
                                {item.offerprice}
                            </div>
                        </div>
                        <span className='text-[15px]'>(incl.all Taxes)</span>


                        {/* <div className="quantity py-[10px]">
                            <div className="head ${isTablet ? 'text-[20px]' : 'text-[23px]'}   font-serif font-[700]">
                                QTY
                            </div>
                            <div className="maintain flex flex-cols gap-[10px] py-[10px] items-center ">

                                <AddIcon className=' bg-[#c5c4c4] flex 
                                w-[32px]
                                items-center justify-center 
                                 text-[40px] p-[5px] hover:bg-gray-500  hover:text-[white] active:bg-gray-300 
                                 transition-all duration-500' style={{ fontSize: '30px', cursor: 'pointer' }}
                                    onClick={() => handleAdd()}
                                />

                                <div className="qty w-[32px]  bg-[#93eaf1] flex items-center justify-center text-[30px]">
                                    {quantity}
                                </div>
                                <RemoveIcon className=' bg-[#c5c4c4] flex 
                                w-[32px]
                                items-center justify-center 
                                 text-[40px] p-[5px] hover:bg-gray-500  hover:text-[white] active:bg-gray-300 
                                 transition-all duration-500' style={{ fontSize: '30px', cursor: 'pointer' }} onClick={() => handleRemove()} />
                            </div>

                        </div> */}

                        <div className={`button mt-[20px] ${isTablet ? 'w-[100%]' : 'w-[55%]'} mb-[20px] flex gap-[20px]`}>
                            <div style={{ flex: 1 }}>
                                <PlusMinusComponent onChange={(v) => handleChange(v, item)} qty={item?.qty} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <Button
                                    variant='contained'
                                    className='w-full'
                                    style={{ background: addedToCart ? '#dee2e2' : '#0c2602', fontSize: '14px', fontWeight: '700', color: addedToCart ? '#01826d' : 'white' }}
                                    onClick={() => navigate('/home')}
                                >
                                    Continue
                                </Button>
                            </div>
                        </div>
                        <Divider style={{ background: '#9c9e9b' }} />
                        <div className="description mt-[35px]">
                        
                            {parse(`${item?.pd_description}`)}
                        </div>


                    </div>
                </div>
                <FooterComponent />
            </div>
        </div>
    );
}
