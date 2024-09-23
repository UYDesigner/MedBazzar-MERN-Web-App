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
import { useNavigate } from 'react-router-dom';
// import Tooltip from '@mui/material';


export default function DisplayAllConcern(props) {

    var navigate = useNavigate();
    const [picture, setPic] = useState({ file: 'icon-med.png', bytes: '' });
    const [tempPicture, setTempPic] = useState('');
    const [error, setError] = useState({})
    const [concernData, setConcernData] = useState([]);
    const [open, setOpen] = useState(false)

    const [concern, setConcern] = useState('')
    const [concernId, setConcernId] = useState('')
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

    const handleError = (label, msg) => {

        setError((pre) => ({ ...pre, [label]: msg }))


    }


    const fetchAllConcern = async () => {
        try {
            const result = await getData('concern/display_all_concern');
            if (result.status) {
                setConcernData(result.data);
            }
        } catch (error) {
            console.error('Error fetching category data:', error);
        }
    };

    useEffect(() => {
        fetchAllConcern();
    }, []);


    const handleOpen = (rowData) => {
        setOpen(true);
        setConcernId(rowData.concernid);
        setConcern(rowData.concernname);
        setPic({ file: `${serverURL}/images/${rowData.concernicon}`, bytes: '' });
        setTempPic(`${serverURL}/images/${rowData.concernicon}`)
    }

    const handleClose = () => {
        setOpen(false);
    }


    const handleEditData = async () => {
        var submit = true;


        // alert(result.message);

        if (concern.length === 0) {
            handleError('concernid', 'Please fill category name...');
            submit = false;
        }

        if (submit) {

            var body = { 'concernname': concern, 'concernid': concernId }
            var result = await postData('concern/edit_concern_data', body)

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

        fetchAllConcern();
    }


    const handleEditPic = async () => {


       
        var formData = new FormData();
        formData.append('concernid', concernId);
        formData.append('picture', picture.bytes);
        var result = await postData('concern/edit_concern_picture', formData);

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





        fetchAllConcern();

        setshowBtn(false);
    }



    const handleDelete = async (rowData) => {
        Swal.fire({
            title: "Do you want to delete concern",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Delete",
            denyButtonText: `Don't Delete`
        }).then(async (result) => {
            if (result.isConfirmed) {
                var body = { 'concernid': rowData.concernid }
                var result = await postData('concern/delete_concern_data', body)
                Swal.fire({
                    title: 'Deleted Successfully',
                    timer: 1000,
                    icon: "success",
                    toast: true
                });

                fetchAllConcern();
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

    function showConcern() {
        return (
            <MaterialTable
                title="MedBazzar Categories"
                columns={[
                    { title: 'Concern Id', field: 'concernid' },
                    { title: 'Concern Name', field: 'concernname' },
                    {
                        title: 'Icon',
                        field: 'picture',
                        render: (rowData) => (
                            <>
                                <img
                                    src={`${serverURL}/images/${rowData.concernicon}`}
                                    style={{ width: '30%', height: '30%', borderRadius: '50%' }}
                                />
                            </>
                        ),
                    },
                ]}

                data={concernData} // Use the fetched data for the table
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
                        onClick: (event) => navigate('/admindashboard/concerns')
                    }
                ]}

            />
        );
    }

    const showConcernForm = () => {
        return (
            <Dialog
                open={open}

                maxWidth="md"
                fullWidth
                // fullScreen={fullScreen}
                style={{ width: '50%', margin: 'auto', zIndex: 100 }}
            >

                <DialogContent>
                    <div className="box w-[100%] text-[black] bg-[white] rounded-[10px] h-[auto] p-[10px] ">
                        <div className='grid grid-cols-1 '>
                            <TitleComponent title={props.title} logo={props.logo} listicon="list.png" />
                        </div>
                        <div className="grid p-[10px] grid-cols-1 ">
                            <TextField value={concern} label="Concern Name" onChange={(event) => setConcern(event.target.value)} error={error.concernid} helperText={error.concernid} onFocus={() => handleError('concernid', '')} id='concernid' />
                        </div>

                        <div className="grid p-[10px] py-[20px]  grid-cols-2 items-center">
                            <div className='flex flex-col'>
                            {showBtn ? (
                                    <div className='grid grid-cols-2   w-[100%] gap-[30px]'>
                                        <Button variant='contained' className='font-semibold ' style={{ fontWeight: 800, fontSize: '16px', padding: "10px" }} 
                                        onClick={handleEditPic} 
                                        >Save</Button>


                                        <Button variant='contained' className='font-semibold ' style={{ fontWeight: 800, fontSize: '16px', padding: "10px" }} 
                                        onClick={handleCancel}
                                        >Cancel</Button>
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


                            <div className='flex justify-center '>
                                <Avatar src={picture.file} />
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                     onClick={handleEditData}
                    >Edit</Button>
                    <Button
                        onClick={handleClose}
                    >Close</Button>

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
                <div>{showConcern()}</div>
                {showConcernForm()}
            </div>
        </div>
    )
}
