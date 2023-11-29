import React, { useState } from 'react';
import { Modal, Button, Result } from 'antd';
import { Link } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons';
import './BarraNavegación.css'

const ButtonLogout = () => {
  const [visible, setVisible] = useState(false);

  const removeToken = () => {
    const token = localStorage.getItem('token');
    //console.log("Antes de eliminar:", localStorage.getItem("token"), localStorage.getItem("email"));
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('rol ');
    localStorage.removeItem('email');
    const recordar = localStorage.getItem('recordar');
    if (recordar == 'no') {
      localStorage.removeItem('email');
    }
    console.log("Después de eliminar:", localStorage.getItem("token"), localStorage.getItem("email"));
  };

  const showConfirmationModal = () => {

    Modal.confirm({
      title: '¿Estás seguro que quieres cerrar sesión?',
      okText: 'Salir',
      cancelText: 'Cancelar',

      onOk() {
        showModal();
        removeToken();
      },
      onCancel() {

      },
    });
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
    if (location.pathname === '/') {
      window.location.reload();
    }
    //
  }

  return (
    <div className='center'> 
      <Button className={`${'menu'}`}  onClick={showConfirmationModal}><LogoutOutlined />Cerrar Sesión</Button>
      <Modal
        visible={visible}
        closable={false}
        onOk={handleOk}
        onCancel={handleOk}
        footer={[
          <Link to='/' key="link">
            <Button key="ok" type="primary" onClick={handleOk}>
              OK
            </Button>
          </Link>,
        ]}
        style={{ textAlign: 'center' }}
        bodyStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Result
          icon={<LogoutOutlined style={{ fontSize: '50px', color: '#52c41a' }} />}
          title="Cierre de Sesión Exitoso"
          subTitle="Has cerrado sesión correctamente. ¡Hasta luego!"
        />
      </Modal>
    </div>
  );
};
export default ButtonLogout;
