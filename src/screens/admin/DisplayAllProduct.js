import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import MaterialTable from '@material-table/core';
import Swal from 'sweetalert2';
import { Dialog, DialogActions, DialogContent } from '@mui/material';
import TitleComponent from '../../components/admin/TitleComponent';
import { Button, TextField, Avatar } from '@mui/material';

import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'


import { getData, serverURL, postData } from '../../services/FetchNodeServices';


export default function DisplayAllProduct() {

    const navigate = useNavigate();
    const [product, setProduct] = useState([])
    const [open, setOpen] = useState(false);
    const [close, setClose] = useState(true);
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
    const [brandId, setBrandId] = useState('')
    const [showBtn, setShowBtn] = useState(false);
    const [productId, setProductId] = useState('')
    const [temPicture, setTemPicture] = useState('')

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
        var result = await postData('subcategory/fetch_all_subcategory_by_categoryid', { categoryid: cid })
        if (result.status) {
            setSubCategoryList(result.data)
        }
    }
    useEffect(function () { fetchAllSubCategory() }, [])

    const fillAllSubCategory = () => {
        return subCategoryList.map((item) => {
            return <MenuItem value={item.subcategoryid} >{item.subcategoryname}</MenuItem>
        })
    }


    const fetchAllbrand = async (e) => {
        // setSubCategory(e.target.value);


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
        setShowBtn(true);
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
        setBrandId(e.target.value);
    }

    const handleError = (label, msg) => {
        setError((prev) => ({ ...prev, [label]: msg }));
    };



    const fetchAllProduct = async () => {

        var result = await getData('product/display_all_product')
        if (result.status) {
            setProduct(result.data);
        }

    }

    useEffect(function () {
        fetchAllProduct()
        fetchAllbrand()
    }, [])

    const handleOpen = (rowData) => {
        setOpen(true);
        setClose(false);
        fetchAllSubCategory(rowData.categoryid)
        console.log(rowData.subcategoryname)
        setCategoryId(rowData.categoryid)
        setSubCategory(rowData.subcategoryid)
        console.log(subCategoryId);
        setBrandId(rowData.brandid)
        setProductId(rowData.productid);
        setProductName(rowData.productname)
        setDescription(rowData.description)
        setPicture({
            file: `${serverURL}/images/${rowData.producticon}`,
            bytes: '',
        }
        )

        setTemPicture(`${serverURL}/images/${rowData.brandicon}`)
    }

    const handleClose = () => {
        setClose(true);
        setOpen(false)
        setError('productName', '');
        setError('description', '');
    }


    const handleDelete = (rowData) => {
        Swal.fire({
            title: "Do you want to delete SubCategory ?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Delete",
            denyButtonText: `Don't Delete`
        }).then(async (result) => {
            if (result.isConfirmed) {
                var body = { 'productid': rowData.productid }
                var result = await postData('product/delete_product_data', body)
                Swal.fire({
                    title: 'Deleted Successfully',
                    timer: 1000,
                    icon: "success",
                    toast: true
                });

                fetchAllProduct();
            } else if (result.isDenied) {
                Swal.fire({
                    title: 'Your Data Is Safe',
                    timer: 1000,
                    icon: "Safe",
                    toast: true
                });
            }
        });
    }



    const handleEditProduct = async() => {
        var submit = true;

        if (description.length == 0) {
            handleError('description', 'Please fill product description..')
            submit = false;
        }
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


        if (productName.length == 0) {
            handleError('productName', 'Please fill product name..')
            submit = false;
        }
        if (submit) {
            var body = { 'productid': productId, 'productname': productName, 'categoryid': categoryId , 'subcategoryid': subCategoryId, 'brandid': brandId, 'description': description}
            console.log(body);
            var result = await postData('product/edit_product_data', body);
            console.log(result);
            if (result.status) {
                Swal.fire({
                    title: result.message,
                    timer: 1000,
                    icon: "success",
                    toast: true
                });
            }
            else {
                Swal.fire({
                    title: result.message,
                    timer: 1000,
                    icon: "error",
                    toast: true
                });
            }
        }

        fetchAllProduct();


    }

    const handleEditPicture = async () => {
        var formData = new FormData();
        formData.append('productid', productId);
        formData.append('picture', picture.bytes);

        var result = await postData('product/edit_product_picture', formData)

        if (result.status) {
            Swal.fire({
                title: result.message,
                timer: 1000,
                icon: "success",
                toast: true
            });
        }
        else {
            Swal.fire({
                title: result.message,
                timer: 1000,
                icon: "error",
                toast: true
            });
        }

        fetchAllProduct()
        setShowBtn(false);
    }

    const handleCancel = () => {
        setShowBtn(false);
        setPicture({ file: temPicture, bytes: '' });
    }

    const showProductForm = () => {
        return (
            <Dialog
                open={open}
                onClose={close}
                maxWidth="md"
                fullWidth
                // fullScreen={fullScreen}
                style={{ width: '40%', margin: 'auto', zIndex: 100 }}
            >
                <DialogContent>
                    <div className='grid grid-cols-1 '>
                        <TitleComponent title="Add New Category" logo="logo.png" listicon="list.png" page='/displayallcategory' />
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
                                        setSubCategory(e.target.value);

                                    }}

                                    onFocus={() => handleError('subCategoryId', '')}
                                    error={Boolean(error.subCategoryId)}
                                    // id='subcategoryid'
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

                                    onChange={(e) => setBrandId(e.target.value)}


                                    onFocus={() => handleError('brandid', '')}
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
                            id='description' 
                            onChange={handleDescription}
                            value={description} error={error.description}
                            helperText={error.description}
                            onFocus={() => handleError('description', '')}
                        />

                    </div>
                    <div className="grid p-[10px] py-[20px]  grid-cols-2 items-center">
                        <div className='flex flex-col'>
                            {showBtn ? (
                                <div className='grid grid-cols-2   w-[100%] gap-[30px]'>
                                    <Button variant='contained' className='font-semibold ' style={{ fontWeight: 800, fontSize: '16px', padding: "10px" }} onClick={handleEditPicture}  >Save</Button>


                                    <Button variant='contained' className='font-semibold ' style={{ fontWeight: 800, fontSize: '16px', padding: "10px" }} onClick={handleCancel} >Cancel</Button>
                                </div>
                            ) : (
                                <Button variant='contained' className='w-[98%] font-semibold ' component="label" style={{ fontWeight: 800, fontSize: '16px', padding: "10px" }} onChange={handlePicture} >
                                    Upload
                                    <input type="file" hidden accept='image/*' multiple id='picture' />
                                </Button>)}
                            {error.picture ? <span style={{
                                color: '#d32f2f', fontFamily: "Roboto", fontWeight: '400', marginLeft: '15px', fontSize: '13px'
                            }}>{error.picture}</span> : <></>}


                        </div>


                        <div className='flex justify-center '>
                            <Avatar src={picture.file} 
                            style={{ width: 150, height: 150 }}
                            />
                        </div>
                    </div>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditProduct}>Edit</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        )
    }







    function showProduct() {

        return (
            <MaterialTable
                title="Product List"
                columns={[
                    { title: 'Product Id', field: 'productid', type: 'numeric' },
                    { title: 'Product Name', field: 'productname', type: 'numeric' },
                    { title: 'Category', field: 'categoryname' },
                    { title: 'Subcategory', field: 'subcategoryname' },
                    { title: 'Brand', field: 'brandname' },
                    { title: 'Description', field: 'description' },
                    {
                        title: 'Icon',
                        field: 'subcategoryicon',
                        render: (rowData) => <>
                            <img
                                src={`${serverURL}/images/${rowData.producticon}`}
                                style={{ width: '80px', height: '80px', borderRadius: '50%' }}
                            />
                        </>
                    },
                ]}
                data={product}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit Product',
                        onClick: (event, rowData) => handleOpen(rowData),
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete Product',
                        onClick: (event, rowData) => handleDelete(rowData)
                    },
                    {
                        icon: 'add',
                        tooltip: 'Add New SubCategory',
                        isFreeAction: true,
                        onClick: (event) => navigate('/admindashboard/product')
                    }

                ]}
            />
        )

    }




    return (
        <div className='main-box w-[100%] bg-[#ededeb] h-[100vh] text-[red] flex items-center justify-center '>
      <div className="box w-[60%] text-[black] bg-[white] rounded-[10px] h-[auto] p-[10px] shadow-2xl">
                <div>{showProduct()}</div>
                {showProductForm()}

            </div>
        </div>
    )
}
