import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { postData } from '../../services/FetchNodeServices';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Copyright(props) {

    


    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://medbazzar.in/">
                MedBazzar
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function AdminLogin() {
    var navigate = useNavigate();
    const [emailid, setemailid] = useState('ny@gmail.com');
    const [password, setPassword] = useState('12345');
    const [error, setError] = useState({

    })

    const handleError = (label, msg) => {

        setError((pre) => ({ ...pre, [label]: msg }))


    }



    const handleClick = async () => {

        console.log(emailid, password)

        var submit = true;

        if(emailid.length==0)
        {
            handleError('emailid' , 'Please Fill Email Address...')

            submit = false;
        }

        if(password.length==0)
        {
            handleError('password' , 'Please Fill Password...')

            submit = false;
        }

        // const handleClickLogOut = () => {
        //     localStorage.removeItem("admin");
        //     localStorage.clear();
        //     navigate("/login");
        //   };

        if (submit) {
            var result = await postData('admin/check_admin_login', { emailid, password })

            console.log(result);

            if (result.status) {


                localStorage.setItem('ADMIN', JSON.stringify(result.data))

                {navigate('/admindashboard')}
            }
            else {
                Swal.fire({
                    title: result.message,
                    timer: 500,
                    icon: "error"
                });
            }

        }
    }


    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            type='email'
value={emailid}
                            error={error.emailid} helperText={error.emailid} onFocus={() => handleError('emailid', '')}
                            onChange={(e) => setemailid(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            value={password}
                            id="password"
                            autoComplete="current-password"
                            error={error.password} helperText={error.password} onFocus={() => handleError('password', '')}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <Button

                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleClick}
                        >
                            Sign In
                        </Button>

                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}