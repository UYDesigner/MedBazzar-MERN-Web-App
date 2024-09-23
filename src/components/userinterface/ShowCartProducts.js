import React from 'react'
import { useSelector } from "react-redux";
import { Divider, Paper, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function ShowCartProducts(props) {

  var navigate = useNavigate();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md')); 
  var products = useSelector((state) => state.data)
  var keys = Object?.keys(products)
  var products = Object?.values(products)
  const showProducts = () => {
    return products.map((item) => {
      return <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 6, fontSize: 14 }}>
        <div>{item.productname}</div>
        <div> <span style={{ fontWeight: 'bold' }}  >Qty: </span>{item.qty}
        </div>
      </div>
    })
  }


  return (
    <Paper elevation={2} style={{ display: props.isOpen ? 'flex' : 'none', position: 'absolute', top: 50, right: 59, zIndex: 3 }} >
      <div style={{ width: 400, height: 'auto', display: 'flex', flexDirection: 'column', padding: 5 }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 16, fontWeight: 'bold' }} >Order Summary</div>
          <div style={{ fontSize: 16, fontWeight: 'bold' }}>{keys.length} Items</div>


        </div>
        <Divider />
        {showProducts()}
        <div className="PtB mt-[20px]" >
          <Button variant='contained'style={{background:'#134201', fontWeight: 'bold', borderRadius:'10px'}} fullWidth onClick={()=>navigate('/cart')}>
            Proceed To Cart
          </Button>
        </div>
      </div>
    </Paper>
  )
}
