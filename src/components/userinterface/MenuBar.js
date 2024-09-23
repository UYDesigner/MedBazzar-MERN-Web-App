import React from 'react'
import { Button, menuClasses, Menu, MenuItem } from '@mui/material'
import { useState, useEffect } from 'react'
import { serverURL, getData, postData } from '../../services/FetchNodeServices'

export default function MenuBar() {

    const [categoryList, setCategoryList] = useState([])
    const [subCategoryList, setSubCategoryList] = useState([])
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    };


    const fetchAllSubCategory = async (cid) => {
        console.log(cid);
        var result = await postData('userinterface/fetch_all_subcategory_by_categoryid', { 'categoryid': cid })

        setSubCategoryList(result.data);
    }

    const fillAllSubCategory = () => {
        return subCategoryList.map((item) => {
            return <MenuItem key={item.categoryid} value={item.subcategoryid}>{item.subcategoryname}</MenuItem>;
        });
    };

    const handleClick = async (categoryid, event) => {
        // alert(categoryid)
        setAnchorEl(event.currentTarget)
        fetchAllSubCategory(categoryid)


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
    }, []);








    const showAllCategory = () => {
        console.log(categoryList)

        return categoryList.map((item) => {
            return <Button onClick={(event) => handleClick(item.categoryid, event)} style={{ color: '#000', fontWeight: 'bolder' }}  >{item.categoryname}</Button>
        })

    }


    const showAllSubCategory = () => {
        console.log(categoryList)

        return subCategoryList.map((item) => {
            return <MenuItem  style={{ color: '#000', fontWeight: 'bolder' }}  >{item.subcategoryname}</MenuItem>
        })

    }


    return (
        <div>
            <div className=' w-[100%] p-1 static shadow-md'>
                <div className="main-container bg-[white] max-w-[1800px] flex  items-center justify-center mx-auto p-[5px] text-[black] gap-6">

                    {showAllCategory()}
                    <Menu

                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        {showAllSubCategory()}
                        

                    </Menu>

                </div>
            </div>
        </div>
    )
}
