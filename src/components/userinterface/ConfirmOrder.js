import React, { useEffect } from 'react'
import logo from "../../../src/assets/logo.png"
import { serverURL } from '../../services/FetchNodeServices'
import { Paper } from '@mui/material'
import OtpInput from "react-otp-input";
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Grid, Input, TextField } from "@mui/material";
import Swal from 'sweetalert2';

export default function ConfirmOrder(props) {
  const [otp, setOtp] = useState("");


  var navigate = useNavigate();
  var location = useLocation();
  var user = JSON.parse(location.state.username);

  var address = JSON.parse(location.state.address);
  var mobileno = address.mobileno;
  const myOtp = location?.state?.myOtp;


  // alert(JSON.stringify(username));
  // alert(myOtp);
  console.log(location.state);
  console.log((user.username))
  console.log(address);
  console.log(mobileno);
  console.log("oooo",myOtp);




  console.log(location?.state);

  const handleVerifyOtp = async () => {


    if (parseInt(myOtp) === parseInt(otp)) {

      Swal.fire({
        position: "Center",
        title: "Your Oder Confirm Successfully",
        icon: 'success',
        showConfirmButton: false,
        timer: 2500,
        toast: true
      });

      navigate('/cart')
    }
    else {
      alert('Invalid OTP...')
    }
  }


  return (
    <div style={{ width: '100vw', height: '100vh', display: 'grid', placeContent: 'center', background: 'white' }}>
      <Paper style={{ maxWidth: '500px', padding: '20px' }}>
        <div className="topPart" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div className="header" style={{ textAlign: 'center', fontFamily: 'cursive', padding: '22px', fontSize: '20px', fontWeight: 'bolder' }}>
            Confirm Your Order
          </div>
          <div style={{ textAlign: 'center', fontFamily: 'cursive', paddingLeft: '20px', paddingRight: '20px', paddingBottom: '10px', fontSize: '13px' }}>
            <div style={{ marginRight: 'auto' }}>
              Dear {user.username},

            </div>
            <span>



              To ensure that your order is processed accurately and promptly, we kindly request your confirmation.

            </span>
            <div>
              Your address , {address.address}, {address.landmark}, {address.pincode}
              <div>
                {address.city}, {address.state}.
              </div>

            </div>


          </div>
          91+{`${mobileno}`}
          <div style={{ textAlign: 'center', fontFamily: 'cursive', paddingLeft: '20px', paddingRight: '20px', paddingBottom: '10px', fontSize: '13px' }} >An SMS with 4-digit OTP was sent to
          </div>
          <div style={{ fontWeight: "", fontSize: 13 }}>
            Please Enter 4-Digits OTP
          </div>
          <div>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              renderSeparator={<span>-</span>}
              renderInput={(props) => <input {...props} />}
              inputStyle={{ width: 35, height: 40 }}
            />
          </div>
          <div className="btn">
            <Button variant="contained" onClick={handleVerifyOtp} style={{ width: '180px', background: '#024a4a', color: 'white', fontWeight: 'bold' }}>
              Verify
            </Button>
          </div>
        </div>
        <div className='bottom' style={{ display: 'grid', placeItems: 'center', paddingTop: '40PX' }}>
          <img src={`${serverURL}/images/orderimg.png`} alt="" style={{ background: 'white', width: '80%' }} />
        </div>
      </Paper>
    </div>
  )
}
