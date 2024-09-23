import React from 'react'
import MaterialTable from '@material-table/core';
import { useState, useEffect } from 'react';
import { getData, postData, serverURL } from '../../services/FetchNodeServices';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { DialogTitle } from '@mui/material';
import { Button, TextField, grid, Avatar } from '@mui/material';
import TitleComponent from '../../components/admin/TitleComponent';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function DisplayAllBrands(props) {

    var navigate = useNavigate();

    const [brandNameData, setBrandnameData] = useState([]);
    const [open, setOpen] = useState(false);
    const [brandname, setbrandname] = useState('');
    const [error, setError] = useState({

    })
    const [brandid, setbrandid] = useState('')
    const [picture, setPic] = useState({ file: 'fileicon.png', bytes: '' });
    const [showBtn, setShowBtn] = useState(false)
    const [temPicture, setTemPicture] = useState('')

    const handlePicture = (e) => {

        setPic({
            file: URL.createObjectURL(e.target.files[0]),
            bytes: e.target.files[0]
        })
        setShowBtn(true)
    }

    const handleError = (label, msg) => {
        setError((prev) => ({ ...prev, [label]: msg }));
    };

    const fetchAllBrand = async () => {

        var result = await getData('brand/display_all_brands')
        if (result.status) {
            setBrandnameData(result.data);
        }
    }

    useEffect(function () {
        fetchAllBrand()
    }, [])

    const handleOpen = (rowData) => {
        setOpen(true);
        setbrandname(rowData.brandname);
        setPic({
            file: `${serverURL}/images/${rowData.brandicon}`, // Use rowData.brandicon instead of rowData.picture
            bytes: '',
        });
        setbrandid(rowData.brandid);
        setTemPicture(`${serverURL}/images/${rowData.brandicon}`)
    };
    const handleCancel = () => {
        setShowBtn(false);
        setPic({ file: temPicture, bytes: '' });
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleEditPicture = async () => {

        console.log('brandId:', brandid);
        console.log('Picture:', picture.bytes);
        var formData = new FormData();
        formData.append('brandid', brandid);
        formData.append('picture', picture.bytes);

        var result = await postData('brand/edit_brand_picture', formData)

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

        fetchAllBrand()
        setShowBtn(false);
    }

    const handleBrandEdit = async () => {
        var submit = true;

        if (brandname.length == 0) {
            handleError('brandname', 'Please fill brand name..')
            submit = false;
        }
        if (submit) {
            var body = { 'brandid': brandid, 'brandname': brandname }
            console.log(body);
            var result = await postData('brand/edit_brand_data', body);
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

        fetchAllBrand();

    }

    const handleDelete = async (rowData) => {
        Swal.fire({
            title: "Do you want to delete Brand?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Delete",
            denyButtonText: `Don't Delete`
        }).then(async (result) => {
            if (result.isConfirmed) {
                var body = { 'brandid': rowData.brandid }
                var result = await postData('brand/delete_brand_data', body)
                Swal.fire({
                    title: 'Deleted Successfully',
                    timer: 1000,
                    icon: "success",
                    toast: true
                });

                fetchAllBrand();
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



    const showBrandForm = () => {
        return (
            <Dialog
                open={open}
                onclose={handleClose}
                maxWidth="md"
                fullWidth
                // fullScreen={fullScreen}
                style={{ width: '50%', margin: 'auto', zIndex: 100 }}
            >
                <DialogContent>
                    <div className='grid grid-cols-1 '>
                        <TitleComponent title={props.title} logo={props.logo} listicon="list.png" />
                    </div>
                    <div className='grid grid-cols-1 p-[10px]'>
                        <TextField label="Brand Name" value={brandname} onChange={(event) => { setbrandname(event.target.value) }} error={error.brandname} helperText={error.brandname} onFocus={() => handleError('brandname', '')} id='brandname' />
                    </div>
                    <div className='grid grid-cols-2 items-center  py-[20px]'>
                        <div className="upload p-[10px]">
                            {showBtn ? (
                                <div className='grid grid-cols-2   w-[100%] gap-[30px]'>
                                    <Button variant='contained' className='font-semibold ' style={{ fontWeight: 800, fontSize: '16px', padding: "10px" }} onClick={handleEditPicture} >Save</Button>


                                    <Button variant='contained' className='font-semibold ' style={{ fontWeight: 800, fontSize: '16px', padding: "10px" }} onClick={handleCancel} >Cancel</Button>
                                </div>
                            ) :
                                (<Button variant='contained' fullWidth className=' font-semibold ' component="label" style={{ fontWeight: 800, fontSize: '16px', padding: "10px" }} >
                                    Set Brand Icon
                                    <input type="file" hidden accept='image/*' multiple id='picture' onChange={handlePicture} />
                                </Button>)}

                        </div>
                        <div className="avatar flex justify-center">
                            <Avatar
                                src={picture.file}
                                alt="Brand Logo" // Replace with a meaningful description
                                style={{ width: 150, height: 150 }}

                            />
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleBrandEdit}>Edit</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        )
    }

    function showBrands() {
        return (
            <MaterialTable
                title="Simple Action Preview"
                columns={[
                    { title: 'Brand Id', field: 'brandid' },
                    { title: 'Brand Name', field: 'brandname' },

                    {
                        title: 'Icon',
                        field: 'brandicon',
                        render: (rowData) => <>
                            <img
                                src={`${serverURL}/images/${rowData.brandicon}`}
                                style={{ width: '80px', height: '80px', borderRadius: '50%' }}
                            />
                        </>

                    },
                ]}
                data={brandNameData}

                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Save User',
                        onClick: (event, rowData) => handleOpen(rowData),
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Save User',
                        onClick: (event, rowData) => handleDelete(rowData)
                    },
                    {
                        icon: 'add',
                        tooltip: 'Add New Brand',
                        isFreeAction: true,
                        onClick: (event) => navigate('/admindashboard/brand')
                    }

                ]}
            />
        )
    }











    return (
        <div className='main-box w-[100%] bg-[#ededeb] h-[100vh] text-[red] flex items-center justify-center '>
      <div className="box w-[60%] text-[black] bg-[white] rounded-[10px] h-[auto] p-[10px] shadow-2xl">
                <div>{showBrands()}</div>
                {showBrandForm()}
            </div>
        </div>
    );

}
