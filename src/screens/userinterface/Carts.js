import Headers from "../../components/userinterface/Headers";
import PaymentDetails from "../../components/userinterface/PaymentDetails";
import ShowCart from "../../components/userinterface/ShowCart";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import AddAddress from "../../components/userinterface/AddAddress"
import { postData } from "../../services/FetchNodeServices";
import { useEffect } from "react";
import DileveryAddress from "../../components/userinterface/DileveryAddress";
import Cookies from "js-cookie";
export default function Carts(props) {
    const theme = useTheme()
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'))
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'))

    var prd = JSON.parse(Cookies.get("CART"));

    // for redex-------------
    // var products = useSelector(state => state.data)  
    // for redex-------------
    
    var products = Object.values(prd);
    var userData = Object.values(useSelector(state => state.user))[0]
    console.log("USER DATAAAA:", userData)


    const [pageRefresh, setPageRefresh] = useState(false);
    const [status, setStatus] = useState(false)
    const [userAddress, setUserAddress] = useState([])


    const check_user_address = async () => {

        // alert("Address")
        // alert(userData.mobileno);
        if (userData == undefined) {
            // alert('status --- false')
            setStatus(false);
        }
        else {
            var result = await postData('users/check_user_address', { mobileno: userData?.mobileno })
            // alert('status --- true')
            // alert(result.message);
            // alert(result.status);
            if (result.status == 'false') {
                setStatus(true);
            }
            else {
                setStatus(false);
                setUserAddress(result.data);
            }
        }
    }

    useEffect(function () {
        check_user_address()
    }, [userData?.mobileno, pageRefresh])


    return (
        <div>
            <Headers />
            <div style={{ marginTop: 50, width: '100%', display: 'flex', justifyContent: 'center', alignItems: matchesMD ? 'center' : '', flexDirection: matchesMD ? 'column' : 'row', gap: matchesMD ? '40px' : '60px' }} >
                <div style={{ width: matchesMD ? '90%' : '60%', display: 'flex', flexDirection: "column", gap: '40px' }} >
                    {userData?
                        <div>
                            <DileveryAddress userAddress={userAddress} userData={userData} status={status} setStatus={setStatus} />
                        </div>
                        :
                        <>
                        </>
                    }
                    <div>
                        <ShowCart products={products} pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} />
                    </div>
                </div>
                <div style={{ width: matchesMD ? '90%' : '30%', background: '', marginBottom: 60, }} >
                    <PaymentDetails products={products} pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} userAddress={userAddress} userData={userData} />
                    </div>
            </div>
            <AddAddress status={status} setStatus={setStatus} userData={userData} userAddress={userAddress} pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} />
        </div>
    )
}