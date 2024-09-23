import { React, useState } from 'react'
import { Paper, Button } from '@mui/material'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverURL } from "../../services/FetchNodeServices";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { createRef } from "react";
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import logo from '../../assets/logo.png';
// import Button from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import PlusMinusComponent from './PlusMinusComponent';


export default function FilteredProductListComponent(props) {

    var sld = createRef()
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md')); // Adjust the breakpoint for tablets if needed
    const [addedToCart, setAddedToCart] = useState(true);
    const [check, setCheck] = useState(false);
    var dispatch = useDispatch();
    var navigate = useNavigate();
    var sld = createRef()


    var productFromRedux = useSelector(state => state.data);
    var productReduxvalues = Object.values(productFromRedux);
    var product = props.data;
    // alert(JSON.stringify(product));

    const handleCheck = async () => {
        setCheck(!check);

    }

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



    var settings = {
        dots: false,
        infinite: true,
        speed: 400,
        slidesToScroll: 1,
        autoplay: false,
        centerMode: true,
        centerPadding: '0',
    };

    settings.slidesToShow = matches ? 3 : (isTablet ? 3 : 3);

   

   

    // var product = props?.data
    console.log(JSON.stringify(product))

    const handleToggle = () => {
        addedToCart ? setAddedToCart(false) : setAddedToCart(true);
    };

    const handleProductDetailPage = (item) => {

        navigate('/productpage', { state: { data: item } })
    }

    // const showSlide = () => {


    //     return images.map((item, index) => {

    //         return (
    //             <div key={item} className='flex flex-col ' >
    //                 <div style={{ boxShadow: "  rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px" }} className='  my-[15px] sm:w-[230px] w-[180px] cursor-pointer relative  '>

    //                     <BookmarkAddIcon
    //                         className={`absolute right-2 top-1  hover:text-gray-600 transition-all duration-1000 `}
    //                         style={{ fontSize: '25px' ,color: check ? "gray" : '#c5c6c7' }}
    //                         onClick={() => handleCheck()}

    //                     />

    //                     <div className='w-[100%] py-[25px]'>
    //                         <img src={`${serverURL}/images/${item}`} style={{
    //                             width: matches ? '1' : (isTablet ? '70%' : '80%'),

    //                             height: matches ? 130 : (isTablet ? 150 : 180),
    //                             display: 'block',
    //                             marginLeft: 'auto',
    //                             marginRight: 'auto',
    //                             // background: 'yellow',
    //                             padding: '5px',
    //                             // background: 'red'

    //                         }}
    //                         />
    //                     </div>
    //                     <div className="logo  absolute top-[52%] right-2 ">
    //                         <img src={logo} width={'60'} className='bg-[#d2f5bd] p-[2px] rounded-[20%] ' />
    //                     </div>

    //                     <div className="name  flex flex-col items-start  py-[5px] text-[15px] px-[15px] font-[600] bg-gray-100 " key={`name-${index} `}>


    //                         {name[index]}
    //                         <span>155g</span>
    //                         <span>&#8377;349</span>

    //                     </div>
    //                     <div className="button w-full flex">
    //                         <div style={{ flex: 1 }}>
    //                             <PlusMinusComponent 
    //                             onChange={(v) => handleChange(v, item)} qty={productFromRedux[item?.productdetailid]?.qty === undefined ? 0 : productFromRedux[item?.productdetailid]?.qty }

    //                             />
    //                         </div>
    //                         <div style={{ flex: 1 }}>
    //                             <Button
    //                                 className='w-full'
    //                                 style={{ color: '#01826d', fontSize: '#035182', fontWeight: '600' }}
    //                             >
    //                                 <ShoppingCartIcon onClick={()=>navigate('/cart')} />
    //                             </Button>
    //                         </div>
    //                     </div>
    //                 </div>

    //             </div>
    //         );
    //     });
    // };

    const showSlide = () => {


        return product?.map((item, index) => {
            return (
                <div key={item} >
                    <div style={{ boxShadow: "  rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px", width:isTablet ? '140px' : '250px' }} className=' ml-[0px]  my-[15px]  w-[140px] cursor-pointercursor-pointer relative  translate-x-4 transition-all duration-300 '
                    
                   

                    >

                        <BookmarkAddIcon
                            className={`absolute right-2 top-1  hover:text-gray-600 transition-all duration-1000 `}
                            style={{ fontSize: isTablet ? '20px' : '25px', color: check ? "gray" : '#c5c6c7' }}
                            onClick={() => handleCheck(item, index)}

                        />


                        <div className={`w-[100%] ${isTablet ? 'py-[5px]' : 'py-[25px]'} cursor-pointer `} onClick={() => handleProductDetailPage(item)} >
                            <img src={`${serverURL}/images/${item.picture}`} style={{
                                width: matches ? '1' : (isTablet ? '80%' : '60%'),

                                height: matches ? 130 : (isTablet ? 150 : 180),
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
                                <PlusMinusComponent onChange={(v) => handleChange(v, item)} qty={productFromRedux[item?.productdetailid]?.qty === undefined ? 0 : productFromRedux[item?.productdetailid]?.qty} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <Button
                                    className='w-full'
                                    style={{ color: '#01826d', fontSize: '#035182', fontWeight: '600' }}
                                >
                                    <ShoppingCartIcon onClick={() => navigate('/cart')} />
                                </Button>
                            </div>
                        </div>
                    </div>

                </div>
            );
        });
    };




    return (
        <div>

            <div className={`main-container bg-[#ffffff] '} flex flex-col ${isTablet ? 'm-[0px] ' : 'mt-[40px]'}  ${isTablet ? 'mr-[0px] ' : 'mr-[20px]'}   rounded-[10px]`} 
            style={{width: isTablet? '100%' : '1200px'}}
            
            >
                <div className="poster" >
                    <img src={`${serverURL}/images/ctop.png`} style={{ width: '100%', height: matches ? '200px' : '305px' }} />
                </div>

                <div className="filtered-Products my-[20px] ">
                    <div ref={sld} {...settings} className={` flex flex-row ${isTablet ? 'gap-[20px]' : 'gap-[40px]'} flex-wrap ${isTablet ? 'justify-center' : 'justify-start'} items-center  `}>
                        {showSlide()}
                        
                    </div>
                </div>
            </div>

        </div>


    )
}
