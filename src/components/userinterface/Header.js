import React from 'react'
import { AppBar, Box, Toolbar, Typography, Button, IconButton } from "@mui/material";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import logo from '../../assets/logo.png'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import SearchBar from './SearchBar';



export default function Header() {
    return (
        <Box sx={{ flexGrow: 1 }} >
            <AppBar style={{ background: '#fff' }} position="static" >
                <Toolbar className='flex items-center justify-between '>
                    <img src={logo} style={{ width: 180 }} />
                    <SearchBar />
                    <div className='flex w-[120px]  justify-between ' >
                        <PersonOutlineIcon style={{ color: '#000', fontSize: '30' }} className='cursor' />
                        <ShoppingCartOutlinedIcon style={{ color: '#000', fontSize: '30' }} />
                        <LocalPhoneIcon style={{ color: '#000', fontSize: '30' }} />
                    </div>
                </Toolbar>
            </AppBar>

        </Box>
    )
}
