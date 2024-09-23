import { React, useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Button } from '@mui/material';


export default function PlusMinusComponent(props) {

    const [value, setValue] = useState(props.qty)

    useEffect(function(){
        setValue(props.qty)
    }, [props.qty, value])

    const handleAdd = () => {
        setValue(value + 1)
        // alert(value +1)
        var v = value;
        v = v + 1;
        props.onChange(v)
    }

    const handleRemove = () => {
        if (value > 0) {
        setValue(value - 1)
        var v = value;
        v = v - 1;
        props.onChange(v)
        }

    }

    return (

        <div className="btn flex max-w-[300px] ">
            {value == 0 ?
                <Button
                    variant='contained'
                    className='w-full'
                    style={{ background: '#01826d', fontSize: '16px', fontWeight: '600', width: '100%', padding: ' 5px 8px', borderRadius: '5px' }}
                    onClick={() => handleAdd()}

                >
                    ADD
                </Button>
                :
                <div style={{ boxShadow: 'rgba(0, 0, 0, 0.1) -4px 9px 25px -6px' }} className="btn-in bg-[#042705] w-[100%] flex items-center justify-between py-[5px] px-[8px] rounded-[5px] " >
                    <RemoveIcon style={{ color: 'white', fontSize: '18px', cursor: 'pointer' }} onClick={() => handleRemove()} />
                    <div className="qty" style={{ color: 'white', fontSize: '18px' }}>
                        {value}
                    </div>
                    <AddIcon style={{ color: 'white', fontSize: '18px', cursor: 'pointer' }}
                        onClick={() => handleAdd()}
                    />
                </div>
            }

        </div>
    )
}

