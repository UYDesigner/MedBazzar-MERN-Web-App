import Drawer from '@mui/material/Drawer';
import { Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, TextField } from '@mui/material';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { postData } from '../../services/FetchNodeServices';
import Swal from 'sweetalert2';

export default function AddAddress(props) {

    const [addressOne, setAddressOne] = useState('')
    const [addressTwo, setAddressTwo] = useState('')
    const [landmark, setlandmark] = useState('')
    const [pincode, setPincode] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')

    const [error, setError] = useState({

    })

    const handleError = (label, msg) => {

        setError((pre) => ({ ...pre, [label]: msg }))


    }


    // alert(props.userData.mobileno);
    const handleClose = () => {
        // alert('hi')
        props.setStatus(false);
        // props.setPageRefresh(!props.pageRefresh)
    }

    // function capitalizeFirstLetter(name) {
    //     return name.charAt(0).toUpperCase() + name.slice(1);
    // }

    var item = Object.values(props.userAddress);

    const handleSubmit = async () => {

        var submit = true;

        if (addressOne.length === 0) {
            handleError('addressOne', 'Please fill...');
            submit = false;
        }

        if (addressTwo.length === 0) {
            handleError('addressTwo', 'Please fill...');
            submit = false;
        }

        if (state.length === 0) {
            handleError('state', 'Please fill state...');
            submit = false;
        }
        if (city.length === 0) {
            handleError('city', 'Please fill city...');
            submit = false;
        }

        if (landmark.length === 0) {
            handleError('landmark', 'Please fill landmark...');
            submit = false;
        }

        if (pincode.length === 0) {
            handleError('pincode', 'Please fill pincode...');
            submit = false;
        }




        if (submit) {
            var body = { mobileno: props?.userData?.mobileno, address: addressOne + ", " + addressTwo, state: state, city: city, pincode: pincode, landmark: landmark };
            //    alert(JSON.stringify(body));

            var result = await postData('users/submit_user_address', body);
            //    alert(result.message);
            //    alert(result.status)
            if (result.status === 'true') { // Correcting the typo here
                Swal.fire({
                    position: "top-right",
                    title: result.message,
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                    toast: true
                });

                props.setStatus(false)
                props.setPageRefresh(!props.pageRefresh)

            }
        }
    }

    const handleUpdate = async () => {






        
            var body = { mobileno: props?.userData?.mobileno, address: addressOne + ";" + addressTwo, state: state, city: city, pincode: pincode, landmark: landmark };
            //    alert(JSON.stringify(body));

            var result = await postData('users/update_user_address', body);
            //    alert(result.message);
            //    alert(result.status)
            if (result.status === 'true') { // Correcting the typo here
                Swal.fire({
                    position: "top-right",
                    title: result.message,
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                    toast: true
                });

                props.setStatus(!props.status)
                props.setPageRefresh(!props.pageRefresh)

        }
    }

    const drawerList = () => {
        return (<div>
            <span style={{ display: 'flex', marginLeft: 6, fontSize: 22, fontWeight: 'bold', fontFamily: 'Kanit', marginTop: 20 }}>Add Address <div style={{ marginLeft: '60%', cursor: 'pointer' }} onClick={handleClose}><CloseIcon /></div></span>

            <div style={{ fontFamily: 'Kanit', fontSize: '1em', color: 'grey', marginLeft: 6, display: 'flex', marginTop: 12 }}><span><b>{props.userData?.username}</b></span>, Enter your Address details</div>
            <div>
                <List style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', textAlign: 'center' }}>
                    <ListItem >
                        <ListItemText>
                            <TextField label="Address Line One" variant="standard" style={{ width: '90%' }} onChange={(e) => setAddressOne(e.target.value)} error={error.addressOne} helperText={error.addressOne} onFocus={() => handleError('addressOne', '')} id='addressOne' />

                        </ListItemText>
                    </ListItem>
                    <ListItem >
                        <ListItemText>
                            <TextField label="Address Line Two" variant="standard" style={{ width: '90%' }} onChange={(e) => setAddressTwo(e.target.value)}
                            error={error.addressTwo} helperText={error.addressTwo} onFocus={() => handleError('addressTwo', '')} id='addressTwo'
                            />

                        </ListItemText>
                    </ListItem>
                    <ListItem >
                        <ListItemText><TextField label="Landmark" variant="standard" style={{ width: '90%' }} onChange={(e) => setlandmark(e.target.value)}
                        
                        error={error.landmark} helperText={error.landmark} onFocus={() => handleError('landmark', '')} id='landmark'

                        /></ListItemText>
                    </ListItem>

                    <ListItem >
                        <ListItemText><TextField label="Pincode" variant="standard" style={{ width: '90%' }} onChange={(e) => setPincode(e.target.value)}
                        error={error.pincode} helperText={error.pincode} onFocus={() => handleError('pincode', '')} id='pincode'

                        /></ListItemText>
                    </ListItem>

                    <ListItem >
                        <ListItemText>
                            <TextField label="State" variant="standard" style={{ width: '41%', marginRight: '5%' }} onChange={(e) => setState(e.target.value)}
                            error={error.state} helperText={error.state} onFocus={() => handleError('state', '')} id='state'
                            />
                            <TextField label="City" variant="standard" style={{ width: '45%' }} onChange={(e) => setCity(e.target.value)}
                            error={error.city} helperText={error.city} onFocus={() => handleError('city', '')} id='city'
                            
                            />
                        </ListItemText>
                    </ListItem>



                    <ListItem >

                        <ListItemText>
                            {item.length == 0 ?
                                <Button variant="contained" style={{ fontSize: 12, background: '#006266', marginTop: 10, borderRadius: 20, width: '90%' }} onClick={handleSubmit}>Save & Proceed</Button> :
                                <Button variant="contained" style={{ fontSize: 12, background: '#006266', marginTop: 10, borderRadius: 20, width: '90%' }} onClick={handleUpdate}>update</Button>
                            }
                        </ListItemText>
                    </ListItem>

                </List>
            </div>
        </div>)
    }

    return (<div >
        <Drawer
            anchor={'right'}
            open={props.status}
            onClose={handleClose}

        >
            {drawerList()}
        </Drawer>
    </div>)
}