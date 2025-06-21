import React, { useContext, useState } from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ThemeContext } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

export const Navbar = () => {
  const { setIsLogIn } = useAuth();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();
  const { isLogIn } = useAuth();
  const { totalQuantity } = useCart();

  const handelLogout = () => {
    const userEmail = localStorage.getItem("userEmail");
    localStorage.removeItem(`cart_${userEmail}`);
    localStorage.removeItem("userEmail");
    localStorage.removeItem("token")
    setIsLogIn(false);
  }

  return (
    <div>
      <nav className='d-flex align-items-center justify-content-around px-5 py-3 border-bottom border-black' >
          
          <div className="left fade-in-up">
              <h1 className='fw-bold'>Loopa</h1>
          </div>
         
          <div className="mid bg-white d-flex gap-4 px-5 py-2 rounded-pill border border-2 border-dark-subtle fade-in-up">
              <Link to="/" className={`ps-5 ${location.pathname === '/' ? 'active' : '' }`} > Home </Link>
              <Link to="/products" className={`px-5 ${location.pathname === '/products' ? 'active' : '' }`} > Products </Link>
              <Link to="/aboutme" className={`pe-5 ${location.pathname === '/aboutme' ? 'active' : '' }`} > About </Link>
          </div>
          
          <div className="nav-mobile dropdown">
            <button className="fw-semibold dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="bi bi-list"></i>
            </button>
            <ul class="dropdown-menu ">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li onClick={toggleTheme} className='p-1 px-3'>
                  {theme === "light" ? (
                    <><i className="bi bi-moon me-1" /> Dark</>
                  ) : (
                    <><i className="bi bi-brightness-high me-1" /> Light</>
                  )}
              </li>

              <li>
                <a class="dropdown-item" target="_blank" rel="noopener noreferrer"  href="https://github.com/Mananpatel08/Loopa-E-commerce">
                  <i className="bi bi-github me-1"/> 
                  GitHub
                </a>
              </li>
            </ul>
          </div>
          
          <div className="right d-flex gap-2 fade-in-up">

              { isLogIn ? (
                <>
                  <div className="dropdown">
                    <button  className='fw-semibold dropdown-toggle' type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                      <i className="bi bi-person-circle me-1" />
                    </button>
                    <ul className="dropdown-menu">
                      <li><Link className="dropdown-item fw-semibold border-0 px-3" href="#">Orders</Link></li>
                      <li><span onClick={handelLogout} className="dropdown-item fw-semibold" href="#">Log-Out</span></li>
                    </ul>
                  </div>
                  <button onClick={()=>navigate('/cart')} className='fw-semibold position-relative me-2'>
                    <i className="bi bi-cart3 me-2" />
                    <span className='cart-text text-black'>Cart</span>
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {totalQuantity}
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  </button>
                </>
              ): (
                <>
                  <button onClick={() => navigate('/login')} className='fw-semibold'>
                    <i className="bi bi-box-arrow-in-right me-2" />
                    Login
                  </button>
                  <button onClick={() => navigate('/signup')} className='fw-semibold'>
                    <i className="bi bi-person-add me-2" />
                    Sign Up
                  </button>
                </>
              )}


              <button onClick={toggleTheme}>
                {theme === "light" ? (
                  <i className="bi bi-moon"></i> // 🌙
                ) : (
                  <i className="bi bi-brightness-high"></i> // ☀️
                )}
              </button>
              
              <Link 
                to="https://github.com/Mananpatel08/Loopa-E-commerce"
                target="_blank" 
                rel="noopener noreferrer" 
                className='git-btn'
              >
                <i className="bi bi-github"/>
              </Link>
            
          </div>

      </nav>
    </div>
  )
}
