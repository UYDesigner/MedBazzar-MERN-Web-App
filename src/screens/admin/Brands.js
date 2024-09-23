import React, { useState } from 'react'
import TitleComponent from '../../components/admin/TitleComponent'
import { TextField, Button, Avatar, Grid } from '@mui/material'
import { postData } from '../../services/FetchNodeServices';
import Swal from 'sweetalert2';


export default function Brands
    () {

    const [picture, setPic] = useState({ file: 'fileicon.png', bytes: '' });
    const [brandname, setbrandname] = useState('');
    const [error, setError] = useState({

    })

    const handlePicture = (e) => {

        setPic({
            file: URL.createObjectURL(e.target.files[0]),
            bytes: e.target.files[0]
        })

    }

    const handleError = (label, msg) => {
        setError((prev) => ({ ...prev, [label]: msg }));
    };


    console.log(brandname);
    const handleSubmit = async (event) => {
        event.preventDefault();
        var submit = true;

        if (brandname.length === 0) {
            handleError('brandname', 'Please fill Brand name...');
            submit = false;
        }

        if (picture.bytes.length === 0) {  // Change this line
            handleError('picture', 'Please choose a picture...');  // Change this line
            submit = false;
        }

        if (submit) {

            var formData = new FormData();
            formData.append('brandname', brandname);
            formData.append('picture', picture.bytes);

            var result = await postData('brand/submit_brand', formData);

            console.log(result);
            if (result.status) {
                Swal.fire({
                    title: 'Brand submitted successfully',
                    icon: 'success',
                    
                });
            } else {
                Swal.fire({
                    title: 'Failed to submit brand',
                    icon: 'error',
                    
                });
            }
        }
    };


 const handelReset = ()=>{
    setbrandname('')
    setPic({ file: 'fileicon.png', bytes: '' })
 }




    return (
        <div className='main-box w-[100%] bg-[#ededeb] h-[100vh] text-[red] flex items-center justify-center '>
      <div className="box w-[40%] text-[black] bg-[white] rounded-[10px] h-[auto] p-[10px] shadow-2xl">
                <div className='grid grid-cols-1 '>
                <TitleComponent title="Add New Category" logo="logo.png" listicon="list.png" page='/admindashboard/displayallbrands' />
                </div>
                <div className='grid grid-cols-1 p-[10px]'>
                    <TextField label="Brand Name" onChange={(event) => { setbrandname(event.target.value) }} error={error.brandname} helperText={error.brandname} onFocus={() => handleError('brandname', '')} id='brandname' value={brandname} />
                </div>
                <div className='grid grid-cols-2 items-center  py-[20px]'>
                    <div className="upload p-[10px]">
                        <Button variant='contained' fullWidth className=' font-semibold ' component="label" style={{ fontWeight: 800, fontSize: '16px', padding: "10px" }} onClick={() => handleError('picture', '')} >
                            Upload
                            <input type="file" hidden accept='image/*' multiple id='picture' onChange={handlePicture}  />
                        </Button>
                        {error.picture ? <span style={{
                            color: '#d32f2f', fontFamily: "Roboto", fontWeight: '400', marginLeft: '15px', fontSize: '13px'
                        }}>{error.picture}</span> : <></>}
                    </div>
                    <div className="avatar flex justify-center">
                        <Avatar
                            src={picture.file}
                            alt="Brand Logo" // Replace with a meaningful description
                            
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2  p-[10px] gap-[20px]">

                    <Button variant='contained' fullWidth className=' font-semibold ' component="label" style={{ fontWeight: 800, fontSize: '16px', padding: "10px" }} onClick={handleSubmit} >Submit</Button>

                    <Button variant='contained' fullWidth className=' font-semibold ' component="label" style={{ fontWeight: 800, fontSize: '16px', padding: "10px" }} onClick={handelReset} >Reset</Button>

                </div>
            </div>
        </div>
    )
}
