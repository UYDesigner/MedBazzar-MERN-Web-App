import { Button, Grid, Input, Paper, TextField } from "@mui/material";
import { useState } from "react";
import React from "react";
import OtpInput from "react-otp-input";
import LogInOTP from "./LogInOTP";
import { useTheme } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";

export default function GetOTP(props) {
  var dispatch = useDispatch();
  var navigate = useNavigate();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));


  const [otp, setOtp] = useState("");
  const [status, setStatus] = useState(true)

  const handleVerifyOtp = async () => {
    if (props.otp == otp) {
      dispatch({ type: 'ADD_USER', payload: [props?.mobileno, props?.userData] })
      navigate('/cart')
    }
    else {
      alert('Invalid OTP...')
    }
  }

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
      {status ?
        <Paper elevation={5} style={{ width: "90%", borderRadius: "50px 10px" }}>
          <Grid
            container
            spacing={2}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 500,
              fontFamily: "kanit",
            }}
          >
            <Grid item xs={matches ? '9' : '7'}>
              <Grid item xs={12} style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", }} fullWidth >
                <div style={{ fontWeight: "bold", fontSize: 30, marginBottom: 5 }}>
                  Verify Phone Number
                </div>
                <div style={{ fontWeight: "", fontSize: 13 }}>
                  An SMS with 4-digit OTP was sent to
                </div>
              </Grid>

              <Grid item xs={12} fullWidth style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}  >

                <div style={{ fontWeight: 'bold', fontSize: 15, margin: 5 }} >+91 - {props.mobileno}</div>
                <Button onClick={() => setStatus(!status)} size="small" variant="text" >change</Button>

              </Grid>

              <Grid item xs={12} style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 40, }}>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={4}
                  renderSeparator={<span>-</span>}
                  renderInput={(props) => <input {...props} />}
                  inputStyle={{ width: 35, height: 40 }}
                />
              </Grid>

              <Grid item xs={12} style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 60, }}>
                <Button variant="contained" fullWidth onClick={handleVerifyOtp} >
                  Verify
                </Button>
              </Grid>

              <Grid item xs={12} style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 20, }}>
                <p style={{ fontSize: 14 }}>
                  By Continuing, you agree to our{" "}
                  <span style={{ color: "blue" }}>Terms Of Service</span> and{" "}
                  <span style={{ color: "blue" }}>Privacy & Legal Policy</span>{" "}
                </p>
              </Grid>
            </Grid>
          </Grid>
        </Paper> : <LogInOTP />}
    </div>
  );
}
