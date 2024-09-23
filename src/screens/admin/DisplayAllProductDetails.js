import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import MaterialTable from '@material-table/core';
import Swal from 'sweetalert2';
import { Dialog, DialogActions, DialogContent } from '@mui/material';
import TitleComponent from '../../components/admin/TitleComponent';
import { Button, TextField, Avatar } from '@mui/material';

import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'


import { getData, serverURL, postData } from '../../services/FetchNodeServices';

export default function DisplayAllProductDetails() {

    var navigate = useNavigate();
    const [productDetail, setProductDetail] = useState([])
    const [picture, setPicture] = useState({
        file: 'fileicon.png',
        bytes: ''
    })
    const [categoryId, setCategoryId] = useState('')
    const [subCategoryList, setSubCategoryList] = useState([])
    const [categoryList, setCategoryList] = useState([])
    const [brandList, setBrandList] = useState([])
    const [subCategoryId, setSubCategory] = useState('')
    const [brandId, setBrand] = useState('')
    const [productList, setProductList] = useState([])
    const [productId, setProductId] = useState('')
    const [productSubName, setProductSubName] = useState('')
    const [weight, setWeight] = useState('')
    const [weightType, setWeightType] = useState('')
    const [type, setType] = useState('');
    const [packaging, setPackaging] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [offerPrice, setOfferPrice] = useState('');
    const [offerType, setOfferType] = useState('');
    const [error, setError] = useState({})
    const [open, setOpen] = useState(false);
    const [temPicture, setTemPicture] = useState('');
    const [showBtn, setShowBtn] = useState(false);
    const [productDetailId, setProductDetailId] = useState('');
    const [description, setDescription] = useState('')



    const handleError = (label, msg) => {
        setError((prev) => ({ ...prev, [label]: msg }));
    };




    const handleClose = () => {
        setOpen(false);
    }

    const handleCancel = () => {
        setShowBtn(false);
        setPicture({ file: temPicture, bytes: '' });
    }

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

        setShowBtn(true);
    }


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
        setSubCategory(e);


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

    const fetchAllProduct = async (brand) => {


        var body = { 'categoryid': categoryId, 'subcategoryid': subCategoryId, 'brandid': brand }
        console.log(body);

        var result = await postData('product/fetch_all_product_by_filteration', body)


        if (result.status) {
            setProductList(result.data);
        }


    }

    const fillAllProduct = () => {

        return productList.map((item) => {
            return <MenuItem key={item.productid} value={item.productid}>{item.productname}</MenuItem>;
        });


    };


    const handleCategoryChange = (e) => {
        setCategoryId(e.target.value)
        fetchAllSubCategory(e.target.value)
    }



    const handleProduct = (e) => {

        setBrand(e.target.value);
        fetchAllProduct(e.target.value);
    }





    const fetchAllProductDetail = async () => {

        var result = await getData('productdetail/display_all_productdetails')
        console.log(result)
        if (result.status) {
            setProductDetail(result.data);
        }

    }

    useEffect(function () {
        fetchAllProductDetail()

    }, [])

    console.log('dffff',productDetail);


    const handleOpen = (rowData) => {
        setOpen(true);
        fetchAllSubCategory(rowData.categoryid)
        fetchAllbrand(rowData.subcategoryid)

        console.log(rowData.subcategoryname)
        setCategoryId(rowData.categoryid)
        setSubCategory(rowData.subcategoryid)
        console.log(subCategoryId);
        setBrand(rowData.brandid)
        fetchAllProduct(rowData.categoryid, rowData.subcategoryid, rowData.brandid)
        setProductId(rowData.productid);
        setProductSubName(rowData.productsubname)
        // setDescription(rowData.description)
        setPackaging(rowData.packaging)
        setWeight(rowData.weight);
        setWeightType(rowData.weighttype)
        setType(rowData.typed);
        setOfferPrice(rowData.offerprice);
        setOfferType(rowData.offertype)
        setQuantity(rowData.quantity);
        setPrice(rowData.price);
        setPicture({
            file: `${serverURL}/images/${rowData.picture}`,
            bytes: '',
        }
        )
        setDescription(rowData.description);
        setProductDetailId(rowData.productdetailid);

        setTemPicture(`${serverURL}/images/${rowData.picture}`)
    }

    const handleDelete = async (rowData) => {
        Swal.fire({
            title: "Do you want to delete SubCategory ?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Delete",
            denyButtonText: `Don't Delete`
        }).then(async (result) => {
            if (result.isConfirmed) {
                var body = { 'productdetailid': rowData.productdetailid }
                var result = await postData('productdetail/delete_productdetail_data', body)
                Swal.fire({
                    title: 'Deleted Successfully',
                    timer: 1000,
                    icon: "success",
                    toast: true
                });

                fetchAllProductDetail();
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

    const handleEditPicture = async (rowData) => {
        var formData = new FormData();
        formData.append('productdetailid', productDetailId);
        formData.append('picture', picture.bytes);

        var result = await postData('productdetail/edit_productdetail_picture', formData)

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

        fetchAllProductDetail()
        setShowBtn(false);
    }


    const showProductDetailsForm = () => {
        return (
            <Dialog
                open={open}
                // onClose={ha}
                maxWidth="md"
                fullWidth
                // fullScreen={fullScreen}
                style={{ width: '40%', margin: 'auto', zIndex: 100 }}
            >
                <DialogContent>
                    <div className='grid grid-cols-1 '>
                        <TitleComponent title="Add New Category" logo="logo.png" />
                    </div>
                    <div className="grid p-[10px] py-[20px]  grid-cols-4 items-center gap-[20px]">
                        <div className='flex flex-col'>
                            <FormControl>
                                <InputLabel htmlFor="category">Category</InputLabel>
                                <Select
                                    label='Category'
                                    value={categoryId}

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
                                    label='subCategory..'
                                    value={subCategoryId}

                                    onChange={(e) => {
                                        fetchAllbrand(e);

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
                                    label='Brand'
                                    value={brandId}

                                    onChange={(e) => { handleProduct(e) }}


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
                        <div className='flex flex-col'>
                            <FormControl>
                                <InputLabel htmlFor="category">Product</InputLabel>
                                <Select
                                    label='Product'
                                    value={productId}

                                    onChange={(e) => {
                                        setProductId(e.target.value)
                                    }}

                                    onFocus={() => handleError('productId', '')}
                                    error={Boolean(error.productId)}
                                >
                                    {fillAllProduct()}

                                </Select>
                            </FormControl>
                            {error.productId ? <span style={{
                                color: '#d32f2f', fontFamily: "Roboto", fontWeight: '400', marginLeft: '15px', fontSize: '13px'
                            }}>{error.productId}</span> : <></>}



                        </div>

                    </div>
                    <div className="grid p-[10px] grid-cols-5 items-center gap-[20px] ">
                        <div className='flex flex-col col-span-2'>
                            <TextField label="Product Sub Name"
                                id='productSubName' onChange={(e) => setProductSubName(e.target.value)}
                                value={productSubName}
                                error={error.productSubName}
                                helperText={error.productSubName}
                                onFocus={() => handleError('productSubName', '')}
                            />
                        </div>

                        <div className='flex flex-col col-span-1'>
                            <TextField label="Weight"
                                id='weight' onChange={(e) => { setWeight(e.target.value) }}
                                value={weight}
                                error={error.weight}
                                helperText={error.weight}
                                onFocus={() => handleError('weight', '')}
                            />
                        </div>
                        <div className='flex flex-col col-span-1'>
                            <FormControl>
                                <InputLabel htmlFor="category">Weight Type</InputLabel>
                                <Select
                                    label='Weight Type'
                                    id='weightType'
                                    onChange={(e) => { setWeightType(e.target.value) }}
                                    value={weightType}

                                    onFocus={() => handleError('weightType', '')}
                                    error={Boolean(error.weightType)}
                                >
                                    <MenuItem value="kg">kg</MenuItem>
                                    <MenuItem value="lb">lb</MenuItem>


                                </Select>
                            </FormControl>
                            {error.weightType ? <span style={{
                                color: '#d32f2f', fontFamily: "Roboto", fontWeight: '400', marginLeft: '15px', fontSize: '13px'
                            }}>{error.weight}</span> : <></>}

                        </div>
                        <div className='flex flex-col col-span-1'>
                            <FormControl>
                                <InputLabel htmlFor="category">Type</InputLabel>
                                <Select
                                    label='Type'
                                    id='type' onChange={(e) => { setType(e.target.value) }}
                                    value={type}

                                    onFocus={() => handleError('type', '')}
                                    error={Boolean(error.type)}
                                >
                                    <MenuItem value="kg">kg</MenuItem>
                                    <MenuItem value="lb">lb</MenuItem>

                                </Select>
                            </FormControl>
                            {error.type ? <span style={{
                                color: '#d32f2f', fontFamily: "Roboto", fontWeight: '400', marginLeft: '15px', fontSize: '13px'
                            }}>{error.type}</span> : <></>}



                        </div>
                    </div>
                    <div className="grid p-[10px] grid-cols-3 items-center gap-[20px] ">
                        <div className='flex flex-col'>
                            <FormControl>
                                <InputLabel htmlFor="category">Packaging</InputLabel>
                                <Select
                                    label='Packaging'
                                    id='packaging' onChange={(e) => { setPackaging(e.target.value) }}
                                    value={packaging}

                                    onFocus={() => handleError('packaging', '')}
                                    error={Boolean(error.packaging)}
                                >
                                    <MenuItem value="box">box</MenuItem>
                                    <MenuItem value="striped">striped</MenuItem>

                                </Select>
                            </FormControl>
                            {error.packaging ? <span style={{
                                color: '#d32f2f', fontFamily: "Roboto", fontWeight: '400', marginLeft: '15px', fontSize: '13px'
                            }}>{error.packaging}</span> : <></>}



                        </div>
                        <div className='flex flex-col col-span-1'>
                            <TextField label="Quantity"
                                id='quantity' onChange={(e) => { setQuantity(e.target.value) }}
                                value={quantity}
                                error={error.quantity}
                                helperText={error.quantity}
                                onFocus={() => handleError('quantity', '')}
                            />
                        </div>
                        <div className='flex flex-col col-span-1'>
                            <TextField label="Price"
                                id='price' onChange={(e) => { setPrice(e.target.value) }}
                                value={price}
                                error={error.price}
                                helperText={error.price}
                                onFocus={() => handleError('price', '')}
                            />
                        </div>

                    </div>
                    <div className="grid p-[10px] grid-cols-1 items-center gap-[20px] ">
                        <div className='flex flex-col '>
                            <TextField label="Description"
                                id='description' onChange={(e) => { setDescription(e.target.value) }}
                                value={description}
                                error={error.description}
                                helperText={error.description}
                                onFocus={() => handleError('description', '')}
                            />
                        </div>
                    </div>
                    <div className="grid p-[10px] grid-cols-6 items-center gap-[20px] ">
                        <div className='flex flex-col col-span-2'>
                            <TextField label="Offer Price"
                                id='offerPrice' onChange={(e) => { setOfferPrice(e.target.value) }}
                                value={offerPrice}
                                error={error.offerPrice}
                                helperText={error.offerPrice}
                                onFocus={() => handleError('offerPrice', '')}
                            />
                        </div>
                        <div className='flex flex-col col-span-3'>
                            <FormControl>
                                <InputLabel htmlFor="category">Offer Type</InputLabel>
                                <Select
                                    label='Offer Type'
                                    id='offerType' onChange={(e) => { setOfferType(e.target.value) }}
                                    value={offerType}

                                    onFocus={() => handleError('offerType', '')}
                                    error={Boolean(error.offerType)}
                                >
                                    <MenuItem value="season offer">season offer</MenuItem>
                                    <MenuItem value="festival offer">festival offer</MenuItem>
                                    <MenuItem value="black friday sale">black friday sale"</MenuItem>

                                </Select>
                            </FormControl>
                            {error.offerType ? <span style={{
                                color: '#d32f2f', fontFamily: "Roboto", fontWeight: '400', marginLeft: '15px', fontSize: '13px'
                            }}>{error.offerType}</span> : <></>}



                        </div>

                    </div>
                    <div className="grid p-[10px] py-[20px]  grid-cols-2 items-center">
                        <div className='flex flex-col'>
                            {showBtn ? (
                                <div className='grid grid-cols-2   w-[100%] gap-[30px]'>
                                    <Button variant='contained' className='font-semibold ' style={{ fontWeight: 800, fontSize: '16px', padding: "10px" }}
                                        onClick={handleEditPicture}
                                    >Save</Button>


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
                    <Button
                    // onClick={handleEditProduct}
                    >Edit</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        )
    }



    function showProductDetails() {
        return (
            <MaterialTable

                title="Product Detail"
                columns={[
                    { title: 'Product Detail Id', field: 'productdetailid', type: 'numeric' },
                    { title: 'Product', render: (rowData) => <div><div>{rowData.brandname}</div><div>{rowData.productname}/{rowData.productsubname}</div><div>{rowData.weight}{rowData.weighttype}</div></div> },

                    { title: 'Category', render: (rowData) => <div><div>{rowData.categoryname}</div><div>{rowData.subcategoryname}</div></div> },

                    { title: 'Concern', render: (rowData) => <div><div>{rowData.concernname}</div></div> },


                    { title: 'Type', render: (rowData) => <div><div>{rowData.qty}{rowData.typed}</div><div>{rowData.packaging}</div></div> },

                    { title: 'Price', render: (rowData) => <div><div><s>
                        &#8377;{rowData.price}</s></div><div> &#8377;{rowData.offerprice}</div></div> },


                    { title: 'Offer Type', field: 'offertype' },
                    {
                        title: 'Icon',
                        field: 'picture',
                        render: (rowData) => <>
                            <img
                                src={`${serverURL}/images/${rowData.picture.split(',')[0]}`}
                                style={{ width: '80px', height: '80px', borderRadius: '50%' }}
                            />
                        </>
                    },
                ]}
                data={productDetail}
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
                        onClick: (event) => navigate('/admindashboard/productdetails')
                    }

                ]}


            />
        )
    }







    return (
        <div className='main-box w-[100%] bg-[#ededeb] h-[100vh] text-[red] flex items-center justify-center '>
        <div className="box w-[80%] text-[black] bg-[white] rounded-[10px] h-[auto] p-[10px] shadow-2xl">
                <div>{showProductDetails()}</div>
                {showProductDetailsForm()}

            </div>
        </div>
    )
}
