import React, { useState } from 'react';

const ModalLogin = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Lógica de autenticación aquí
    // En este ejemplo, simplemente mostramos los datos ingresados
    console.log('Usuario:', username);
    console.log('Contraseña:', password);

    // Cierra el modal después de iniciar sesión
    onClose();
  };

  return (
    <div style={{ display: isOpen ? 'block' : 'none' }}>
      <div>
        <span onClick={onClose}>&times;</span>
        <h2>Iniciar Sesión</h2>
        <button onClick={onClose}>Cerrar Modal</button>
      </div>
    </div>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  background: 'white',
  padding: '20px',
  textAlign: 'center',
  border: '1px solid #ccc',
  borderRadius: '5px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
};

const closeStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  fontSize: '20px',
  cursor: 'pointer',
};

export default ModalLogin;
