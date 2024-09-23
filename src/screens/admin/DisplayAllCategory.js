import React, { useEffect, useState } from 'react';
import MaterialTable from '@material-table/core';
// import TitleComponent from '../../components/admin/TitleComponent';
import { getData, postData, serverURL } from '../../services/FetchNodeServices';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
import { Button, TextField, grid, Avatar } from '@mui/material';
import TitleComponent from '../../components/admin/TitleComponent';
import { useMediaQuery } from '@mui/material';
import Swal from 'sweetalert2';
// import Tooltip from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function DisplayAllCategory(props) {
  
    var navigate = useNavigate();


    const [categoryData, setCategoryData] = useState([]);
    const [open, setOpen] = useState(false)

    const [category, setCategory] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [picture, setPic] = useState({ file: 'icon-med.png', bytes: '' });
    const [tempPicture, setTempPic] = useState('');
    const [error, setError] = useState({

    })

    const [showBtn, setshowBtn] = useState(false);



    const handlePicture = (e) => {
        setPic({
            file: URL.createObjectURL(e.target.files[0]),
            bytes: e.target.files[0]
        });

        setshowBtn(true);
    };

    const handleCancel = () => {
        setPic({ file: tempPicture });
        setshowBtn(false);
    }

    const handleEditData = async () => {
        var submit = true;


        // alert(result.message);

        if (category.length === 0) {
            handleError('category', 'Please fill category name...');
            submit = false;
        }

        if (submit) {

            var body = { 'categoryname': category, 'categoryid': categoryId }
            var result = await postData('category/edit_category_data', body)

            // alert(result.status);
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

        fetchAllCategory();
    }

    const handleEditPic = async () => {


        console.log('CategoryId:', categoryId);
        console.log('Picture:', picture);
        var formData = new FormData();
        formData.append('categoryid', categoryId);
        formData.append('picture', picture.bytes);
        var result = await postData('category/edit_category_picture', formData);

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





        fetchAllCategory();

        setshowBtn(false);
    }


    const handleError = (label, msg) => {

        setError((pre) => ({ ...pre, [label]: msg }))


    }

    const fullScreen = useMediaQuery('(max-width:600px)');


    const fetchAllCategory = async () => {
        try {
            const result = await getData('category/display_all_category');
            if (result.status) {
                setCategoryData(result.data);
            }
        } catch (error) {
            console.error('Error fetching category data:', error);
        }
    };

    useEffect(() => {
        fetchAllCategory();
    }, []);


    const handleClose = () => {
        setOpen(false)
        setshowBtn(false)
    }

    const handleOpen = (rowData) => {
        console.log('Opening editor for category:', rowData);
        setOpen(true);
        setCategoryId(rowData.categoryid);
        setCategory(rowData.categoryname);
        setPic({ file: `${serverURL}/images/${rowData.picture}`, bytes: '' });
        setTempPic(`${serverURL}/images/${rowData.picture}`)
    };

    const handleDelete = async (rowData) => {
        Swal.fire({
            title: "Do you want to delete category?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Delete",
            denyButtonText: `Don't Delete`
        }).then(async (result) => {
            if (result.isConfirmed) {
                var body = { 'categoryid': rowData.categoryid }
                var result = await postData('category/delete_category_data', body)
                Swal.fire({
                    title: 'Deleted Successfully',
                    timer: 1000,
                    icon: "success",
                    toast: true
                });

                fetchAllCategory();
            } else if (result.isDenied) {
                Swal.fire({
                    title: 'Your Data Is Safe',
                    timer: 1000,
                    icon: "safe",
                    toast: true
                });
            }
        });
    };



    function showCategory() {
        return (
            <MaterialTable
                title="MedBazzar Categories"
                columns={[
                    { title: 'Category Id', field: 'categoryid' },
                    { title: 'Category Type', field: 'categoryname' },
                    {
                        title: 'Icon',
                        field: 'picture',
                        render: (rowData) => (
                            <>
                                <img
                                    src={`${serverURL}/images/${rowData.picture}`}
                                    style={{ width: '30%', height: '30%', borderRadius: '50%' }}
                                />
                            </>
                        ),
                    },
                ]}

                data={categoryData} // Use the fetched data for the table
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit Brand',
                        onClick: (event, rowData) => handleOpen(rowData),
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete',
                        onClick: (event, rowData) => handleDelete(rowData),
                    },
                    {
                        icon: 'add',
                        tooltip: 'Add New Brand',
                        isFreeAction: true,
                        onClick: (event) => navigate('/admindashboard/category')
                    }
                ]}

            />
        );
    }


    const showCategoryForm = () => {
        return (
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="md"
                fullWidth
                fullScreen={fullScreen}
                style={{ width: '50%', margin: 'auto', zIndex: 100 }}
            >

                <DialogContent>
                    <div className="box w-[100%] text-[black] bg-[white] rounded-[10px] h-[auto] p-[10px] ">
                        <div className='grid grid-cols-1 '>
                            <TitleComponent title={props.title} logo={props.logo} listicon="list.png" />
                        </div>
                        <div className="grid p-[10px] grid-cols-1 ">
                            <TextField value={category} label="Category Name" onChange={(event) => setCategory(event.target.value)} error={error.category} helperText={error.category} onFocus={() => handleError('category', '')} id='categoryname' />
                        </div>

                        <div className="grid p-[10px] py-[20px]  grid-cols-2  items-center">
                            <div className='flex flex-row'>
                                {showBtn ? (
                                    <div className='grid grid-cols-2   w-[100%] gap-[30px]'>
                                        <Button variant='contained' className='font-semibold ' style={{ fontWeight: 800, fontSize: '16px', padding: "10px" }} onClick={handleEditPic} >Save</Button>


                                        <Button variant='contained' className='font-semibold ' style={{ fontWeight: 800, fontSize: '16px', padding: "10px" }} onClick={handleCancel}>Cancel</Button>
                                    </div>
                                ) : (
                                    <Button
                                        variant='contained'
                                        className=' font-semibold '
                                        component="label" fullWidth
                                        style={{ fontWeight: 800, fontSize: '16px', padding: "10px" }}
                                    >
                                        Set New Picture
                                        <input
                                            type="file"
                                            hidden
                                            accept='image/*'
                                            multiple
                                            onChange={handlePicture}
                                            onClick={() => handleError('picture', '')}
                                            id='picture'
                                        />
                                    </Button>
                                )}

                                {error.picture ? <span style={{
                                    color: '#d32f2f', fontFamily: "Roboto", fontWeight: '400', marginLeft: '15px', fontSize: '13px'
                                }}>{error.picture}</span> : <></>}

                            </div>


                            <div className='flex justify-center'>
                                <Avatar src={picture.file} style={{ width: 150, height: 150 }} />
                            </div>

                        </div>

                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditData}>Edit</Button>
                    <Button onClick={handleClose}>Close</Button>

                </DialogActions>
            </Dialog>
        )
    }


    return (
        <div className='main-box w-[100%] bg-[#ededeb] h-[100vh] text-[red] flex items-center justify-center '>
        <div className="box w-[60%] text-[black] bg-[white] rounded-[10px] h-[auto] p-[10px] shadow-2xl">
                {/* <div className='grid grid-cols-1 '>
          <TitleComponent title={props.title} logo={props.logo} listicon="list.png" />
        </div> */}
                <div>{showCategory()}</div>
                {showCategoryForm()}
            </div>
        </div>
    );
}
