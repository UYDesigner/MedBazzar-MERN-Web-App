import React, { useState } from 'react'
import MaterialTable from '@material-table/core'
import { getData, serverURL } from '../../services/FetchNodeServices'
import { useEffect } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TitleComponent from '../../components/admin/TitleComponent';
import { Button, Avatar, TextField, Grid } from '@mui/material';
import { postData } from '../../services/FetchNodeServices';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { FormControl } from '@mui/material'
import { InputLabel, Select, MenuItem } from '@mui/material'

export default function DiaplayAllSubCategories() {

    var navigate = useNavigate();

    const [picture, setPicture] = useState({ file: 'fileicon.png', bytes: '' })
    const [showBtn, setShowBtn] = useState(false)
    const [error, setError] = useState({})
    const [subCategoryData, setSubCategoryData] = useState([]);
    const [open, setopen] = useState(false);

    const [subCategoryName, setSubCategoryName] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [subcategoryid, setsubcategoryid] = useState('')
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
        setShowBtn(true)
    }

    const handleError = (label, msg) => {
        setError((prev) => ({ ...prev, [label]: msg }));
    };

    const handleCategoryId = (e) => {
        setCategoryId(e.target.value);
    }




    const fetchAllSubCategory = async () => {

        var result = await getData('subcategory/display_all_subcategory')
        if (result.status) {
            setSubCategoryData(result.data);
        }
    }

    useEffect(function () {
        fetchAllSubCategory()
    }, [])

    const handleOpen = (rowData) => {
        setCategoryId(rowData.categoryid)
        setPicture({
            file: `${serverURL}/images/${rowData.subcategoryicon}`, // Use rowData.brandicon instead of rowData.picture
            bytes: '',
        })
        setSubCategoryName(rowData.subcategoryname)
        setopen(true);
        setsubcategoryid(rowData.subcategoryid);
    }
    const handleClose = (rowData) => {
        setopen(false);
    }

    const handleEditData = async () => {
        var submit = true;

        if (categoryId.length === 0) {
            handleError('categoryId', 'Please fill categoryId..')
            submit = false;
        }

        if (subCategoryName.length === 0) {
            handleError('subCategoryName', 'Please fill SubCategory Name..')
            submit = false;
        }

        if (submit) {
            var body = { 'categoryid': categoryId, 'subcategoryname': subCategoryName, 'subcategoryid': subcategoryid }
            console.log(body);
            var result = await postData('subcategory/edit_subcategory_data', body);
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

        fetchAllSubCategory();
    }


    const handleEditPicture = async () => {

        var formData = new FormData();
        formData.append('subcategoryid', subcategoryid);
        formData.append('picture', picture.bytes);

        var result = await postData('subcategory/edit_subcategory_picture', formData)

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

        fetchAllSubCategory()
        setShowBtn(false);

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
                var body = { 'subcategoryid': rowData.subcategoryid }
                var result = await postData('subcategory/delete_subcategory_data', body)
                Swal.fire({
                    title: 'Deleted Successfully',
                    timer: 1000,
                    icon: "success",
                    toast: true
                });

                fetchAllSubCategory();
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




    const showSubCategoryForm = () => {
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
                        <TitleComponent title="Add New Category" logo="logo.png" listicon="list.png" page='/displayallcategory' />
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
                    <div className='grid grid-cols-1 p-[10px]'>
                        <TextField label="Brand Name" onChange={(event) => { setSubCategoryName(event.target.value) }} id='brandname' value={subCategoryName} />
                    </div>
                    <div className='grid grid-cols-2 items-center  py-[20px]'>
                        <div className="upload p-[10px]">
                            {showBtn ? (
                                <div className='grid grid-cols-2   w-[100%] gap-[30px]'>
                                    <Button variant='contained' className='font-semibold ' style={{ fontWeight: 800, fontSize: '16px', padding: "10px" }} onClick={handleEditPicture}  >Save</Button>


                                    <Button variant='contained' className='font-semibold ' style={{ fontWeight: 800, fontSize: '16px', padding: "10px" }}  >Cancel</Button>
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
                    <Button onClick={handleEditData}>Edit</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        )
    }






    function showSubCategory() {
        return (
            <MaterialTable
                title="Simple Action Preview"
                columns={[
                    { title: 'SubCategory Id', field: 'subcategoryid', type: 'numeric' },
                    { title: 'Category', field: 'categoryname', type: 'numeric' },
                    { title: 'SubCategory Name', field: 'subcategoryname' },
                    {
                        title: 'Icon',
                        field: 'subcategoryicon',
                        render: (rowData) => <>
                            <img
                                src={`${serverURL}/images/${rowData.subcategoryicon}`}
                                style={{ width: '80px', height: '80px', borderRadius: '50%' }}
                            />
                        </>
                    },
                ]}
                data={subCategoryData}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit SubCategory',
                        onClick: (event, rowData) => handleOpen(rowData),
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete SubCategory',
                        onClick: (event, rowData) => handleDelete(rowData)
                    },
                    {
                        icon: 'add',
                        tooltip: 'Add New SubCategory',
                        isFreeAction: true,
                        onClick: (event) => navigate('/admindashboard/subcategory')
                    }

                ]}
            />
        )
    }


    return (
        <div className='main-box w-[100%] bg-[#ededeb] h-[100vh] text-[red] flex items-center justify-center '>
        <div className="box w-[60%] text-[black] bg-[white] rounded-[10px] h-[auto] p-[10px] shadow-2xl">
                <div>{showSubCategory()}</div>
                {showSubCategoryForm()}
            </div>
        </div>
    )
}
