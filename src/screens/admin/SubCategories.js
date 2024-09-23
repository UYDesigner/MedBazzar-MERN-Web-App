import React, { useState } from 'react'
import TitleComponent from '../../components/admin/TitleComponent'
import { Button, Grid, TextField, Avatar } from '@mui/material'
import { postData, getData, serverURL } from '../../services/FetchNodeServices'
import Swal from 'sweetalert2'
import { useEffect } from 'react'
import { FormControl } from '@mui/material'
import { InputLabel, Select, MenuItem } from '@mui/material'



export default function SubCategories() {

    const [picture, setPicture] = useState({ file: 'fileicon.png', bytes: '' })
    const [subCategoryName, setSubCategoryName] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [error, setError] = useState({})
    const [categoryList, setCategoryList] = useState([])


    const fetchAllCategory = async () => {

        var result = await getData('category/display_all_category')
        if (result.status) {
            setCategoryList(result.data);
        }
    }

    useEffect(function () {
        fetchAllCategory()
    }, [])


    const fillAllCategory = () => {
        return categoryList.map((item) => {
            return <MenuItem key={item.categoryid} value={item.categoryid}>{item.categoryname}</MenuItem>;
        });
    };





    const handlePicture = (e) => {
        setPicture({
            file: URL.createObjectURL(e.target.files[0]),
            bytes: e.target.files[0]
        })
    }

    const handleError = (label, msg) => {
        setError((prev) => ({ ...prev, [label]: msg }));
    };


    const handleSubCategory = (e) => {
        setSubCategoryName(e.target.value);
    }

    const handleCategoryId = (e) => {
        setCategoryId(e.target.value);
    }

    console.log(picture, subCategoryName, categoryId)

    const handleReset = () => {
        setCategoryId('')
        setPicture({ file: 'fileicon.png', bytes: '' })
        setSubCategoryName('')

    }

    const handleSubmit = async () => {

        var submit = true;

        if (categoryId.length === 0) {
            handleError('categoryId', 'Please fill category ...');
            submit = false;
        }

        if (subCategoryName.length === 0) {
            handleError('subCategoryName', 'Please fill Subcategory Name...');
            submit = false;
        }

        if (picture.bytes.length === 0) {
            handleError('picture', 'Please choose picture...');
            submit = false;
        }


        //   if(.length == 0)
        //   {
        //     setError('categoryId', 'Please fill category id..');
        //     submit=false;
        //   }

        //   if(categoryId.length == 0)
        //   {
        //     setError('categoryId', 'Please fill category id..');
        //     submit=false;
        //   }
        if (submit) {
            var formData = new FormData()
            formData.append('categoryid', categoryId)
            formData.append('subcategoryname', subCategoryName)
            formData.append('picture', picture.bytes)

            var result = await postData('subcategory/submit_subcategory', formData)

            // alert(result.status);
            console.log(result);
            if (result.status) {
                Swal.fire({
                    title: result.message,
                    timer: 500,
                    icon: "success"
                });
            }
            else {
                Swal.fire({
                    title: result.message,
                    timer: 500,
                    icon: "error"
                });
            }
        }

    }

    return (
<div className='main-box w-[100%] bg-[#ededeb] h-[100vh] text-[red] flex items-center justify-center '>
      <div className="box w-[40%] text-[black] bg-[white] rounded-[10px] h-[auto] p-[10px] shadow-2xl">
                <div className='grid grid-cols-1 '>
                    <TitleComponent title="Add New Category" logo="logo.png" listicon="list.png" page='/admindashboard/displayallsubcategory' />

                </div>
                <div className="grid p-[10px] grid-cols-1 ">
                    {/* <TextField
                        label="Category Id"
                        id="categoryid"
                        onChange={handleCategoryId}
                        value={categoryId}
                        error={error.categoryId}
                        helperText={error.categoryId}
                        onFocus={() => handleError('categoryId', '')}
                    /> */}

                    <FormControl>
                        <InputLabel htmlFor="category">Category</InputLabel>
                        <Select
                            label='Category' value={categoryId}

                            onChange={(e) => setCategoryId(e.target.value)}

                            onFocus={() => handleError('categoryId', '')}
                            error={Boolean(error.categoryId)}
                        >
                            {fillAllCategory()}
                        </Select>
                    </FormControl>
                    {error.categoryId ? <span style={{
                        color: '#d32f2f', fontFamily: "Roboto", fontWeight: '400', marginLeft: '15px', fontSize: '13px'
                    }}>{error.categoryId}</span> : <></>}


                </div>
                <div className="grid p-[10px] grid-cols-1 ">
                    <TextField label="Sub Category Name" id='subcategoryname' onChange={handleSubCategory} value={subCategoryName} error={error.subCategoryName}
                        helperText={error.subCategoryName}
                        onFocus={() => handleError('subCategoryName', '')} />
                </div>
                <div className="grid p-[10px] py-[20px]  grid-cols-2 items-center">
                    <div className='flex flex-col'>
                        <Button variant='contained' className='w-[98%] font-semibold ' component="label" style={{ fontWeight: 800, fontSize: '16px', padding: "10px" }} onChange={handlePicture} onClick={() => handleError('picture', '')} >
                            Upload
                            <input type="file" hidden accept='image/*' multiple id='picture' />
                        </Button>
                        {error.picture ? <span style={{
                            color: '#d32f2f', fontFamily: "Roboto", fontWeight: '400', marginLeft: '15px', fontSize: '13px'
                        }}>{error.picture}</span> : <></>}


                    </div>


                    <div className='flex justify-center '>
                        <Avatar src={picture.file} />
                    </div>
                </div>
                <div className="grid px-[10px] py-[20px] grid-cols-2 gap-[10px] font-bold  ">
                    <Button variant='contained' component="label" style={{ fontWeight: 800, fontSize: '16px', padding: "10px" }} onClick={handleSubmit}>
                        Submit
                    </Button>
                    <Button variant='contained' component="label" style={{ fontWeight: 800, fontSize: '16px', padding: "10px" }} onClick={handleReset}>
                        Reset
                    </Button>
                </div>
            </div>
        </div>
    )
}
