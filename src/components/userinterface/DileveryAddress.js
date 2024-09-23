import { Grid, Divider, Button } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from "react";


export default function DileveryAddress(props) {

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    


    const showAllAddress = (userAddress) => {
       
        var items = Object.values(userAddress).slice(1);
      
        return items.map((item, index) => (
            <div key={index} style={{ display: 'flex', flexDirection: 'column', paddingLeft:10, margin: 3 , color:'gray', gap :'20px'}}>
              <div>{item}</div>
            </div>
        ));
    };
    
    
    

    const handleAddress=()=>{
        props.setStatus(!props.status)
    }


    return (<div style={{ display: 'flex', width: '100%', border: 'solid 1px #00000021', height: 'auto', borderRadius: 15, padding: 10, fontFamily: 'kanit', marginTop: 20 }}>
        <Grid container spacing={1}>

            <Grid item xs={12} style={{ fontSize: 16, fontWeight: 'bolder', display: 'flex', justifyItems: "center", alignItems: 'center' }}>
                Dilevery Address
            </Grid>
             
            <Grid item xs={12} >
                <Divider />
            </Grid>

            <Grid item md={6} xs={12} style={{ fontSize: matches ? 13 : 13, fontWeight: 'bold', alignItems: 'center', display: 'flex', marginRight:'auto', color:'black' }}>
                {props?.userAddress?.length == 0 ? <span>
                    Please add your address to continue</span> : <div>
                    <div style={{ fontSize: 16, fontWeight: 'bolder', marginBottom:'15px', marginTop:'15px'}} >{props?.userData?.username}</div>
                    {showAllAddress(props?.userAddress)}
                </div>}
            </Grid>

            <Grid item md={6} xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>


                {matches ? (
                    <Button startIcon={<AddIcon />} size="small" variant="contained" style={{ display: 'flex', borderRadius: 30, padding: matches ? <></> : 1, marginLeft: matches ? 'auto' : 'auto', fontFamily: 'kanit', fontSize: '.8vw', fontWeight: 'bolder', justifyContent: 'center', alignItems: 'center', marginBottom: 10, width: '9vw', height: '4vh' }} onClick={handleAddress} >
                       
                    </Button>
                ) : (
                    <>

                        <Button startIcon={<AddIcon />} size="small" variant="contained" style={{ display: 'flex', borderRadius: 30, padding: matches ? <></> : 10, marginLeft: matches ? <></> : 'auto', fontFamily: 'kanit', fontSize: '.8vw', fontWeight: 'bolder', justifyContent: 'center', alignItems: 'center', marginBottom: 10, width: '9vw', height: '4vh' }} onClick={handleAddress} >
                        Add Address
                        </Button>
                    </>
                )}
            </Grid>



        </Grid>

    </div>)
}