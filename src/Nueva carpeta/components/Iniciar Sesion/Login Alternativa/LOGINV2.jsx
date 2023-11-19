import React from 'react';

import { useState } from "react";

import Chip from "@mui/material/Chip";
import FaceIcon from "@mui/icons-material/Face";
import Paper from "@mui/material/Paper";
import LockIcon from "@mui/icons-material/Lock";
import { Box } from '@mui/material';
import Switch from "@mui/material/Switch";

import Login from "./LoginV";
import Signup from "./SignUpV";
import './LoginV2.css'


function vistaLogin() {
  const [checked, setChecked] = useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div className='contenedor-Div'>
    <div  >
        <Paper elevation={3} style={{backgroundColor:"#FBDCC4", boxShadow:"0px 4px 8px 0px rgba(0, 0, 0, 0.6)"}} className='contenedorLogin' >
        <div align="center">
        <div>
        <img class="imgA" src="/src/assets/logo.png" alt="logo" />
        </div>
          <h3>Rescantando Sabores</h3>
          
          {checked ? (
            <Chip
              className='DivIniSesion'
              icon={<LockIcon style={{color:"#b07961"}}/>}
              label="Iniciar sesión"
              variant="outlined"
              color="info"
              style={{ color: '#b07961', borderColor:"#b07961" }}
            />
          ) : (
            <Chip
              className='DivIniSesion'
              icon={<FaceIcon style={{color:"#b07961"}} /> }
              label="Registrarse"
              variant="outlined"
              color="info"
              style={{ color: '#b07961', borderColor:"#b07961" }}
            />
          )}
          <br />
          <Box
          sx={{
            '& .MuiSwitch-switchBase.Mui-checked': {
              color: '#b07961',
            },
            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
              backgroundColor: '#b07961',
            },
          }}
          >
          <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
          </Box>
        </div>

        {checked ? <Login /> : <Signup />}
      </Paper>
      </div>
      </div>
  );
}

export default vistaLogin;



