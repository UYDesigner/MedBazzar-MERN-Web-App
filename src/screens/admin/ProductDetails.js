import React from 'react'
import TitleComponent from '../../components/admin/TitleComponent'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { TextField, Button, Grid, Avatar } from '@mui/material'
import { useEffect, useState } from 'react'
import { getData, postData } from '../../services/FetchNodeServices'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import { useMemo } from 'react'
import Swal from 'sweetalert2'
import { Margin } from '@mui/icons-material'
import { json } from 'react-router-dom'

export default function ProductDetails() {

    const [picture, setPicture] = useState({ file: [], bytes: '' })
    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline', "strike"],
                [{ 'list': 'ordered' }, { 'list': 'bullet' },
                { 'indent': '-1' }, { 'indent': '+1' }],
                ['image', "link", "video"],
                [{ 'color': ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466'] }]
            ],

        },
    }), [])
    const [categoryId, setCategoryId] = useState('')
    const [subCategoryList, setSubCategoryList] = useState([])
    const [categoryList, setCategoryList] = useState([])
    const [brandList, setBrandList] = useState([])
    const [subCategoryId, setSubCategory] = useState('')
    const [brandId, setBrand] = useState('')
    const [productList, setProductList] = useState([])
    const [concernList, setConcernList] = useState([])
    const [concernId, setConcernId] = useState('')
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
    const [description, setDescription] = useState('');



    const handleError = (label, msg) => {
        setError((prev) => ({ ...prev, [label]: msg }));
    };








    const fetchAllCategory = async () => {

        var result = await getData('category/display_all_category')
        if (result.status) {
            setCategoryList(result.data);
        }
    }

    useEffect(function () {
        fetchAllCategory()
        fetchAllConcern()
    }, [])


    const fillAllCategory = () => {
        return categoryList.map((item) => {
            return <MenuItem key={item.categoryid} value={item.categoryid}>{item.categoryname}</MenuItem>;
        });
    };

    const fetchAllConcern = async () => {

        var result = await getData('concern/display_all_concern')
        if (result.status) {
            setConcernList(result.data);
        }
    }

   


    const fillAllConcern = () => {
        return concernList.map((item) => {
            return <MenuItem key={item.concernid} value={item.concernid}>{item.concernname}</MenuItem>;
        });
    };



    const handlePicture = async (event) => {
        alert(event.target.files.length);
        alert(JSON.stringify(event.target.files));
        console.log(event.target.files);

        // if (Object.values(event.target.files).length <= 2) {
        //     alert("Pls Upload 3 or more files");
        // } else {
        //     setPicture({ file: Object.values(event.target.files), bytes: event.target.files }, () => {
        //         alert(JSON.stringify(picture)); // Access the updated state in the callback
        //         console.log('picture data',picture);
        //     });
        // }

        if (Object.values(event.target.files).length <= 2) {
            alert("Pls Upload 3 or more files");
        }

        else {
            setPicture({
                file: Object.values(event.target.files),
                bytes: event.target.files
            })
            console.log(picture);
        }

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

    const handleSubmit = async () => {

        console.log(picture);

        var submit = true;
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

        if (concernId.length === 0) {
            handleError('concernid', 'Choose concern ');
            submit = false;
        }

        if (productId.length === 0) {
            handleError('productId', 'Choose product ');
            submit = false;
        }

        // if (picture.bytes.length === 0) {
        //     handleError('picture', 'Please choose picture...');
        //     submit = false;
        // }


        if (productSubName.length == 0) {
            handleError('productSubName', 'Please fill productsubname..');
            submit = false;
        }

        if (weight.length == 0) {
            handleError('weight', 'Please fill weight..');
            submit = false;
        }

        if (weightType.length == 0) {
            handleError('weightType', 'fill it');
            submit = false;
        }

        if (type.length == 0) {
            handleError('type', 'fill it..');
            submit = false;
        }

        if (packaging.length == 0) {
            handleError('packaging', ' please fill quantity..');
            submit = false;
        }

        if (price.length == 0) {
            handleError('price', ' please fill price..');
            submit = false;
        }
        if (offerPrice.length == 0) {
            handleError('offerPrice', ' please fill Offer price..');
            submit = false;
        }
        if (offerType.length == 0) {
            handleError('offerType', ' please fill offer type..');
            submit = false;
        }

        if (quantity.length == 0) {
            handleError('quantity', ' please fill quantity type..');
            submit = false;
        }

        if (description.length == 0) {
            handleError('description', ' please fill description...');
            submit = false;
        }




        if (submit) {
            var formData = new FormData()
            formData.append('categoryid', categoryId)
            formData.append('subcategoryid', subCategoryId)
            formData.append('brandid', brandId)
            formData.append('productid', productId)
            formData.append('concernid', concernId)
            formData.append('productsubname', productSubName)
            // formData.append('picture', picture.file);
            formData.append('price', price)
            formData.append('offerprice', offerPrice)
            formData.append('offertype', offerType)
            formData.append('weight', weight)
            formData.append('weighttype', weightType)
            formData.append('typed', type)
            formData.append('qty', quantity)
            formData.append('packaging', packaging)
            formData.append('description', description)
            
            picture.file.map((item, i) => {
                formData.append('picture' + i, item)
            })

            console.log('productdetals ...', categoryId, subCategoryId, brandId, productId, productSubName, weight, weightType, type, packaging, price, offerPrice, offerType, picture, quantity, description, 'concern----',concernId);
            var result = await postData('productdetail/submit_productdetails', formData)

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
        setCategoryId('')
        setBrand('')
        setSubCategory('')
        setProductSubName('')
        setWeight('')
        setWeightType('')
        setSubCategoryList([])
        setBrandList([])
        setProductList([])
        setPackaging('')
        setOfferPrice('')
        setOfferType('')
        setPrice('')
        setType('')
        setPicture([])
        setProductId('')
        setQuantity('')
        setConcernList([])
        setConcernId('')
        setDescription('')
    }


    const showImages = () => {
        return picture?.file?.map((item) => {
            return (<div style={{ margin: 2 }}><Avatar alt="Remy Sharp" src={URL.createObjectURL(item)} variant="rounded" /></div>)
        })
    }



    return (
        <div className='main-box w-[100%] bg-[#ededeb] h-[100vh] text-[red] flex items-center justify-center '>
            <div className="box w-[40%] text-[black] bg-[white] rounded-[10px] h-[auto] p-[10px] shadow-2xl">
                <div className='grid grid-cols-1 '>
                    <TitleComponent title="Add New Category" logo="logo.png" listicon="list.png" page='/admindashboard/displayallproductdetails' />
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
                                <MenuItem value="mg">mg</MenuItem>
                                <MenuItem value="ml">ml</MenuItem>
                                <MenuItem value="gm">gm</MenuItem>
                                <MenuItem value="kg">kg</MenuItem>
                                <MenuItem value="liter">liter</MenuItem>
                                <MenuItem value="mm">mm</MenuItem>



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
                                <MenuItem value="Tablet">Tablet</MenuItem>
                                <MenuItem value="Syrup">Syrup</MenuItem>
                                <MenuItem value="Capsules">Capsules</MenuItem>
                                <MenuItem value="Drop">Drop</MenuItem>
                                <MenuItem value="Lotion">Lotion</MenuItem>
                                <MenuItem value="Injuction">Injuction</MenuItem>
                                <MenuItem value="Powder">Powder</MenuItem>
                                <MenuItem value="Gel">Gel</MenuItem>
                                <MenuItem value="Spray">Spray</MenuItem>
                                <MenuItem value="Bars">Bars</MenuItem>
                                
                                <MenuItem value="Cream">Cream</MenuItem>
                                <MenuItem value="Juice">Juice</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>

                            </Select>
                        </FormControl>
                        {error.type ? <span style={{
                            color: '#d32f2f', fontFamily: "Roboto", fontWeight: '400', marginLeft: '15px', fontSize: '13px'
                        }}>{error.type}</span> : <></>}



                    </div>
                </div>
                <div className="grid p-[10px] grid-cols-1 items-center gap-[20px] ">
                    <div className='flex flex-col ' onClick={() => handleError('description', '')} >
                        <ReactQuill
                            theme='snow'
                            value={description}
                            onChange={(e) => setDescription(e)}
                            modules={modules}
                            onClick={() => handleError('description', '')} // Clear error on focus
                            error={Boolean(error.description)}
                        />
                        {error.description && (
                            <span style={{
                                color: '#d32f2f',
                                fontFamily: "Roboto",
                                fontWeight: '400',
                                marginLeft: '15px',
                                fontSize: '13px'
                            }}>{error.description}</span>
                        )}

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
                                <MenuItem value="Bottle">Bottle</MenuItem>
                                <MenuItem value="Packs">Packs</MenuItem>

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
                    <div className='flex flex-col col-span-2'>
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
                                <MenuItem value="black friday sale">black friday sale</MenuItem>
                                <MenuItem value="Month End sale">Month End sale</MenuItem>

                            </Select>

                        </FormControl>
                        {error.offerType ? <span style={{
                            color: '#d32f2f', fontFamily: "Roboto", fontWeight: '400', marginLeft: '15px', fontSize: '13px'
                        }}>{error.offerType}</span> : <></>}



                    </div>
                    <div className='flex flex-col col-span-2'>
                        <FormControl>
                            <InputLabel htmlFor="concern">Concern</InputLabel>
                            <Select
                                label='Concern'
                                // value={concernId}

                                onChange={(e) => {
                                    setConcernId(e.target.value)

                                }}

                                onFocus={() => handleError('concernid', '')}
                                error={Boolean(error.concernid)}
                            >
                                {fillAllConcern()}

                            </Select>
                        </FormControl>
                        {error.concernid ? <span style={{
                            color: '#d32f2f', fontFamily: "Roboto", fontWeight: '400', marginLeft: '15px', fontSize: '13px'
                        }}>{error.concernid}</span> : <></>}
                    </div>

                </div>
                <div className="grid p-[10px] py-[20px]  grid-cols-2 items-center">
                    <div className='flex flex-col'>
                        <Button
                            variant='contained'
                            className='w-[98%] font-semibold'
                            component="label"
                            style={{ fontWeight: 800, fontSize: '16px', padding: "10px" }}

                            onClick={() => handleError('picture', '')}
                        >
                            Upload
                            <input type="file" hidden accept='image/*' multiple id='picture' onChange={handlePicture} />
                        </Button>

                        {error.picture ? <span style={{
                            color: '#d32f2f', fontFamily: "Roboto", fontWeight: '400', marginLeft: '15px', fontSize: '13px'
                        }}>{error.picture}</span> : <></>}


                    </div>


                    <div className='flex justify-center '>
                        {showImages()}
                    </div>
                </div>
                <div className="grid px-[10px] py-[20px] grid-cols-2 gap-[10px] font-bold  ">
                    <Button variant='contained' component="label" style={{ fontWeight: 800, fontSize: '16px', padding: "10px" }}

                        onClick={handleSubmit}

                    >
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
