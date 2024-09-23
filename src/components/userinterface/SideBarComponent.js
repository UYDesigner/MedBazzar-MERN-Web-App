import React from 'react'
import { useState, useEffect } from 'react';
import { getData } from '../../services/FetchNodeServices';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function SideBarComponent() {



    const [categoryList, setCategoryList] = useState([])
    const [subCategoryList, setSubCategoryList] = useState([])
    const [brandList, setBrandList] = useState([])
    const [concernData, setConcernData] = useState([]);
    const [readme, setreadme] = useState(false)
    const [brandreader, setbrandreader] = useState(true)
    const [subreader, setsubreader] = useState(false)
    const [concernreader, setconcernreader] = useState(true)

    const handlereadme = () => {
        setreadme(!readme);
    }

    const handlebrand = () => {
        setbrandreader(!brandreader)
    }
    const handleSubcategoryReader = () => {
        setsubreader(!subreader)
    }
    const handleConcernReader = () => {
        setconcernreader(!concernreader)
    }


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
        fetchAllSubCategory();
        fetchAllConcern();
    }, []);




    const showAllCategory = () => {
        console.log(categoryList)

        return categoryList.map((item) => {
            return <div style={{ display: 'flex' }}>
                <div style={{ color: '#616161', fontSize: '15px', cursor: 'pointer' }}  >
                    {item.categoryname}
                </div>
                <div className="checkbox ml-auto ">
                    <input type="checkbox" name="" id="" className='cursor-pointer' />
                </div>
            </div>
        })

    }

    const fetchAllSubCategory = async () => {

        var result = await getData('subcategory/display_all_subcategory')
        if (result.status) {
            setSubCategoryList(result.data);
        }
    }


    const showAllSubcategories = () => {

        console.log()

        return subCategoryList.map((item) => {
            return <div style={{ display: 'flex' }}>
                <div style={{ color: '#616161', fontSize: '15px', cursor: 'pointer' }}  >
                    {item.subcategoryname}
                </div>
                <div className="checkbox ml-auto ">
                    <input type="checkbox" name="" id="" className='cursor-pointer' />
                </div>
            </div>;
        });


    };



    const fetchAllbrand = async () => {



        var result = await getData('brand/display_all_brands')
        if (result.status) {
            setBrandList(result.data);
        }
    }

    const showAllBrand = () => {

        return brandList.map((item) => {
            return <div style={{ display: 'flex' }}>
                <div style={{ color: '#616161', fontSize: '15px', cursor: 'pointer' }}  >
                    {item.brandname}
                </div>
                <div className="checkbox ml-auto ">
                    <input type="checkbox" name="" id="" className='cursor-pointer' />
                </div>
            </div>
        });


    };


    const fetchAllConcern = async () => {
        try {
            const result = await getData('concern/display_all_concern');
            if (result.status) {
                setConcernData(result.data);
            }
        } catch (error) {
            console.error('Error fetching category data:', error);
        }
    };



    const showAllConcern = () => {

        return concernData.map((item) => {
            return <div style={{ display: 'flex' }}>
                <div style={{ color: '#616161', fontSize: '15px', cursor: 'pointer' }}  >
                    {item.concernname}
                </div>
                <div className="checkbox ml-auto ">
                    <input type="checkbox" name="" id="" className='cursor-pointer' />
                </div>
            </div>
        });


    };

    return (
        <div>

            <div className="main-container bg-[#eeeded] w-[350px] flex  flex-col  p-[15px] m-[40px] rounded-[10px] ">

                <div className="header font-[600] text-[18px] ">
                    Filter By
                </div>

                <div className="hr h-[1px] bg-[#bbbbbb]   my-[20px]" >
                    {/* Your content goes here */}

                </div>


                {/* // categories */}

                <div className="category-box">
                    <div className="title text-[#737272] text-[14px] font-[600]  flex flex-row items-center ">
                        Categories

                        <ArrowDropDownIcon className='ml-[auto] px-[2px] cursor-pointer text-[14px]' onClick={handlereadme} />
                    </div>
                    {!readme ? (
                        <div className="categories px-[15px] mt-[10px]">
                            {showAllCategory()}
                        </div>
                    ) : (<>

                    </>)}
                </div>


                {/* // subcategories */}

                <div className="hr h-[1px] bg-[#bbbbbb]   my-[20px]" >
                    {/* Your content goes here */}

                </div>
                <div className="category-box">
                    <div className="title text-[#737272] text-[14px] font-[600]  flex flex-row items-center ">
                        subcategories

                        <ArrowDropDownIcon className='ml-[auto] px-[2px] cursor-pointer text-[14px]' onClick={handleSubcategoryReader} />
                    </div>
                    {!subreader ?
                        <div className="categories px-[15px] mt-[10px]">
                            {showAllSubcategories()}
                        </div>
                        :
                        <>
                        </>
                    }
                </div>


                {/* // Brands */}

                <div className="hr h-[1px] bg-[#bbbbbb]   my-[20px]" >
                    {/* Your content goes here */}

                </div>
                <div className="category-box">
                    <div className="title text-[#737272] text-[14px] font-[600]    flex flex-row items-center ">
                        Brands
                        <ArrowDropDownIcon className='ml-[auto] px-[2px] cursor-pointer text-[14px]' onClick={handlebrand} />
                    </div>
                    {!brandreader ?
                        <div className="categories px-[15px] mt-[10px]">
                            {showAllBrand()}
                        </div>
                        :
                        <>
                        </>
                    }
                </div>


                {/* // concerns */}

                <div className="hr h-[1px] bg-[#bbbbbb]   my-[20px]" >
                    {/* Your content goes here */}

                </div>
                <div className="category-box">
                    <div className="title text-[#737272] text-[14px] font-[600]   flex flex-row items-center">
                        concern
                        <ArrowDropDownIcon className='ml-[auto] px-[2px] cursor-pointer text-[14px]' onClick={handleConcernReader} />
                    </div>
                    {!concernreader ?
                        <div className="categories px-[15px] mt-[10px]">
                            {showAllConcern()}
                        </div>
                        :
                        <>
                        </>
                    }
                </div>


            </div>


        </div>
    )
}
