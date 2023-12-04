import React from 'react';
import { useLocation } from 'react-router-dom';
import '../App.css';
import Header from '../components/Header/Header';
import MenuNav from '../components/BarraNavegación/BarraNavegación';
import Footer from '../components/Footer/Footer';

const VentanaInicio = () => {
  const location = useLocation();

  // Verificar si la ruta actual es "/iniciar-sesion"
  const isLoginPage = location.pathname === '/iniciar-sesion' || location.pathname === '/recuperar' || location.pathname === '/recuperarContra';

  return (
    <div className="App">
      {/* Renderizar el Header solo si no estamos en la página de inicio de sesión */}
      {!isLoginPage && <Header />}
      <MenuNav />
      <Footer />
      {/* Renderizar el Footer solo si no estamos en la página de inicio de sesión */}
    </div>
  );
}

export default VentanaInicio;
