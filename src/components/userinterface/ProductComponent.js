import { React, useState } from 'react'
import { Paper, Button } from '@mui/material'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverURL } from "../../services/FetchNodeServices";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { createRef } from "react";
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import logo from '../../assets/logo.png';
// import Button from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PlusMinusComponent from './PlusMinusComponent';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
// import { UseSelector } from 'react-redux';
// import { UseDispatch } from 'react-redux';


export default function ProductComponent(props) {

    var dispatch = useDispatch();
    var navigate = useNavigate();
    var sld = createRef()
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md')); // Adjust the breakpoint for tablets if needed
    const [addedToCart, setAddedToCart] = useState(true);

    var productFromRedux = useSelector(state => state.data);
    var productReduxvalues = Object.values(productFromRedux);

    
    const [check, setCheck] = useState(false);
    
    const handleCheck =async(item, index)=>{

        setCheck(!check);
        
    }


    var settings = {
        dots: false,
        infinite: true,
        speed: 400,
        slidesToScroll: 1,
        autoplay: false,
        centerMode: true,
        centerPadding: '0',
    };

    settings.slidesToShow = matches ? 2 : (isTablet ? 3 : 6);

    var product = props?.data
    console.log(JSON.stringify(product))

    // var name = Object.values(banners)[0].name.split(",");

    // var images = Object.values(banners)[0].picture.split(",");

    // const handleToggle = () => {
    //     addedToCart ? setAddedToCart(false) : setAddedToCart(true);
    // };

    const handleChange = (v, item) => {

        if (v > 0) {
            item['qty'] = v;
            dispatch({ type: 'ADD_PRODUCT', payload: [item.productdetailid, item] })
        }
        else {
            dispatch({ type: 'DELETE_PRODUCT', payload: [item.productdetailid] })
        }
        props.setPageRefesh(!props.pageRefesh)
        console.log(v);
    }


    const handleProductDetailPage = (item) => {
        
        navigate('/productpage',{state : {data: item}})
    }

    const showSlide = () => {


        return product?.map((item, index) => {
            return (
                <div key={item} >
                    <div style={{ boxShadow: "  rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px" }} className=' ml-[0px] my-[40px] w-[80%] cursor-pointer relative  translate-x-4 transition-all duration-300 '>

                    <BookmarkAddIcon
                            className={`absolute right-2 top-1  hover:text-gray-600 transition-all duration-1000 `}
                            style={{ fontSize: isTablet?'20px' : '25px' ,color: check ? "gray" : '#c5c6c7' }}
                            onClick={() => handleCheck(item, index)}
                            
                        />


                        <div className={`w-[100%] ${isTablet ? 'py-[5px]' : 'py-[25px]'} cursor-pointer `} onClick={() => handleProductDetailPage(item)} >
                            <img src={`${serverURL}/images/${item.picture}`} style={{
                                width: matches ? '1' : (isTablet ? '70%' : '80%'),

                                height: matches ? 120 : (isTablet ? 140 : 190),
                                display: 'block',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                // background: 'yellow',
                                padding: '5px',
                                // background: 'red'

                            }}
                            />
                        </div>
                        <div className={`logo  absolute ${isTablet ? 'top-[48%]' : 'top-[55%]'} right-2 `}>
                            <img src={logo} width={isTablet ? '40' : '60'} className='bg-[#d2f5bd] p-[2px] rounded-[20%] ' />
                        </div>

                        <div className="name  flex flex-col items-start  py-[5px] md:text-[15px] text-[12px] px-[10px] font-[600] bg-gray-100 " key={`name-${index} `}



                        >
                            <div
                                style={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    display: "-webkit-box",
                                    WebkitLineClamp: "1",
                                    WebkitBoxOrient: "vertical",
                                }}

                            >
                                {item.description}
                                <span>{item.weight} {item.weighttype}</span>
                            </div>
                            <div className='flex flex-col '>

                                <span style={{ textDecoration: 'line-through', color: '#858383' }}>&#8377;{item.price}</span>
                                <span>&#8377;{item.offerprice}</span>
                            </div>




                        </div>

                        <div className="button w-full flex">
                            <div style={{ flex: 1 }}>
                                <PlusMinusComponent onChange={(v) => handleChange(v, item)} qty={productFromRedux[item?.productdetailid]?.qty === undefined ? 0 : productFromRedux[item?.productdetailid]?.qty } />
                            </div>
                            <div style={{ flex: 1 }}>
                                <Button
                                    className='w-full'
                                    style={{ color: '#01826d', fontSize: '#035182', fontWeight: '600' }}
                                >
                                    <ShoppingCartIcon onClick={()=>navigate('/cart')} />
                                </Button>
                            </div>
                        </div>
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
                    {props.title}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', overflow: 'hidden' }} >
                    <div style={{ width: '100%', position: 'relative' }}>

                        {isTablet ? <></> : (
                            <div className="arrowback w-[36px] h-[36px] flex items-center justify-center pl-[11px] rounded-[18px] bg-gray-300 opacity-[0.6] absolute z-[10] top-[44%] left-[0.5%] cursor-pointer hover:bg-gray-400 hover:text-[white] active:bg-gray-300 active:text-[black] transition-all duration-500">
                                <ArrowBackIosIcon onClick={handleBackward} />
                            </div>)
                        }

                        <Slider ref={sld} {...settings} className="mt-[10px] mb-[10px]">
                            {showSlide()}
                        </Slider>

                        {isTablet ? <></> : (
                            <div className="arrorForward w-[36px] h-[36px] flex items-center justify-center  pl-[2px] rounded-[18px] bg-gray-300 opacity-[0.6] absolute z-[10] top-[44%] right-[0%] cursor-pointer hover:bg-gray-400 hover:text-[white] active:bg-gray-300 active:text-[black] transition-all duration-300">
                                <ArrowForwardIosIcon onClick={handleForward} />
                            </div>)
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}
