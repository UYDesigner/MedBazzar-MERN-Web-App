import { Button, Grid, Input, Paper, TextField } from "@mui/material";
import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import GetOTP from "./GetOTP";
import { postData } from "../../services/FetchNodeServices";
import LogInDetails from "./LogInDetails";
import { useTheme } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useDispatch } from "react-redux";

export default function LogInOTP() {

  var dispatch = useDispatch();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const [error, setError] = useState({

  })

  const [userData, setUserData] =useState([])

  const handleError = (label, msg) => {

    setError((pre) => ({ ...pre, [label]: msg }))


  }


  //   var navigate = useNavigate();
  const [status, setStatus] = useState(true)
  const [otp, setOtp] = useState(0)
  const [mobileno, setMobileno] = useState('')
  const [userStatus, setUserStatus] = useState(false)
  const generateOTP = () => {
    var myotp = parseInt(Math.random() * 8999) + 1000
    alert(myotp)
    setOtp(myotp)



  }
  const handleOTP = async () => {


    var submit = true;
    if (mobileno.length == 0) {
      handleError('mobileno', 'Please Fill Mobile Number...');
      submit = false;
    }

    if (submit) {
      var result = await postData('users/check_userdata', { mobileno: mobileno })
      alert(result.message);
      alert(result.status);
      if (result.status == 'False') {
        generateOTP()
        setStatus(!status)
        setUserStatus(false)
        alert('not')
      }
      else {
        generateOTP()
        setStatus(!status)
        setUserStatus(true)
        alert('yes')
        setUserData(result.data);
        
      }
    }
  }
  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
      {status ?
        <Paper elevation={5} style={{ width: "90%", borderRadius: "60px 10px" }}>
          <Grid
            container
            spacing={1}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 500,
              fontFamily: "kanit",
            }}
          >
            <Grid item xs={matches ? 9 : 7}>
              <Grid item xs={12} fullWidth>
                <div style={{ fontWeight: "bold", fontSize: 30, marginBottom: 5 }}>
                  Sign in To MedBazzar
                </div>
                <div style={{ fontWeight: "", fontSize: 13, paddingTop: "10px" }}>
                  to acccess your Addresses, Orders & Whislist
                </div>
              </Grid>

              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <div style={{ marginRight: 5, fontWeight: "bold" }}>+91</div>
                <Input
                  style={{ fontSize: 13, fontWeight: "bold" }}
                  id="mobileno"
                  variant="standard"
                  placeholder="Enter Your Mobile No"
                  fullWidth
                  onChange={(e) => setMobileno(e.target.value)}
                  onClick={() => handleError('mobileno', '')}
                />
              </Grid>
              {error.mobileno ? <span style={{
                color: '#d32f2f', fontFamily: "Roboto", fontWeight: '400', marginLeft: '15px', fontSize: '13px'
              }}>{error.mobileno}</span> : <></>}

              <Grid item xs={12} style={{ marginTop: 80 }}>
                <Button
                  onClick={handleOTP}
                  variant="contained"
                  fullWidth
                >
                  Get OTP
                </Button>
              </Grid>

              <Grid item xs={12}>
                <p style={{ fontSize: 14, marginTop: 30 }}>
                  By Continuing, you agree to our{" "}
                  <span style={{ color: "blue" }}>Terms Of Service</span> and{" "}
                  <span style={{ color: "blue" }}>Privacy & Legal Policy</span>{" "}
                </p>
              </Grid>
            </Grid>
          </Grid>
        </Paper> : userStatus ? <GetOTP mobileno={mobileno} otp={otp} userData={userData} /> : <LogInDetails mobileno={mobileno} otp={otp} />}
    </div>
  );
}
