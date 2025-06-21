import 'bootstrap/dist/css/bootstrap.min.css';                  //<----- Bootstrap css
import 'bootstrap-icons/font/bootstrap-icons.css';             //<----- Bootstrap icon
import 'bootstrap/dist/js/bootstrap.bundle.min.js';           //<----- Bootstrap js
import './assets/css/index.scss'                             //<----- Global css
import './assets/css/animation.scss'                        //<----- Animation css
import './assets/css/darkmode.scss'                        //<----- Darkmode css
import './assets/css/media.scss'                        //<----- Media css

// =============React-Tools======================== //
import { useState } from 'react'
import { BrowserRouter, Form, Route, Routes } from "react-router-dom";

// =============React-App========================= //
import { AbouteMe, Home, Login, Products, SignUp, } from './components/index';
import { Layout } from './components/Layout';
import { AddProduct } from './components/AddProduct';
import Detail from './components/ProductDetail/Detail';
import UserCart from './components/UserCart/UserCart';


function App() {

  return (
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/aboutme' element={<AbouteMe />} />
          <Route path='/product/:id' element={<Detail />} />
          <Route path='/cart' element={<UserCart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/add' element={<AddProduct />} />
        </Route>
      </Routes>
  );
}

export default App
