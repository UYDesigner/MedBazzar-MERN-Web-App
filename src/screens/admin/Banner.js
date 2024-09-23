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
export default function Banner() {

    const [bannerType, setBannerType] = useState('');
    const [picture, setPicture] = useState({ file: [], bytes: '' })
    const [brandList, setBrandList] = useState([])
    const [brandId, setBrand] = useState('')
    const [error, setError] = useState({})


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

    const showImages = () => {
        return picture?.file?.map((item) => {
            return (<div style={{ margin: 2 }}><Avatar alt="Remy Sharp" src={URL.createObjectURL(item)} variant="rounded" /></div>)
        })
    }



    const handleError = (label, msg) => {
        setError((prev) => ({ ...prev, [label]: msg }));
    };




    const fetchAllbrand = async (bid) => {
        alert(bid);
        if (bid == 'Brand') {
            var result = await getData('brand/display_all_brands');
            if (result.status) {
                alert(result.data);
                setBrandList(result.data);
            }
        }
      

    };

    const fillAllBrand = () => {

        return brandList.map((item) => {
            return <MenuItem key={item.brandid} value={item.brandid}>{item.brandname}</MenuItem>;
        });


    };


    const handleBannerType = (e) => {
        setBannerType(e.target.value);

        fetchAllbrand(e.target.value)



    }




    const handleSubmit = async () => {


        var submit = true;

        if (bannerType.length === 0) {
            handleError('bannertype', 'please fill it');
            submit = false;
        }
        if (brandId.length === 0) {
            handleError('brandid', 'please fill it');
            submit = false;
        }
        if (picture.file.length === 0) {
            handleError('picture', 'please choose pictures');
            submit = false;
        }




        if (submit) {
            var formData = new FormData()
            formData.append('bannertype', bannerType);
            formData.append('brandid', brandId)
            picture.file.map((item, i) => {
                formData.append('picture' + i, item)
            })

            console.log(bannerType, brandId)

            var result = await postData('banner/submit_banners', formData)

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
        setBannerType('');
        setBrandList([])
        setBrand('')
        setPicture([''])
    }



    return (
        <div className='main-box w-[100%] bg-[#ededeb] h-[100vh] text-[red] flex items-center justify-center '>
            <div className="box w-[40%] text-[black] bg-[white] rounded-[10px] h-[auto] p-[10px] shadow-2xl">
                <div className='grid grid-cols-1 '>
                    <TitleComponent title="Add New Category" logo="logo.png" listicon="list.png" page='/admindashboard/displayallbanners' />
                </div>
                <div className="grid p-[10px] py-[20px]  grid-cols-2 items-center gap-[20px]">
                    <div className='flex flex-col'>
                        <FormControl>
                            <InputLabel htmlFor="category">Banner Type</InputLabel>
                            <Select
                                label='Banner Type'
                                value={bannerType}

                                onChange={(e) => {
                                    handleBannerType(e)
                                }}

                                onFocus={() => handleError('bannertype', '')}
                                error={Boolean(error.bannertype)}
                            >
                                <MenuItem value="General">General</MenuItem>
                                <MenuItem value="Treanding">Treanding</MenuItem>
                                <MenuItem value="Popular">Popular</MenuItem>
                                <MenuItem value="Latest">Latest</MenuItem>
                                <MenuItem value="Brand">Brand</MenuItem>

                            </Select>
                        </FormControl>
                        {error.bannertype ? <span style={{
                            color: '#d32f2f', fontFamily: "Roboto", fontWeight: '400', marginLeft: '15px', fontSize: '13px'
                        }}>{error.bannertype}</span> : <></>}



                    </div>
                    <div className='flex flex-col'>
                        <FormControl>
                            <InputLabel htmlFor="Brand Name<">Brand Name</InputLabel>
                            <Select
                                label='Brand Name<'
                                value={brandId}

                                onChange={(e) => {
                                    setBrand(e.target.value);
                                }}

                                onFocus={() => handleError('brandid', '')}
                                error={Boolean(error.brandid)}
                            >
                                <MenuItem  value={'0'}>{'none'}</MenuItem>
                                {fillAllBrand()}

                            </Select>
                        </FormControl>
                        {error.brandid ? <span style={{
                            color: '#d32f2f', fontFamily: "Roboto", fontWeight: '400', marginLeft: '15px', fontSize: '13px'
                        }}>{error.brandid}</span> : <></>}



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
                            <input type="file" hidden accept='image/*' multiple id='picture'
                                onChange={handlePicture}
                            />
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
