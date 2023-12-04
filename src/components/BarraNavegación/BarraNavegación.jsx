import React, { useState } from 'react';
import { Layout, Menu, theme, Input, Button } from 'antd';
import { HomeOutlined, UnorderedListOutlined, SearchOutlined, LoginOutlined } from '@ant-design/icons'; // Importa los íconos necesarios
import { Link, useLocation } from 'react-router-dom';
import Routes from '../../routes/Routes'
import './BarraNavegación.css'
import { Content } from 'antd/es/layout/layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-regular-svg-icons'
import BLogout from './BotonLogout'


//Es el mismo Nav de navegacion, se le quito el submenu de platillos tradicionales
const { Header, Footer } = Layout;
const { SubMenu } = Menu;

const App2 = () => {
  const miToken = localStorage.getItem('token');
  const miEmail = JSON.parse(localStorage.getItem('email'));
  const miUser = JSON.parse(localStorage.getItem('username'));
  const rol = JSON.parse(localStorage.getItem('rol'));
  //console.log("El rol es: ",rol);
  //console.log('tu token en MenuNav: ', miToken);
  const [submenu1Visible, setSubmenu1Visible] = useState(false);
  const [submenu2Visible, setSubmenu2Visible] = useState(false);
  const [isBotonLogin, setisBotonLogin] = useState(true);
  const [isBotonLogout, setisBotonLogout] = useState(false);
  const location = useLocation();

  const handleSearch = (query) => {
    // Lógica de búsqueda, por ejemplo, redirección a una página de resultados
    console.log(`Realizando búsqueda: ${query}`);
  };


  const handleSubmenu1Click = () => {
    setSubmenu1Visible(!submenu1Visible);
    // Asegurarse de que el otro submenu esté cerrado
    setSubmenu2Visible(false);
  };

  const handleSubmenu2Click = () => {
    setSubmenu2Visible(!submenu2Visible);
    // Asegurarse de que el otro submenu esté cerrado
    setSubmenu1Visible(false);
  };

  const mostrarBotonLL = () => {
    //console.log('controlando desde aqui: ', miToken);
    if (miToken != null || miToken != undefined) {
      setisBotonLogout(true);
      setisBotonLogin(false);
    }
    if (isBotonLogout) {
      setisBotonLogout(false);
      setisBotonLogin(true);
    }
  }

  function getEmail() {
    if (miToken != null) {
      return miEmail;
    } else {
      return '';
    }
  }

  return (
    <Layout className="layout">
      <Header div className="header" >

        <Menu theme="none" mode="horizontal" className='menu'>
          <div className='alMedio'>
            <Menu.Item key="Home" className={`${location.pathname === '/' ? 'selected-menu-item' : ''} ${'menu'}`} >
              <div className='alMedio'>
                <Link to="/" className='menu-icon'>
                  <HomeOutlined /> Inicio
                </Link>
              </div>

            </Menu.Item>
          </div>  

          <SubMenu theme='dark' className={`${location.pathname === '/platillos-tradicionales' ? 'selected-menu-item' : ''} ${'menu'}`}


            title={
              ...miToken !== null ?
                (
                  <span>
                    <UnorderedListOutlined /> Platillos Tradicionales
                  </span>
                )
                : null
            }
            onTitleClick={handleSubmenu1Click}
            visible={submenu1Visible}
          >

            {rol === 'administrador' ?
              <Menu.Item key="Registrar Platillo" className={location.pathname === '/registrar-platillo' ? 'selected-menu-item' : ''}>
                <Link to="/registrar-platillo" className={`${'menu-icon'} ${'prueba'}`}>
                  Registrar Platillo
                </Link>
              </Menu.Item> : null
            }

            {rol === 'administrador' ?
              <Menu.Item key="Mostrar Estadisticas" className={location.pathname === '/mostrar-estadisticas' ? 'selected-menu-item' : ''}>
                <Link to="/mostrar-estadisticas" className={`${'menu-icon'} ${'prueba'}`}>
                  Ver Estadísticas
                </Link>
              </Menu.Item> : null
            }

            <Menu.Item key="Mostrar Platillo" className={location.pathname === '/mostrar-platillo/page/1' ? 'selected-menu-item' : ''}>
              <Link to="/mostrar-platillo/page/1" className={`${'menu-icon'} ${'prueba'}`}>
                Mostrar Platillo
              </Link>
            </Menu.Item>

          </SubMenu>

          <SubMenu theme='dark' className={miToken ? 'posicionIconUser' : 'posicionIconUser2'}
            icon={<FontAwesomeIcon icon={faCircleUser} style={{fontSize: 30 }} />}
            onTitleClick={handleSubmenu2Click}
            visible={submenu2Visible}>

            <Menu.Item disabled={true} style={{ textAlign: miUser ? 'left' : 'center' }}>
              <div className={`${'menu-icon'} ${'prueba'}`}>
                <FontAwesomeIcon icon={faCircleUser} style={{ fontSize: 30, alignItems: 'center' }} /> {miUser}
              </div>
            </Menu.Item >
            {miToken ?
              <Menu.Item disabled={true} style={{ textAlign: 'center' }}>
                <div className={`${'menu-icon'} ${'prueba'}`} >
                  {getEmail()}
                </div>
              </Menu.Item> : null
            }

            {miToken ? (
              <Menu.Item disabled={true} onClick={mostrarBotonLL}> <BLogout /> </Menu.Item>
            ) : (
              <Menu.Item disabled={true}>
                <Link to="/iniciar-sesion" >
                  <Button className={`${'menu'}`} style={{ width: '135%', marginLeft: '-20px' }} onClick={mostrarBotonLL} icon={<LoginOutlined />}>Iniciar Sesión</Button>
                </Link>
              </Menu.Item>
            )}
          </SubMenu>

          {location.pathname === '/' && (
            <Menu.Item key="Buscar" className={`${location.pathname === '/buscador' ? 'selected-menu-item' : ''} ${miToken ? 'posicionIconBuscador' : 'posicionIconBuscador2'}`}>
              <Link to="/buscador">
                <Button
                  icon={<SearchOutlined />}
                >
                </Button>
              </Link>
            </Menu.Item>
          )}


        </Menu>
      </Header>
      <Content className='content'>
        <Routes />
      </Content>
    </Layout>

  );
};

export default App2;