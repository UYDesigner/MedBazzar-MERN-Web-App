import { Divider, Grid } from "@mui/material";
import { serverURL } from "../../services/FetchNodeServices";
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import  AddBoxOutlinedIcon  from "@mui/icons-material/AddBoxOutlined";
import { Button } from "@mui/material";
import AddCarts from "./AddCarts";




export default function ShowCart()
{

    var productDetails = [{productdetailid:1, categoryid:2, subcategoryid:3, brandid:4, productid:5, productsubname:'RedBull', weight:250, weighttype:'ml', type:'packet', packaging:'box', qty:3, price:125, offerprice:120, offertype:'Dhamaka', description:'Energy drink, Sugar free', picture:'p1.png'},
    {productdetailid:1, categoryid:2, subcategoryid:3, brandid:4, productid:5, productsubname:'Lizol', weight:500, weighttype:'ml', type:'packet', packaging:'box', qty:3, price:225, offerprice:220, offertype:'Dhamaka', description:'Home cleaner', picture:'l2.webp'},
    {productdetailid:1, categoryid:2, subcategoryid:3, brandid:4, productid:5, productsubname:'Zandu Balm', weight:120, weighttype:'mg', type:'packet', packaging:'box', qty:3, price:70, offerprice:60, offertype:'Dhamaka', description:'Pain relief', picture:'z1.webp'}]
    // var pdImages = Object.values(productDetails)[0].picture.split(',')
    // const carts=()=>{
    //     return cartImages.map((item)=>{
    //         return<div><img src={`${serverURL}/images/${item}`} style={{width:400,marginLeft:'auto',marginRight:'auto',borderRadius:10,height:'auto',display:'block'}} /></div>
    //     })
    // } 

 const CartBox = () =>{
    return productDetails.map((item,i)=>{
        
        return(

            <div style={{display:'flex',width:'100%',border:'solid 1px #00000021',borderRadius:5,paddingTop:15,paddingBottom:15,marginTop:7}} >
                <div>
                    <div>
                        <img src={`${serverURL}/images/${item.picture}`} style={{width:100,marginLeft:'auto',marginRight:'auto',borderRadius:10,height:'auto',display:'block'}} />
                    </div>
                </div>   
                    
                <div style={{width:'85%'}}>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',fontFamily:'kanit',fontSize:18,fontWeight:'bold'}} > {item.productsubname} {item.description} {item.weight} {item.weighttype}
                    <div><AddCarts/></div>
                    </div>

                    <div style={{fontFamily:'kanit',fontSize:14,color:'grey'}} > {item.productsubname} | {item.weight} {item.weighttype} </div>

                    {/* <span style={{fontFamily:'kanit',fontSize:22,fontWeight:'bold'}} > &#8377;{item.offerprice} </span> 
                    <span style={{fontFamily:'kanit',fontSize:15,color:'gray'}} > <s>MRP &#8377;{item.price}</s> </span> */}
                    <div style={{marginTop:8}} >
                        {item.offerprice == 0 ? 
                        <div style={{fontSize:22,fontWeight:'bolder'}} >
                            &#8377;{item.price}
                        </div> :
                            
                        <div  >
                            <span style={{fontFamily:'kanit',fontSize:22,fontWeight:'bold'}} > &#8377;{item.offerprice} </span>
                            <span style={{fontFamily:'kanit',fontSize:15,color:'gray'}} > <s>MRP &#8377;{item.price}</s> </span>
                            <span style={{fontFamily:'kanit',fontSize:11,background:'#f5a623',padding:3,borderRadius:15,color:'#6a7d27'}} > 20% Off </span>
                        </div>}
                    </div>
                    

                    <div style={{fontFamily:'kanit',fontSize:13,color:'grey',display:'flex',alignItems:'center'}} > 
                    <div style={{color:'maroon',marginRight:10,marginTop:10}} ><AccessTimeOutlinedIcon fontSize="small" /></div>
                        Delivery within
                        <span style={{color:'black',fontWeight:'bold',marginLeft:5}} >1 - 3 Days</span> 
                    </div>
                    
                    <hr />

                    <div style={{color:'red'}} >

                    <Button size="small" color="error" variant="text" startIcon={<DeleteIcon />}>
                    Remove
                    </Button>

                    <Button size="small" variant="text" style={{color:'black',background:'white'}} startIcon={<BookmarkAddOutlinedIcon />}>
                    Add to favourites
                    </Button>
                    
                    </div>
                </div>


            </div>



        )
    })
 }
    return(
        <div style={{width:'100%',fontFamily:'kanit'}}>
            <div style={{fontSize:'1.6em',fontWeight:'bold'}} >{productDetails.length} Items in Cart</div>
            <div style={{fontSize:14,color:'grey',marginTop:10}} >Prescription is not required</div>
            {CartBox()}
            <div style={{marginBottom:500,marginTop:10,display:'flex',alignItems:'center'}} >
                <span>
                    <AddBoxOutlinedIcon style={{fontSize:'1.8em',marginTop:5}} />
                </span>
                <span style={{fontWeight:'bolder',fontSize:'1.0em',margin:10}} >
                    Add more items
                </span>
            </div>

        </div>
        
    )
}