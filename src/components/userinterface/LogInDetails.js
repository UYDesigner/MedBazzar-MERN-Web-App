import React, { useState } from "react"
import { Grid, Input, Button } from "@mui/material"
import { Paper } from "@mui/material"
import OtpInput from "react-otp-input"
import LogInOTP from "./LogInOTP"
import { postData } from "../../services/FetchNodeServices"
import Swal from 'sweetalert2';
import { useTheme } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";


export default function LogInDetails(props) {
    var dispatch = useDispatch();
    var navigate = useNavigate();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));
    const [error, setError] = useState({

    })
    const handleError = (label, msg) => {

        setError((pre) => ({ ...pre, [label]: msg }))


    }


    const [otp, setOtp] = useState('')
    const [status, setStatus] = useState(true)
    const [emailId, setEmailId] = useState('')
    const [mobileno, setMobileno] = useState('')
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const handleSubmit = async () => {

        var submit = true;

        if (firstname.length == 0) {
            handleError('firstname', 'Please Enter First Name..');
            submit = false;
        }
        if (lastname.length == 0) {
            handleError('lastname', 'Please Enter Last Name..');
            submit = false;
        }
        if (emailId.length == 0) {
            handleError('emailid', 'Please Enter Your Email Address..');
            submit = false;
        }




        if (submit) {
            if (props.otp == otp) {
                var body = { mobileno: props.mobileno, emailid: emailId, username: (firstname + " " + lastname) }
                var result = await postData('users/submit_user', body)
                if (result.status) {
                    Swal.fire({
                        position: "top-end",
                        title: 'You are registered now...',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500,
                        toast: true

                    });
                    dispatch({ type: 'ADD_USER', payload: [props.mobileno, body] })
                }
                navigate('/cart')
            }
            else {
                alert('Invalid OTP...')
            }
        }
    }
    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
            {status ?
                <Paper elevation={5} style={{ width: '90%', borderRadius: '50px 10px' }} >
                    <Grid container spacing={1} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto', padding: 20, fontFamily: 'kanit' }} >

                        <Grid item xs={matches ? 10 : 8}  >
                            <Grid item xs={12} fullWidth  >

                                <div style={{ fontWeight: 'bold', fontSize: 32, marginBottom: '15px' }} >Welcome To MedBazzar</div>
                                <div style={{ fontWeight: '', fontSize: 13 }} >Please enter your details for better shopping experience</div>

                            </Grid>

                            <Grid item xs={12} style={{ marginTop: 20 }} >
                                <Input style={{ fontSize: 13, fontWeight: 'bold', letterSpacing: 3 }} onChange={(e) => setFirstName(e.target.value)} placeholder="Enter First Name*" fullWidth id='firstname' onClick={() => handleError('firstname', '')} />
                                {error.firstname ? <span style={{
                                    color: '#d32f2f', fontFamily: "Roboto", fontWeight: '400', marginLeft: '0px', fontSize: '13px'
                                }}>{error.firstname}</span> : <></>}
                            </Grid>

                            <Grid item xs={12} style={{ marginTop: 20 }} >
                                <Input style={{ fontSize: 13, fontWeight: 'bold', letterSpacing: 3 }} onChange={(e) => setLastName(e.target.value)} placeholder="Enter Last Name " fullWidth id='lastname' onClick={() => handleError('lastname', '')} />
                                {error.lastname ? <span style={{
                                    color: '#d32f2f', fontFamily: "Roboto", fontWeight: '400', marginLeft: '0px', fontSize: '13px'
                                }}>{error.lastname}</span> : <></>}
                            </Grid>

                            <Grid item xs={12} style={{ marginTop: 20 }} >
                                <Input style={{ fontSize: 13, fontWeight: 'bold', letterSpacing: 3 }} onChange={(e) => setEmailId(e.target.value)} placeholder="Enter Your Email Address..  " fullWidth id='emailid' onClick={() => handleError('emailid', '')} />
                                {error.emailid ? <span style={{
                                    color: '#d32f2f', fontFamily: "Roboto", fontWeight: '400', marginLeft: '0px', fontSize: '13px'
                                }}>{error.emailid}</span> : <></>}
                            </Grid>

                            <Grid item xs={12} fullWidth style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} >

                                <div style={{ fontWeight: 'bold', fontSize: 25, marginTop: 15 }} >Verify Phone Number</div>
                                <div style={{ fontWeight: '', fontSize: 13 }} >An SMS with 4-digit OTP was sent to</div>

                            </Grid>

                            <Grid item xs={12} fullWidth style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}  >

                                <div style={{ fontWeight: 'bold', fontSize: 15, margin: 5 }} >+91 - {props.mobileno}</div>
                                <Button onClick={() => setStatus(!status)} variant="text" size="small" >change</Button>

                            </Grid>

                            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 10 }} >
                                <OtpInput
                                    value={otp}
                                    onChange={setOtp}
                                    numInputs={4}
                                    renderSeparator={<span>-</span>}
                                    renderInput={(props) => <input {...props} />}
                                    inputStyle={{ width: 35, height: 40 }}
                                />
                            </Grid>

                            <Grid item xs={12} style={{ marginTop: 30 }}  >
                                <Button variant="contained" fullWidth onClick={handleSubmit} >Get Started</Button>
                            </Grid>


                        </Grid>

                    </Grid>
                </Paper> : <LogInOTP />}
        </div>
    )
}