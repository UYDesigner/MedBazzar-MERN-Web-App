import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import RingVolumeIcon from '@mui/icons-material/RingVolume';
import { useState, useEffect } from 'react';
import { getData } from '../../services/FetchNodeServices';
import { useNavigate } from 'react-router-dom';
export default function FooterComponent() {
    var navigate = useNavigate();
    const [categoryList, setCategoryList] = useState([])
    const [subCategoryList, setSubCategoryList] = useState([])
    const [brandList, setBrandList] = useState([])


    const fetchAllCategory = async () => {
        try {
            const result = await getData('userinterface/display_all_category');
            if (result.status) {
                setCategoryList(result.data);
            }
        } catch (error) {
            console.error('Error fetching category data:', error);
        }
    };

    useEffect(() => {
        fetchAllCategory();
        fetchAllbrand();
    }, []);

    const handleFooterItem =(item)=>{
       alert(JSON.stringify(item));
       navigate('/filterpage/null', {state:{categoryid : item.categoryid, brandid : item.brandid}});
       
    }
    


    const showAllCategory = () => {
        console.log(categoryList)

        return categoryList.map((item) => {
            return <div style={{ color: '#b5b5b5',cursor:'pointer' }} onClick={()=>handleFooterItem(item)}  >{item.categoryname}</div>
        })

    }


    const fetchAllbrand = async () => {



        var result = await getData('brand/display_all_brands')
        if (result.status) {
            setBrandList(result.data);
        }
    }

    const showAllBrand = () => {

        return brandList.map((item) => {
            return <div style={{ color: '#b5b5b5',cursor:'pointer' }} onClick={()=>handleFooterItem(item)}  >{item.brandname}</div>;
        });


    };


    return (
        <div className=' w-[100%] p-2 static bg-[#323a46] ' >

            <div className="main-container bg-[#323a46] max-w-[1200px] grid  sm:grid-cols-2 grid-cols-1  justify-between  mx-auto p-[20px]">
                <div className="left  ">

                    <div className="follow-col mb-[30px] mt-[20px] ">
                        <div style={{ fontWeight: '900', fontSize: '20px', color: '#b5b5b5' }}>
                            Follow us
                        </div>
                        <div className="ICONS flex gap-[10px] mt-[10px]" >
                            <FacebookIcon style={{ fontSize: '30px', color: '#b5b5b5' }} />
                            <InstagramIcon style={{ fontSize: '30px', color: '#b5b5b5' }} />
                            <TwitterIcon style={{ fontSize: '30px', color: '#b5b5b5' }} />
                            <LinkedInIcon style={{ fontSize: '30px', color: '#b5b5b5' }} />
                        </div>

                    </div>

                    <div className="catemed-col grid grid-cols-2 mb-[30px]">

                        <div className="categories-col">
                            <div style={{ fontWeight: '900', fontSize: '20px', color: '#b5b5b5', marginBottom: "10px" }} >
                                Categories
                            </div>
                            {showAllCategory()}

                        </div>

                        <div className="Brands-col">
                            <div style={{ fontWeight: '900', fontSize: '20px', color: '#b5b5b5', marginBottom: "10px" }}>
                                Brands
                            </div>
                            {showAllBrand()}

                        </div>

                    </div>

                </div>
                <div className="right ">
                    <div className="contact">
                        <div className="email mb-[20px] mt-[20px]">
                            <div style={{ fontWeight: '900', fontSize: '20px', color: '#b5b5b5', marginBottom:'10px' }} >
                                Email us
                            </div>
                            <div>
                                <MailOutlineIcon style={{ fontSize: '25px', marginRight: '15px', fontWeight: 'bold', color: '#b5b5b5',  }} />

                                <span style={{ fontSize: '16px', marginRight: '15px', color: '#b5b5b5' }} >info@MedBazzer.in</span>
                            </div>
                        </div>
                        <div className="call">
                            <div style={{ fontWeight: '900', fontSize: '20px', color: '#b5b5b5', marginBottom:'10px' }} >
                                Contact us
                            </div>
                            <div >
                                <RingVolumeIcon style={{ fontSize: '25px', marginRight: '15px', color: '#b5b5b5' }} />

                                <span style={{ fontSize: '16px', marginRight: '15px', color: "#b5b5b5" }} >  1800 266 2244</span>
                            </div>
                        </div>

                    </div>
                    
                    <div className="hr h-[1px] bg-[#b5b5b5] mt-[30px] mb-[30px]" style={{ boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.5)" }}>
                        {/* Your content goes here */}

                    </div>
                    <div className="intro">
                        <div style={{ fontWeight: '900', fontSize: '20px', color: '#b5b5b5', marginBottom:'10px' }} >
                            Trust Our Services
                        </div>
                        <div style={{ fontSize: '14px', marginRight: '15px', color: '#b5b5b5' }} >
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. In rem similique recusandae molestiae hic dignissimos aperiam velit neque corrupti itaque veniam,
                        </div>

                    </div>
                </div>

            </div>

        </div>
    )
}
