import { Divider, Grid } from "@mui/material";
import { serverURL } from "../../services/FetchNodeServices";
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { Button } from "@mui/material";
//import AddCarts from "./AddCarts";
import { useSelector, useDispatch } from "react-redux";
import PlusMinusComponent from "./PlusMinusComponent";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { padding } from "@mui/system";



export default function ShowCart(props) {
    var dispatch = useDispatch()
    var productFromRedux = props.products
    var productDetails = Object.values(productFromRedux)
    var navigate = useNavigate();

    const theme = useTheme()
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'))
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'))


    const handleChange = (v, item) => {
        if (v > 0) {
            item['qty'] = v

            dispatch({ type: 'ADD_PRODUCT', payload: [item.productdetailid, item] })
        }
        else {
            dispatch({ type: 'DELETE_PRODUCT', payload: [item.productdetailid] })
        }
        props.setPageRefresh(!props.pageRefresh) 
    }

    const handleDelete=(itemToDelete)=>{
        
        dispatch({ type: 'DELETE_PRODUCT', payload: [itemToDelete.productdetailid] })
        props.setPageRefresh(!props.pageRefresh) 
    }

    const CartBox = () => {
        return productDetails.map((item, i) => {

            return (

                <div style={{ display: 'flex', width: '100%', border: 'solid 1px #00000021', borderRadius: 5, paddingTop: 15, paddingBottom: 15, marginTop: 7 }} >
                    <div>
                        <div>
                            <img src={`${serverURL}/images/${item.picture}`} style={{ width: 100, marginLeft: 'auto', marginRight: 'auto', borderRadius: 10, height: 'auto', display: 'block' }} />
                        </div>
                    </div>

                    <div style={{ width: '85%', margin:'0px 20px',  }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: 'kanit', fontSize: 18, fontWeight: 'bold' }} > {item.productsubname} {item.description} {item.weight} {item.weighttype}
                            {/*  <div><AddCarts/></div> */}
                        </div>

                        <div style={{ fontFamily: 'kanit', fontSize: 14, color: 'grey' }} > {item.productsubname} | {item.weight} {item.weighttype} </div>

                        {/* <span style={{fontFamily:'kanit',fontSize:22,fontWeight:'bold'}} > &#8377;{item.offerprice} </span> 
                    <span style={{fontFamily:'kanit',fontSize:15,color:'gray'}} > <s>MRP &#8377;{item.price}</s> </span> */}
                        <div style={{ display: 'flex', flexDirection:  matchesSM ? "column": "row", alignItems: matchesMD ? " ": "center", justifyContent: 'space-between', width: '90%', gap:'10px' }}>
                            <div style={{ marginTop: 8 }} >
                                {item.offerprice == 0 ?
                                    <div style={{ fontSize: 22, fontWeight: 'bolder' }} >
                                        &#8377;{item.price}
                                    </div> :

                                    <div  >
                                        <span style={{ fontFamily: 'kanit', fontSize: 22, fontWeight: 'bold' }} > &#8377;{item.offerprice} </span>
                                        <span style={{ fontFamily: 'kanit', fontSize: 15, color: 'gray' }} > <s>MRP &#8377;{item.price}</s> </span>
                                        <span style={{ fontFamily: 'kanit', fontSize: 11, background: '#f5a623', padding: 3, borderRadius: 15, color: '#6a7d27' }} > 20% Off </span>
                                    </div>}
                            </div>
                            <div style={{paddingleft:'5px', width: matchesSM ? '40%' : '25%'}}>
                                <PlusMinusComponent qty={item?.qty} onChange={(v) => handleChange(v, item)} width={'30%'} />
                            </div>
                        </div>


                        <div style={{ fontFamily: 'kanit', fontSize: 13, color: 'grey', display: 'flex', alignItems: 'center' }} >
                            <div style={{ color: 'maroon', marginRight: 10, marginTop: 10 }} ><AccessTimeOutlinedIcon fontSize="small" /></div>
                            Delivery within
                            <span style={{ color: 'black', fontWeight: 'bold', marginLeft: 5 }} >1 - 3 Days</span>
                        </div>

                        <hr />

                        <div style={{ color: 'red' }} >

                            <Button size="small" color="error" variant="text" startIcon={<DeleteIcon />}  onClick={() => handleDelete( item)} >
                                Remove
                            </Button>

                            <Button size="small" variant="text" style={{ color: 'black', background: 'white' }} startIcon={<BookmarkAddOutlinedIcon />}>
                                Add to favourites
                            </Button>

                        </div>
                    </div>


                </div>



            )
        })
    }
    return (
        <div style={{ width: '100%', fontFamily: 'kanit' }}>
            <div style={{ fontSize: '1.6em', fontWeight: 'bold' }} >{productDetails.length} Items in Cart</div>
            <div style={{ fontSize: 14, color: 'grey', marginTop: 10 }} >Prescription is not required</div>
            {CartBox()}
            <div style={{  marginTop: 10, display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={()=>navigate('/home')} >
                <span>
                    <AddBoxOutlinedIcon style={{ fontSize: '1.8em', marginTop: 5 }} />
                </span>
                <span style={{ fontWeight: 'bolder', fontSize: '1.0em', margin: 10,  width:'140px' }}  >
                    Add more items
                </span>
            </div>

        </div>

    )
}