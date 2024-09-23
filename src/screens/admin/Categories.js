import React from 'react';
import TitleComponent from '../../components/admin/TitleComponent';
import { TextField, Button, Avatar } from '@mui/material';
import { useState } from 'react';
import { postData } from '../../services/FetchNodeServices';
import Swal from 'sweetalert2';
import fileicon from '../../../src/assets/fileicon.png'
export default function Categories(props) {

  const [category, setCategory] = useState('')
  const [picture, setPic] = useState({ file: { fileicon }, bytes: '' });

  const [error, setError] = useState({

  })

  const handlePicture = (e) => {
    setPic({
      file: URL.createObjectURL(e.target.files[0]),
      bytes: e.target.files[0]
    });
  };

  const handleError = (label, msg) => {

    setError((pre) => ({ ...pre, [label]: msg }))


  }

  const handleReset = () => {

    setCategory('')
    setPic({
      file: 'icon-med.png', bytes: ''
    })
  }

  const handleSubmit = async () => {

    var submit = true;

    if (category.length === 0) {
      handleError('category', 'Please fill category name...');
      submit = false;
    }

    if (picture.bytes.length === 0) {
      handleError('picture', 'Please choose picture...');
      submit = false;
    }

    if (submit) {

      var formData = new FormData()
      formData.append('categoryname', category)
      formData.append('picture', picture.bytes)

      var result = await postData('category/submit_category', formData)

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



  return (
    <div className='main-box w-[100%] bg-[#ededeb] h-[100vh] text-[red] flex items-center justify-center '>
      <div className="box w-[40%] text-[black] bg-[white] rounded-[10px] h-[auto] p-[10px] shadow-2xl">
        <div className='grid grid-cols-1 '>
          <TitleComponent title="Add New Category" logo="logo.png" listicon="list.png" page='/admindashboard/displayallcategory' />

        </div>
        <div className="grid p-[10px] grid-cols-1 ">
          <TextField value={category} label="Category Name" onChange={(event) => setCategory(event.target.value)} error={error.category} helperText={error.category} onFocus={() => handleError('category', '')} id='categoryname' />
        </div>

        <div className="grid p-[10px] py-[20px]  grid-cols-2 items-center">
          <div className='flex flex-col'>
            <Button variant='contained' className='w-[70%] font-semibold ' component="label" style={{ fontWeight: 800, fontSize: '16px', padding: "10px" }} >
              Upload
              <input type="file" hidden accept='image/*' multiple onChange={handlePicture} onClick={() => handleError('picture', '')} id='picture' />
            </Button>
            {error.picture ? <span style={{
              color: '#d32f2f', fontFamily: "Roboto", fontWeight: '400', marginLeft: '15px', fontSize: '13px'
            }}>{error.picture}</span> : <></>}

          </div>


          <div className='flex justify-center '>
            <Avatar src={picture.file} />
          </div>
        </div>
        <div className="grid px-[10px] py-[20px] grid-cols-2 gap-[10px] font-bold  ">
          <Button variant='contained' component="label" onClick={handleSubmit} style={{ fontWeight: 800, fontSize: '16px', padding: "10px" }}>
            Submit
          </Button>
          <Button onClick={handleReset} variant='contained' component="label" style={{ fontWeight: 800, fontSize: '16px', padding: "10px" }}>
            Reset
          </Button>
        </div>
      </div>
    </div >
  );
}
