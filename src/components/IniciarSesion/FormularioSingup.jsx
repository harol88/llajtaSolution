import React, { useState, useEffect } from "react";
import { Modal, Result } from 'antd';
import { Link } from 'react-router-dom';
// Material UI Imports
import {
  TextField, InputAdornment, FormControl,
  InputLabel, IconButton, Button,
  Input, Checkbox, Alert, Stack, Typography
} from "@mui/material";
import './FormularioSingup.css'
// Material UI Icon Imports
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";


export default function Login() {
  const [visible, setVisible] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  //Inputs
  const [usernameInput, setUsernameInput] = useState();
  const [emailInput, setEmailInput] = useState();
  const [passwordInput, setPasswordInput] = useState();
  const [rememberMe, setRememberMe] = useState();

  // Inputs Errors
  const [usernameError, setUsernameError] = useState(false);
  const [usernameErrorSize, setUsernameErrorSize] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [emailErrorGmail, setEmailErrorGmail] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMax, setPasswordErrorMax] = useState(false);
  const [passwordErrorMin, setPasswordErrorMin] = useState(false);
  const [passwordErrorMayusculas, setPasswordErrorMayusculas] = useState(false);
  const [passwordErrorNumero, setPasswordErrorNumero] = useState(false);
  const [passwordErrorCaracter, setPasswordErrorCaracter] = useState(false);


  // Overall Form Validity
  const [formValidUsername, setFormValidUsername] = useState();
  const [formValidEmail, setFormValidEmail] = useState();
  const [formValidPassword, setFormValidPassword] = useState();
  const [formValidPasswordMayusculas, setFormValidPasswordMayusculas] = useState();
  const [formValidPasswordNumero, setFormValidPasswordNumero] = useState();
  const [formValidPasswordCaracter, setFormValidPasswordCaracter] = useState();
  const [formValid, setFormValid] = useState();
  const [success, setSuccess] = useState();

  // Handles Display and Hide Password
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Label for Checkbox
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  //-------------------------------------------------------------------------------------------------


  // Validation for onBlur Username
  const validarUsername = () => {
    // Expresión regular para permitir solo letras, números y guiones bajos
    const caracteresPermitidos = /^[a-zA-Z0-9_]+$/;
    setFormValid("");
    if (!usernameInput) {
      setUsernameError(true);
      setFormValidUsername("- Ingrese un nombre de usuario");
      return;
    }
    if (usernameInput.length < 4 || usernameInput.length > 20) {
      setUsernameErrorSize(true);
      setUsernameError(true);
      setFormValidUsername("- El nombre de usuario debe tener entre 4 y 20 caracteres");
      return;
    }
    if (!caracteresPermitidos.test(usernameInput)) {
      setUsernameError(true);
      setFormValidUsername("- El nombre de usuario solo puede contener letras, números y guiones bajos");
      return;
    }
    setUsernameError(false);
  };

  useEffect(() => {
    if (usernameInput) {
      validarUsername();
    } else {
      setUsernameError(false);
    }
  }, [usernameInput]);

  const isEmailGmail = (email) =>
    /^[A-Z0-9._%+-]+@gmail+\.com$/i.test(email);

  const isEmail = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
  // Validation for onBlur Email
  const validarEmail = () => {
    // console.log(emailInput);
    // console.log(isEmailGmail(emailInput));
    // Email Validation
    if (isEmailGmail(emailInput)) {
      setEmailError(false);
      setFormValidEmail("");
      return;
    }
    if (isEmail(emailInput)) {
      setEmailError(true);
      setFormValidEmail("- El correo electrónico es inválido. Por favor ingrese solo correos con el dominio de @gmail.com ");
      return;
    }
    if (!emailInput) {
      setEmailError(true);
      setFormValidEmail("- Ingrese un correo electrónico");
      return;
    } else {
      setFormValid("");
      setEmailError(true);
      setFormValidEmail("- Formato de correo inválido. Por favor ingrese un correo electrónico válido");
      return;
    }
  }

  useEffect(() => {
    if (emailInput) {
      validarEmail();
    } else {
      setEmailError(false);
    }

  }, [emailInput]);



  const validarPasswordRestricciones = (input) => {
    const tieneMayuscula = /[A-Z]/.test(input);
    const tieneCaracterEspecial = /[-\/:;&@.,?!%*#]/.test(input);
    const tieneNumero = /\d/.test(input);
    setFormValid("");
    // Actualizar estados según las restricciones
    if (!tieneMayuscula) {
      setFormValidPasswordMayusculas("- La contraseña debe incluir al menos 1 letra Mayúscula");
      setPasswordErrorMayusculas(true);
    } else {
      setPasswordErrorMayusculas(false);
    }
    if (!tieneNumero) {
      setFormValidPasswordNumero("- La contraseña debe incluir al menos 1 número");
      setPasswordErrorNumero(true);
    } else {
      setPasswordErrorNumero(false);
    }
    if (!tieneCaracterEspecial) {
      setFormValidPasswordCaracter("- La contraseña debe incluir al menos un caracter: #-/:;&@.,?!%*.");
      setPasswordErrorCaracter(true);
    } else {
      setPasswordErrorCaracter(false);
    }

    // Devolver si cumple con todos los requisitos
    return tieneMayuscula && tieneCaracterEspecial && tieneNumero;
  };

  const validarPasswordTamaño = () => {
    if (passwordInput.length > 16) {
      setPasswordError(true);
      setPasswordErrorMax(true);
      setPasswordErrorMin(false);
      setFormValidPassword("- La contraseña debe ser menor o igual a 16 caracteres.");
      return;
    }
    if (passwordInput.length < 8) {
      setPasswordErrorMax(false);
      setPasswordError(true);
      setPasswordErrorMin(true);
      setFormValidPassword("- La contraseña debe ser mayor o igual a 8 caracteres.");
      return;
    }
    setPasswordErrorMax(false);
    setPasswordError(false);
    setPasswordErrorMin(false);
    setFormValidPassword("")
    return;
  }

  const limpiarMensajesInput = () => {
    setFormValidUsername("");
    setFormValidEmail("");
    setFormValidPassword("");
    setFormValidPasswordCaracter("");
    setFormValidPasswordMayusculas("");
    setFormValidPasswordNumero("");
  }
  //-------------------------------------------------------------------------------------------------
  //handle Submittion
  const handleSubmit = () => {
    // console.log('EMAIL ERROR:    ', emailError)
    // console.log('Input email: ', emailInput)
    // console.log('PASSWORD ERROR:      ', passwordError)
    // console.log('Impurt password: ', passwordInput)

    setSuccess(null);
    //First of all Check for Errors


    // Si existe campos vacios
    if (!emailInput && !passwordInput && !usernameInput) {
      setUsernameError(true);
      setPasswordError(true);
      setEmailError(true);
      limpiarMensajesInput();
      setFormValid("Campos obligatorios. Por favor ingresa un nombre de usuario, correo electrónico y contraseña");
      return;
    }

    //Casos con username: ----------------------------------------------------------------
    if (usernameInput && !emailInput && !passwordInput) {
      limpiarMensajesInput();
      if (usernameError) {
        setEmailError(true);
        setPasswordError(true);
        setFormValid("Por favor, verifique el nombre usuario e ingrese un correo electrónico y contraseña");
        return;
      }
      setEmailError(true);
      setPasswordError(true);
      setFormValid("Por favor, ingrese un correo electrónico y contraseña");
      return;
    }

    if (usernameInput && emailInput && !passwordInput) {
      limpiarMensajesInput();
      setPasswordError(true);
      if (usernameError && emailError) {
        setFormValid("Por favor, verifique los campos e ingrese una contraseña");
        return;
      }
      if (usernameError && !emailError) {
        setFormValid("Por favor, verifique el nombre de usuario e ingrese una contraseña");
        return;
      }
      if (!usernameError && emailError) {
        setFormValid("Por favor, verifique el correo electrónico e ingrese una contraseña");
        return;
      }
      setFormValid("Por favor, ingrese una contraseña");
      return;
    }

    if (usernameInput && !emailInput && passwordInput) {
      limpiarMensajesInput();
      setEmailError(true);
      if (usernameError && passwordError) {
        setFormValid("Por favor, verifique los campos e ingrese un correo electrónico");
        return;
      }
      if (usernameError && !passwordError) {
        setFormValid("Por favor, verifique el nombre de usuario e ingrese un correo electrónico");
        return;
      }
      if (!usernameError && passwordError) {
        setFormValid("Por favor, ingrese un correo electrónico y verifique la contraseña");
        return;
      }
      setFormValid("Por favor, ingrese un correo electrónico");
      return;
    }

    //Casos con email: ----------------------------------------------------------------
    if (!usernameInput && emailInput && !passwordInput) {
      limpiarMensajesInput();
      if (emailError) {
        setUsernameError(true);
        setPasswordError(true);
        setFormValid("Por favor, verifique el correo electrónico e ingrese un nombre de usuario y contraseña");
        return;
      }
      setUsernameError(true);
      setPasswordError(true);
      setFormValid("Por favor, ingrese un nombre de usuario y contraseña");
      return;
    }

    if (!usernameInput && emailInput && passwordInput) {
      limpiarMensajesInput();
      setUsernameError(true);
      if (emailError && passwordError) {
        setFormValid("Por favor, ingrese un nombre de usuario y verifique los campos");
        return;
      }
      if (emailError && !passwordError) {
        setFormValid("Por favor, ingrese un nombre de usuario y verifique el correo electrónico");
        return;
      }
      if (!emailError && passwordError) {
        setFormValid("Por favor, ingrese un nombre de usuario y verifique la contraseña");
        return;
      }
      setFormValid("Por favor, ingrese un nombre de usuario");
      return;
    }

    //Casos con password: ----------------------------------------------------------------
    if (!usernameInput && !emailInput && passwordInput) {
      limpiarMensajesInput();
      if (passwordError) {
        setUsernameError(true);
        setEmailError(true);
        setFormValid("Por favor, verifique la contraseña e ingrese un nombre de usuario y un correo electrónico");
        return;
      }
      setUsernameError(true);
      setPasswordError(true);
      setFormValid("Por favor, ingrese un nombre de usuario y correo electrónico");
      return;
    }

    if (usernameInput && emailInput && passwordInput) {
      limpiarMensajesInput();
      if (usernameError && emailError && passwordError) {
        setFormValid("Por favor, verifica todos los campos")
        return;
      }
      if (usernameError && emailError && !passwordError) {
        setFormValid("Por favor, verifica el nombre de usuario y correo electrónico")
        return;
      }
      if (usernameError && !emailError && passwordError) {
        setFormValid("Por favor, verifica el nombre de usuario y contraseña")
        return;
      }
      if (!usernameError && emailError && passwordError) {
        setFormValid("Por favor, verifica el correo electrónico y contraseña")
        return;
      }
      if (usernameError && !emailError && !passwordError) {
        setFormValid("Por favor, verifica el nombre de usuario")
        return;
      }
      if (!usernameError && emailError && !passwordError) {
        setFormValid("Por favor, verifica el correo electrónico")
        return;
      }
      if (!usernameError && !emailError && passwordError) {
        setFormValid("Por favor, verifica la contraseña")
        return;
      }
    }
    setFormValid(null);
    const esEmailDuplicado = JSON.parse(localStorage.getItem('emailDuplicado'));
    const usernameDuplicado = JSON.parse(localStorage.getItem('usernameDuplicado'));
    //console.log(esEmailDuplicado);
    // Show Successfull Submittion

    if (esEmailDuplicado) {
      limpiarMensajesInput();
      setEmailError(true);
      setFormValid("El correo electrónico ya está registrado. Por favor ingrese otro");
      return;
    }
    if (usernameDuplicado) {
      setUsernameError(true);
      limpiarMensajesInput();
      setFormValid("El nombre de usuario ya está registrado. Por favor, elige otro.");
      return;
    } else {
      localStorage.setItem('emailSave', JSON.stringify(emailInput));
      showConfirmationModal();
      setSuccess("Inicio de sesión realizado exitosamente");

    }
  };
  //-------------------------------------------------------------------------------------------------

  //ENVIAR FORMULARIO 
  const handleLogin = async () => {
    const url = 'http://18.116.106.247:3000/registro';
    const datos = new FormData();
    datos.append("usuario", usernameInput);
    datos.append("correo", emailInput);
    datos.append("contrasenia", passwordInput);
    const credentials = {
      username: datos.get("usuario"),
      email: datos.get("correo"),
      password: datos.get("contrasenia"),
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      if (response.ok) {
        // El registro fue exitoso
        console.log('Usuario registrado correctamente:', data.message);
      } else if (data.message.includes("username ya es")) {
        // Hubo un error en el registro
        // console.log('userrrrrrrrrrrrrrrrrrrr')
        localStorage.setItem('usernameDuplicado', true);
        console.error('Error al registrar usuario:', data.message);
      } else {
        localStorage.setItem('emailDuplicado', true);
        console.error('Error al registrar usuario:', data.message);
      }

    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const submitYsingup = () => {
    localStorage.setItem('usernameDuplicado', false);
    localStorage.setItem('emailDuplicado', false);
    //console.log('esta contra: ', passwordInput)

    if (loginExitoso()) {
      try {
        handleLogin()
          .then(() => {
            // La función handleSubmit se ejecutará solo después de que handleLogin se haya completado
            handleSubmit();
            if (rememberMe) {
              localStorage.setItem('emailSave', JSON.stringify(emailInput));
            }
          })
          .catch(error => {
            // Manejar errores si es necesario
            console.error('Error al manejar el inicio de sesión:', error);
          });
      } catch (error) {
        console.error('Error en submitYlogin:', error);
      }
    } else {
      handleSubmit();
    }
  };

  const loginExitoso = () => {
    return !emailError && !passwordError && !passwordErrorMayusculas && !passwordErrorNumero
      && !passwordErrorCaracter && !passwordErrorMax && !passwordErrorMin && usernameInput && emailInput && passwordInput;
  };

  //Recordar datos
  const handleCheckboxChange = (event) => {
    setRememberMe(event.target.checked);

    // Guardar información cuando el checkbox está marcado
    if (event.target.checked) {
      localStorage.setItem('recordar', 'si');
    } else {
      localStorage.setItem('recordar', 'no');
    }
  };

  const showConfirmationModal = () => {
    showModal();
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
    window.location.reload();
    //
  }

  const validarPassword = () => {
    //console.log(passwordInput);
    if (passwordInput) {
      //  setFormValidPassword("La contraseña debe ser mayor o igual a 8 caracteres.");
      validarPasswordTamaño();
      // validarPasswordTamañoMensajes();
      validarPasswordRestricciones(passwordInput);
    } else {
      setFormValidPassword("Ingrese una contraseña");
      setPasswordErrorMayusculas(false);
      setPasswordErrorNumero(false);
      setPasswordErrorCaracter(false);
    }
  };

  useEffect(() => {
    if (passwordInput) {
      validarPassword();
      setPasswordError(!passwordInput || passwordInput.length < 8 || passwordInput.length > 16);
      if (passwordErrorCaracter || passwordErrorMayusculas || passwordErrorNumero) {
        setPasswordError(true);
      }
    } else {
      setPasswordError(false);
      setPasswordErrorCaracter(false);
      setPasswordErrorMayusculas(false);
      setPasswordErrorNumero(false);
    }
  }, [passwordInput, passwordErrorMayusculas, passwordErrorNumero, passwordErrorCaracter]);

  const pressEnter = (event) => {
    // Verifica si la tecla presionada es 'Enter'
    if (event.key === 'Enter') {
      submitYsingup();
      //console.log('Se presionó Enter');
    }
  };

  return (
    <>
      <div>
        <div style={{ marginTop: "5px" }}>
          <TextField
            error={usernameError}
            label="Nombre de usuario"
            id="standard-basic"
            variant="standard"
            sx={{ width: "100%" }}
            size="small"
            value={usernameInput}
            InputProps={{}}
            onChange={(event) => {
              setUsernameInput(event.target.value.trim());
              validarUsername();
            }}
            onKeyDown={pressEnter}
          />
          {usernameError && (
            <Typography variant="caption" color="error" style={{fontSize:"0.8em", marginTop: "5px" }}>
              {formValidUsername}
            </Typography>
          )}
        </div>

        <div style={{ marginTop: "5px" }}>
          <TextField
            label="Correo electrónico"
            fullWidth
            error={emailError}
            id="standard-basic"
            variant="standard"
            //sx={{ width: "100%" }}
            value={emailInput}
            size="small"
            onChange={(event) => {
              setEmailInput(event.target.value);
              validarEmail();
            }}
            onKeyDown={pressEnter}
          />
          {emailError && (
            <Typography variant="caption" color="error" style={{ fontSize:"0.8em", marginTop: "5px" }}>
              {formValidEmail}
            </Typography>
          )}
        </div>

        <div style={{ marginTop: "5px" }}>
          <FormControl sx={{ width: "100%" }} variant="standard">
            <InputLabel
              error={passwordError}
              htmlFor="standard-adornment-password"
            >
              Contraseña
            </InputLabel>
            <Input
              error={passwordError}
              value={passwordInput}
              id="standard-adornment-password"
              type={showPassword ? "text" : "password"}
              onChange={(event) => {
                setPasswordInput(event.target.value.trim());
                validarPassword();
              }}
              onKeyDown={pressEnter}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <>
              {passwordError && (
                <Typography variant="caption" color="error" style={{ fontSize:"0.8em", marginTop: "5px" }}>
                  {formValidPassword}
                </Typography>
              )}
              {passwordErrorMayusculas && (
                <Typography variant="caption" color="error" style={{ fontSize:"0.8em", marginTop: "5px" }}>
                  {formValidPasswordMayusculas}
                </Typography>
              )}
              {passwordErrorNumero && (
                <Typography variant="caption" color="error" style={{ fontSize:"0.8em", marginTop: "5px" }}>
                  {formValidPasswordNumero}
                </Typography>
              )}
              {passwordErrorCaracter && (
                <Typography variant="caption" color="error" style={{ fontSize:"0.8em", marginTop: "5px" }}>
                  {formValidPasswordCaracter}
                </Typography>
              )}
            </>
          </FormControl>
        </div>


        <div style={{ fontSize: "15px" }}>
          <Checkbox
            {...label}
            size="small"
            onChange={handleCheckboxChange}
          />
          Recordar
        </div>


        <div style={{ marginTop: "10px" }}>
          <Button
            variant="contained"
            fullWidth
            startIcon={<LoginIcon />}
            onClick={submitYsingup}
            style={{ textTransform: 'capitalize', backgroundColor: "#66072c" }}
          >
            Registrarse
          </Button>
        </div>
      </div>
      {/* Show Form Error if any */}
      <div>
        {formValid && (
          <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
            <Alert severity="error" style={{fontSize:"1em"}}>
              {formValid}
            </Alert>
          </Stack>
        )}

        {/* Show Success if no issues */}
        {success && (
          <Modal
            visible={visible}
            closable={false}
            onOk={handleOk}
            onCancel={handleOk}
            width={400}
            style={{ top: '50%', transform: 'translateY(-50%)' }} // Centra verticalmente
            footer={[
              <Link to='/iniciar-sesion' key="ok">
                <Button type="primary" onClick={handleOk}>
                  OK
                </Button>
              </Link>
            ]}
          >
            <Result
              status="success"
              title={<div style={{ fontSize: '20px' }}>Usuario registrado correctamente</div>}
            />
          </Modal>
        )}
      </div>
    </>
  );
}