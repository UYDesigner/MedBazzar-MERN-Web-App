import React, { useState } from 'react'
import TitleComponent from '../../components/admin/TitleComponent'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { TextField, Button, Grid, Avatar } from '@mui/material'
import { useEffect } from 'react'
import { getData, postData } from '../../services/FetchNodeServices'
import Swal from 'sweetalert2'




export default function Product() {

    const [picture, setPicture] = useState({
        file: 'fileicon.png',
        bytes: ''
    })
    const [productName, setProductName] = useState('')
    const [description, setDescription] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [error, setError] = useState({})
    const [subCategoryList, setSubCategoryList] = useState([])
    const [categoryList, setCategoryList] = useState([])
    const [brandList, setBrandList] = useState([])
    const [subCategoryId, setSubCategory] = useState('')
    const [brandId, setBrand] = useState('')



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

    const fetchAllSubCategory = async (cid) => {
        console.log(cid);
        var result = await postData('subcategory/fetch_all_subcategory_by_categoryid', { 'categoryid': cid })

        setSubCategoryList(result.data);
    }

    const fillAllSubCategory = () => {
        return subCategoryList.map((item) => {
            return <MenuItem key={item.categoryid} value={item.subcategoryid}>{item.subcategoryname}</MenuItem>;
        });
    };


    const fetchAllbrand = async (e) => {
        setSubCategory(e.target.value);


        var result = await getData('brand/display_all_brands')
        if (result.status) {
            setBrandList(result.data);
        }
    }

    const fillAllBrand = () => {

        return brandList.map((item) => {
            return <MenuItem key={item.brandid} value={item.brandid}>{item.brandname}</MenuItem>;
        });


    };








    const handlePicture = (e) => {
        setPicture({
            file: URL.createObjectURL(e.target.files[0]),
            bytes: e.target.files[0]
        })
    }
    const handleDescription = (e) => {
        setDescription(e.target.value);
    }
    const handleProductName = (e) => {
        setProductName(e.target.value);
    }

   

    const handleCategoryChange = (e) => {
        setCategoryId(e.target.value)
        fetchAllSubCategory(e.target.value)
    }

    const handleBrand = (e) => {
        setBrand(e.target.value);
    }

    const handleError = (label, msg) => {
        setError((prev) => ({ ...prev, [label]: msg }));
    };


    const handleSubmit = async () => {

        var submit = true;
        console.log('klklklll',categoryId.length, subCategoryId, brandId)
        if (categoryId.length === 0) {
            handleError('categoryId', 'Choose category ');
            submit = false;
        }

        if (subCategoryId.length === 0) {
            handleError('subCategoryId', 'Choose Subcategory ');
            submit = false;
        }

        if (brandId.length === 0) {
            handleError('brandId', 'Choose brand ');
            submit = false;
        }

        if (picture.bytes.length === 0) {
            handleError('picture', 'Please choose picture...');
            submit = false;
        }


        if (productName.length == 0) {
            handleError('productName', 'Please fill productname..');
            submit = false;
        }

        if (description.length == 0) {
            handleError('description', 'Please fill description...');
            submit = false;
        }
        if (submit) {
            var formData = new FormData()
            formData.append('categoryid', categoryId)
            formData.append('subcategoryid', subCategoryId)
            formData.append('brandid', brandId)
            formData.append('productname', productName)

            formData.append('description', description)

            formData.append('picture', picture.bytes)

            var result = await postData('product/submit_product', formData)

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


    const handleReset = () => {
        setBrand('');
        setBrandList(['']);
        setCategoryId('');
        setDescription('');
        setPicture({
          file: 'fileicon.png',
          bytes: ''
        });
        setProductName('');
        setSubCategory('')
        setSubCategoryList(['']);
        
      };
      
      

    return (
        <div className='main-box w-[100%] bg-[#ededeb] h-[100vh] text-[red] flex items-center justify-center '>
      <div className="box w-[40%] text-[black] bg-[white] rounded-[10px] h-[auto] p-[10px] shadow-2xl">
                <div className='grid grid-cols-1 '>
                    <TitleComponent title="Add New Category" logo="logo.png" listicon="list.png" page='/admindashboard/displayallproducts' />
                </div>
                <div className="grid p-[10px] py-[20px]  grid-cols-3 items-center gap-[20px]">
                    <div className='flex flex-col'>
                        <FormControl>
                            <InputLabel htmlFor="category">Category</InputLabel>
                            <Select
                                label='Category' value={categoryId}

                                onChange={(e) => {
                                   handleCategoryChange(e);
                                }}

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


                    <div className='flex flex-col'>
                        <FormControl>
                            <InputLabel htmlFor="category">SubCategory</InputLabel>
                            <Select
                                label='subCategory..' value={subCategoryId}

                                onChange={(e) => {
                                    fetchAllbrand(e);
                                    // handleBrand(e)
                                }}

                            onFocus={() => handleError('subCategoryId', '')}
                            error={Boolean(error.subCategoryId)}
                            >
                                {fillAllSubCategory()}

                            </Select>
                        </FormControl>
                        {error.subCategoryId ? <span style={{
                        color: '#d32f2f', fontFamily: "Roboto", fontWeight: '400', marginLeft: '15px', fontSize: '13px'
                    }}>{error.subCategoryId}</span> : <></>}
                    </div>
                    <div className='flex flex-col'>
                        <FormControl>
                            <InputLabel > Brand</InputLabel>
                            <Select
                            label='Category' value={brandId}

                            onChange={(e) => setBrand(e.target.value)}
                           

                            onFocus={() => handleError('brandId', '')}
                            error={Boolean(error.brandId)}
                            >
                                {fillAllBrand()}

                            </Select>
                        </FormControl>
                        {error.brandId ? <span style={{
                        color: '#d32f2f', fontFamily: "Roboto", fontWeight: '400', marginLeft: '15px', fontSize: '13px'
                    }}>{error.brandId}</span> : <></>}
                    </div>
                </div>

                <div className="grid p-[10px] grid-cols-1 ">
                    <TextField label="Product Name"
                        id='productName' onChange={handleProductName}
                    value={productName} error={error.productName}
                    helperText={error.productName}
                    onFocus={() => handleError('productName', '')}
                    />
                </div>
                <div className="grid p-[10px] grid-cols-1 ">
                    <TextField label="Description"
                        id='description' onChange={handleDescription}
                    value={description} error={error.description}
                    helperText={error.description}
                    onFocus={() => handleError('description', '')}
                    />

                </div>
                <div className="grid p-[10px] py-[20px]  grid-cols-2 items-center">
                    <div className='flex flex-col'>
                        <Button variant='contained' className='w-[98%] font-semibold ' component="label" style={{ fontWeight: 800, fontSize: '16px', padding: "10px" }} onChange={handlePicture} >
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
                    <Button variant='contained' component="label" style={{ fontWeight: 800, fontSize: '16px', padding: "10px" }} onClick={handleSubmit} >
                        Submit
                    </Button>
                    <Button variant='contained' component="label" style={{ fontWeight: 800, fontSize: '16px', padding: "10px" }}
                    onClick={handleReset}
                    >
                        Reset
                    </Button>
                </div>

            </div>
        </div>

    )
}
