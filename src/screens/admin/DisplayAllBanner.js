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
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'


import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import { useMemo } from 'react'


export default function DisplayAllBanner(props) {

  var navigate = useNavigate();
  const [bannerData, setBannerData] = useState([]);
  const [bannerType, setBannerType] = useState('');
  const [picture, setPicture] = useState({ file: [], bytes: '' })
  const [brandList, setBrandList] = useState([])
  const [brandId, setBrand] = useState('')
  const [error, setError] = useState({})
  const [open, setOpen] = useState(false);
  const [bannerId, setBannerId] =useState('');


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






  const fetchAllBanners = async () => {

    var result = await getData('banner/display_all_banners')
    if (result.status) {
      console.log(result.data, result.status)
      setBannerData(result.data);
    }
  }

  useEffect(function () {
    fetchAllBanners()
  }, [])

  const handleOpen = (rowData) => {
    setOpen(true);
    fetchAllbrand(rowData.bannertype)
    setBannerType(rowData.bannertype);
    setBrand(rowData.brandid);
    setBannerId(rowData.bannerid);

  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleEditData = async (rowData) => {
    var submit = true;


    // alert(result.message);

    if (bannerType.length === 0) {
      handleError('bannertype', 'Please fill banner type...');
      submit = false;
    }
    if (brandId.length === 0) {
      handleError('brandid', 'Please fill brand...');
      submit = false;
    }

    if (submit) {

      var body = { 'bannertype': bannerType, 'brandid': brandId, 'bannerid': bannerId};
      console.log('body', body);
      var result = await postData('banner/edit_banner_data', body)

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

    fetchAllBanners();
  }

  const handleDelete = async (rowData) => {
    Swal.fire({
      title: "Do you want to delete banner?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't Delete`
    }).then(async (result) => {
      if (result.isConfirmed) {
        var body = { 'bannerid': rowData.bannerid }
        var result = await postData('banner/delete_banner_data', body)
        Swal.fire({
          title: 'Deleted Successfully',
          timer: 1000,
          icon: "success",
          toast: true
        });

        fetchAllBanners();
      } else if (result.isDenied) {
        Swal.fire({
          title: 'Your Data Is Safe',
          timer: 1000,
          icon: "safe",
          toast: true
        });
      }
    });
  }
  function showBanners() {
    return (

      <MaterialTable
        title="Simple Action Preview"
        columns={[
          { title: 'Banner Id', field: 'bannerid' },
          { title: 'Brand type', field: 'bannertype' },
          { title: 'Brand', field: 'brandname' },

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
        data={bannerData}

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
            onClick: (event) => navigate('/admindashboard/banners')
          }

        ]}
      />
    )
  }


  const showBannerForm = () => {
    return (
      <Dialog
        open={open}
        // onClose={handleClose}
        maxWidth="md"
        fullWidth
        // fullScreen={fullScreen}
        style={{ width: '50%', margin: 'auto', zIndex: 100 }}
      >

        <DialogContent>
          <div className="box w-[100%] text-[black] bg-[white] rounded-[10px] h-[auto] p-[10px] ">
            <div className='grid grid-cols-1 '>
              <TitleComponent title="Add New Banner" logo="logo.png" listicon="list.png" page='/admindashboard/displayallbanners' />
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
                    <MenuItem value={'0'}>{'none'}</MenuItem>
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
        <div>{showBanners()}</div>
        {showBannerForm()}
      </div>
    </div>
  )
}
