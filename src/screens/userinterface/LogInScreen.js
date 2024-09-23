import LogInImage from "../../components/userinterface/LogInImage";
import LogInOTP from "../../components/userinterface/LogInOTP"
// import LogInDetails from "../../components/userinterface/LogInDetails";
// import GetOTP from "../../components/userinterface/GetOTP";
import React from "react";
import { Grid } from "@mui/material";
import { useTheme } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import Headers from "../../components/userinterface/Headers";

export default function LogInScreen() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div>
      <Headers/>
    <Grid container spacing={2}>
      
      <Grid item xs={12} style={{display: "flex",justifyContent: "center",alignItems: "center", width:"100vw", height:'100vh' }}>
        <Grid md={6} item>
          {!matches ? (
            <div>
              <LogInImage />
            </div>
          ) : (
            <div></div>
          )}
        </Grid>

        <Grid item xs={12} md={4} style={{ marginRight: 10, display: "flex", justifyContent: "center" }}>
          <LogInOTP />
        </Grid>
      </Grid>
    </Grid>
    </div>
  );
}
