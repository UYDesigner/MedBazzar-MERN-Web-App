import React, { useState } from 'react'
// import { AppBar, Box, Toolbar, Typography, Button, IconButton } from "@mui/material";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import logo from '../../assets/logo.png'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import SearchBar from './SearchBar';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from "react-router-dom";
import { serverURL } from "../../services/FetchNodeServices"
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useStyles } from "../../screens/userinterface/HomeCss";
import { Avatar, AppBar, Box, Toolbar, Typography, Grid, Paper, Badge } from "@mui/material";
import MenuBar from './MenuBar';
import { UseSelector, useSelector } from 'react-redux';
import ShowCartProducts from './ShowCartProducts';
// import { serverURL } from '../../services/FetchNodeServices';
import { postData } from '../../services/FetchNodeServices';
// import { useState } from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from "react-redux";
import Cookies from 'js-cookie';
export default function Headers(props) {



    var dispatch = useDispatch();
    const theme = useTheme();
    const classes = useStyles();
    const navigate = useNavigate();
    const [status, setStatus] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [touch, setTouch] = useState(false);
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    // for cookies
    try {
        var prd = JSON.parse(Cookies.get("CART"));
    }
    catch {
        prd = {};
    }
    // for cookies

    var products = useSelector((state) => state.data);
    var keys = Object?.keys(prd);
    console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",keys.length, "kvvv", keys);
    const [pattern, setPattern] = useState('');
    const [pageRefresh, setPageRefresh] = useState(false);




    const handleDrawer = () => {
        setStatus(true);
    }

    const handleClose = () => {
        setStatus(false);
    }

    const showCartDetails = () => {
        // alert('hi')
        setIsOpen(true);
    }
    const hideCartDetails = () => {
        setIsOpen(false);
    }

    const handleCart = () => {
        setTouch(true);
    }



    var user = useSelector((state) => state.user);

    var userData = '';
    var userInfo = {}
    try {

        userData = Object.values(user)[0].username.split(' ');
        // alert(userData);
        userData = userData[0];
        // alert(userData);
    }
    catch (e) {

        console.log("error in username ", e);
    }


    userInfo = Object.values(user)[0];

    const handleLogOut = async () => {
        // alert('log')
        var body = { mobileno: userInfo.mobileno, emailid: userInfo.emailid }
        console.log(body, "uu", userInfo.mobileno)
        // var result = await postData('users/delete_user', body)
        // if (result.status) {
        //     Swal.fire({
        //         position: "top-end",
        //         title: 'Logout Successfully...',
        //         icon: 'success',
        //         showConfirmButton: false,
        //         timer: 1500,
        //         toast: true

        //     });

        // }

        var result2 = await postData('users/delete_user_address', body)
        if (result2.status) {
            Swal.fire({
                position: "top-end",
                title: 'Logout Successfully...',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500,
                toast: true

            });


            dispatch({ type: 'DELETE_USER', payload: [userInfo.mobileno] })
            // setPageRefresh(!props.pageRefresh)

            setStatus(false);
            setPageRefresh(!props.pageRefresh)
            navigate('/home');


        }
    }

    const handleChangeButton = () => {
        setStatus(false);
        navigate('/loginscreen');
    }
    console.log(pageRefresh)

    const drawerList = () => {
        return (
            <Paper>

                <div className={classes.leftBarStyle} >
                    <img src={`${serverURL}/images/user.png`} style={{ width: '35%', borderRadius: 50 }} />

                    {userData.length > 0 ?
                        <>
                            <div className={classes.nameStyle}>{userInfo?.username}</div>
                            <div className={classes.emailStyle}>{userInfo?.emailid}</div>
                            <div className={classes.phoneStyle}>{`+91${userInfo?.mobileno}`}</div>
                        </>
                        :
                        <>
                        </>
                    }

                </div>


                <div>
                    <List>
                        <Divider />






                        <ListItem disablePadding>
                            <ListItemButton >
                                <ListItemIcon>
                                    <DraftsIcon />
                                </ListItemIcon>
                                <ListItemText primary={<span className={classes.menuItemStyle}>Sales Report</span>} />
                            </ListItemButton>
                        </ListItem>


                        <Divider />
                        {userData.length > 0 ?
                            <>
                                <ListItem disablePadding>
                                    <ListItemButton >
                                        <ListItemIcon>
                                            <DraftsIcon />
                                        </ListItemIcon>
                                        <ListItemText onClick={() => handleLogOut()} primary={<span className={classes.menuItemStyle}>Logout</span>} />
                                    </ListItemButton>
                                </ListItem>
                            </>
                            :
                            <>
                                <ListItem disablePadding>
                                    <ListItemButton >
                                        <ListItemIcon>
                                            <DraftsIcon />
                                        </ListItemIcon>
                                        <ListItemText onClick={() => handleChangeButton()} primary={<span className={classes.menuItemStyle}>Sign In</span>} />
                                    </ListItemButton>
                                </ListItem>
                            </>


                        }



                    </List>
                </div>

            </Paper>
        )
    }

    const secondarySearchComponent = () => {
        return (
            <div className=' w-[100%] p-1 static shadow-md'  >
                <div className="main-container bg-[white] max-w-[1800px] flex justify-between items-center mx-auto p-[5px]">
                    <MenuOutlinedIcon onClick={handleDrawer} style={{ color: '#000', fontSize: '30', }} className='cursor-pointer' />

                    <SearchBar />
                    <div className='flex  justify-between gap-[5px] w-[80px] ' >
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', justifyItems: 'center', flexDirection: 'column', cursor: 'pointer', margin: ' 0px auto', }} onClick={() => navigate('/loginscreen')} >
                            <PersonOutlineIcon style={{ color: '#000', fontSize: '30', }} className='cursor-pointer' />
                            <div style={{ width: '100%', fontSize: '10px', color: '#000', fontWeight: 'bolder', textAlign: 'center' }}>{userData}</div>
                        </div>
                        <LocalPhoneIcon style={{ color: '#000', fontSize: '30' }} className='cursor-pointer' />
                    </div>
                </div>


            </div>
        )
    }






    return (
        <div onMouseLeave={hideCartDetails}   >
            <div className=' w-[100%] p-2 static shadow-md' >
                <div className="main-container bg-[white] max-w-[1800px] flex justify-between items-center mx-auto p-[5px]"   >
                    <img src={logo} style={{ width: 170, cursor: 'pointer' }} onClick={() => navigate('/home')} />
                    {!matches ? <SearchBar /> : <div></div>}
                    <div style={{ display: 'flex', width: !matches ? 110 : 35, justifyContent: 'space-between' }} >
                        {!matches &&

                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', cursor: 'pointer' }} onClick={() => navigate('/loginscreen')} >
                                <PersonOutlineIcon style={{ fontSize: 30, color: '#000', cursor: 'pointer' }} />
                                <div style={{ width: '100%', fontSize: '10px', color: '#000', fontWeight: 'bolder', textAlign: 'center' }}>{userData}</div>
                            </div>

                        }
                        <Badge badgeContent={keys.length} color='primary' onClick={() => navigate('/cart')}>
                            <ShoppingCartOutlinedIcon onMouseOver={showCartDetails} style={{ fontSize: 30, color: '#000', cursor: 'pointer' }} />
                        </Badge>

                        {!matches && <LocalPhoneIcon style={{ fontSize: 30, color: '#000', cursor: 'pointer' }} />}
                    </div>
                </div>





            </div>
            <div>
                {matches ? secondarySearchComponent() : <div></div>}
            </div>
            <Drawer
                anchor={'left'}
                open={status}
                onClose={handleClose}
                sx={{
                    width: '65%',
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: '65%',
                    },
                }}
            >
                {drawerList()}
            </Drawer>

            {/* {!matches ? <MenuBar /> : <div></div>} */}
            {isTablet ?
                <></>
                :
                <ShowCartProducts isOpen={isOpen} />

            }
        </div>
    )
}
