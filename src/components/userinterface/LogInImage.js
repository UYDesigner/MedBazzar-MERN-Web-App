import { Grid } from "@mui/material"
import { serverURL } from "../../services/FetchNodeServices"
import React from "react"



export default function LogInImage(){
    return(
        <Grid container spacing={2} style={{}}  >

            <Grid item xs={12}>
                <div>
                    <img src={`${serverURL}/images/Medlog.png`} width={800} />
                </div>
            </Grid>

        </Grid>
    )
}