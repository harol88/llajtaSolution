
import React from 'react';
import '../App.css';

import { useState } from 'react';
import { BrowserRouter as Router,Link } from 'react-router-dom';
import Header from '../components/MenuNavegacion/header';
import MenuNav from '../components/NavNavegacion/headerNav';
import Footer from '../components/Footer/Footer';


const VentanaInicio =() => {


  return (

<div className="App">
  <Header />
  <MenuNav />
  <Footer /> 
</div>

 );
}

export default VentanaInicio;