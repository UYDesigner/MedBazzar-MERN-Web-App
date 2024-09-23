import React, { useEffect, useState } from "react";
import { Grid, Radio, FormControlLabel, RadioGroup, Button, Paper, Divider } from "@mui/material"
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DeliveryDiningOutlinedIcon from '@mui/icons-material/DeliveryDiningOutlined';
// import Paper from "@mui/material";
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import { postData, serverURL } from "../../services/FetchNodeServices";

import { Link } from 'react-router-dom';


export default function PaymentDetails(props) {

    const navigate = useNavigate()
    var [caption, setCaption] = useState('Login to proceed');
    var [checkSelected, setCheckSelected] = useState(false);
    var productFromRedux = props.products;
    var [radioValue, setRadioValue] = useState('P')
    const [otp, setOtp] = useState(""); // Define otp state


    var product = Object.values(productFromRedux)
    var totalamount = product.reduce((p1, p2) => {
        var amt = p2.qty * p2.price
        return p1 + amt
    }, 0)

    var amountpaid = product.reduce((p1, p2) => {
        var amt = p2.qty * (p2.offerprice > 0 ? p2.offerprice : p2.price)
        return p1 + amt
    }, 0)

    var save = totalamount - amountpaid
    const generateOrder = async (razorpay_payment_id) => {
        var result = await postData('users/save_order', { userid: props?.userData?.userid, mobileno: props?.userData?.mobileno, emailid: props?.userData?.emailid, paymentstatus: 'Online', paymentid: razorpay_payment_id, orderlist: product })
        alert(result.status)


    }




    ///********Payment Gateway********** */
    const options = {
        key: "rzp_test_GQ6XaPC6gMPNwH",
        amount: amountpaid * 100, //  = INR 1
        name: "MedBazzar",
        description: 'some description',
        image:
            `${serverURL}/images/logo.png`,
        handler: function (response) {
            generateOrder(response.razorpay_payment_id)
            alert(response.razorpay_payment_id);
        },
        prefill: {
            name: props?.userData?.username,
            contact: props?.userData?.mobileno,
            email: props?.userData?.emailid,
        },
        notes: {
            address: "some address",
        },
        theme: {
            color: "blue",
            hide_topbar: false,
        },
    };

    const openPayModal = () => {
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
    };
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);



    ////********************* */

    const handleRadio = (e) => {
        setRadioValue(e.target.value);
        // setCaption('Confirm Payment')
        if (radioValue == "P")
            setCaption('Confirm Order')
        else if (radioValue == "D")
            setCaption('Make Payment')
    }
    const generateOTP = () => {
        var myotp = parseInt(Math.random() * 8999) + 1000;
        // alert(myotp);
        setOtp(myotp); // Set otp state
    }


    var user = JSON.stringify(props.userData);
    var userAddress = JSON.stringify(props.userAddress);

    const handleLogin = () => {


        if (caption.toUpperCase() === "MAKE PAYMENT")
            openPayModal()
        else if (caption.toUpperCase() === "LOGIN TO PROCEED")
            navigate("/loginscreen")
        else {
            generateOTP();
            // alert(otp);
            // // alert(user)
            // // alert(userAddress);

            if (amountpaid == 0) {
                alert("Oops! Something went wrong. Invalid amount (should be passed in integer. Minimum value is 100, i.e. ₹ 1)");
            }
            else if (otp != "") {
                alert(otp);
                navigate('/confirmorder', { state: { username: user, address: userAddress, myOtp: otp } });
            }
        }

    }


    var Address = Object.values(props.userAddress);
    useEffect(function () {
        if (Address.length > 0) {
            setCaption('Make Payment')
            setCheckSelected(true);
        }

    }, [props.userAddress])

    return (
        <div>
            <Grid container spacing={2} style={{ fontFamily: 'kanit' }} >

                <Grid item xs={12} >
                    <div style={{ fontSize: 16, fontWeight: 'bold', background: 'yellow', width: '100%', borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                        Payment Details
                    </div>
                </Grid>

                <Grid item xs={6} style={{ fontSize: 18, }} >
                    Total Amount
                </Grid>

                <Grid item xs={6} style={{ fontSize: 18, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }} >
                    &#8377;{totalamount}
                </Grid>

                <Grid item xs={6} style={{ fontSize: 18 }} >
                    Amount Paid
                </Grid>

                <Grid item xs={6} style={{ fontSize: 18, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginLeft: 'auto', }} >
                    &#8377;{amountpaid}
                </Grid>

                <Grid item xs={6} style={{ fontSize: 18, }} >
                    Savings
                </Grid>

                <Grid item xs={6} style={{ fontSize: 18, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginLeft: 'auto', }} >
                    &#8377;{save}
                </Grid>

                <Divider />
                <div style={{ fontSize: 18, fontWeight: 'bold', display: 'flex', justifyContent: 'space-evenly', width: '100%', borderRadius: 10, marginTop: 10 }} >
                    <div style={{ paddingLeft: 12 }}>
                        Order Total
                    </div>
                    <div style={{ marginLeft: 'auto', fontSize: 18 }}>
                        &#8377;{amountpaid}
                    </div>
                </div>

                <div style={{ fontSize: 13, margin: 10, color: 'gray' }} >
                    <i>Price may vary depending on the product batch*</i>
                </div>

            </Grid>

            <hr />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <div>
                    <div style={{ display: 'flex', alignItems: 'center' }} >
                        <span><LocalOfferOutlinedIcon fontSize="small" color="warning" /></span>
                        <span style={{ fontFamily: 'kanit', fontWeight: 'bold', fontSize: 15, marginLeft: 4 }} >Use Coupons</span>
                    </div>
                    <div style={{ fontSize: 12, fontFamily: 'kanit', color: 'GrayText' }} >Also get a gift code after placing this order</div>
                </div>

                <div>
                    <ArrowForwardIosIcon fontSize="small" />
                </div>
            </div>

            <hr />

            <div>

                <div style={{ display: 'flex', alignItems: 'center', background: '#ffc43d', borderTopLeftRadius: 10, borderTopRightRadius: 10, padding: 5 }} >
                    <InfoOutlinedIcon fontSize="small" />
                    <p style={{ fontFamily: 'kanit', fontSize: 13, marginLeft: 20 }} >Shop above 600.00 to get free delivery</p>
                </div>

                {checkSelected ?
                    (<div style={{ background: 'lightgrey', paddingLeft: 5 }} >
                        <RadioGroup
                            row
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue={radioValue}
                            name="radio-buttons-group"
                            onClick={handleRadio}
                        >
                            <FormControlLabel value="D" control={<Radio size="small" />} label="Cash on Delivery" />
                            <FormControlLabel value="P" control={<Radio size="small" />} label="Make Payment" style={{ marginLeft: 'auto' }} />
                        </RadioGroup>
                    </div>)
                    :

                    (
                        props.userData != undefined ?

                            <div style={{ background: '#d10423', paddingLeft: 5, color: 'white' }}>
                                Please Add Address In Further Process...
                            </div>
                            :
                            <>
                            </>


                    )


                }

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, paddingLeft: 10, padding: 10, border: 'solid 1px #00000021' }} >
                    <div>
                        <div style={{ fontSize: 13 }} >{product.length} ITEM</div>
                        <div>&#8377; {amountpaid} </div>
                    </div>

                    <div>
                        <Button onClick={handleLogin} variant="contained" size="small" style={{ background: '#00391c' }} >{caption}</Button>
                    </div>
                </div>

            </div>

            <hr style={{ marginTop: 20 }} />

            <div style={{ fontFamily: 'kanit', fontWeight: 'bold', fontSize: 17 }} >
                Delivery Instruction
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <div style={{ display: 'flex', alignItems: 'center' }} >
                    <DeliveryDiningOutlinedIcon size="large" />
                    <p style={{ marginLeft: 10, fontFamily: 'kanit', fontSize: 15, fontWeight: 'bold' }} >Add Delivery Instructions</p>
                </div>
                <div>
                    <ArrowForwardIosIcon fontSize="small" />
                </div>
            </div>



        </div>
    )

}