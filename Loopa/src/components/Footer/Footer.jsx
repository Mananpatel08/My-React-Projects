import React from 'react'
import { Link, useNavigate } from "react-router-dom";

export const Footer = () => {
  const navigate = useNavigate();
    
  return (
    <footer className="bg-dark text-white pt-5 pb-3">
      <div className="container fade-in-up">
        <div className="row">

          <div className="col-md-3 mb-4">

            <h4 className="fw-bold">Loopa</h4>
            <p>Make your outfit wonderful with Loopa. Explore trending fashion with comfort, elegance, and quality.</p>
          </div>

          <div className="col-md-3 mb-4">
            <h5 className="fw-semibold">Shop</h5>
            <ul className="list-unstyled">
              <li><Link to="/products" className="text-white text-decoration-none">Men</Link></li>
              <li><Link to="/products" className="text-white text-decoration-none">Women</Link></li>
              <li><Link to="/products" className="text-white text-decoration-none">New Arrivals</Link></li>
              <li><Link to="/products" className="text-white text-decoration-none">Sale</Link></li>
            </ul>
          </div>

          <div className="col-md-3 mb-4">
            <h5 className="fw-semibold">About</h5>
            <ul className="list-unstyled">
              <li><Link to="/aboutme" className="text-white text-decoration-none">About Us</Link></li>
              <li><Link to="/aboutme" className="text-white text-decoration-none">Contact</Link></li>
              <li><Link to="/aboutme" className="text-white text-decoration-none">Privacy Policy</Link></li>
              <li><Link to="/aboutme" className="text-white text-decoration-none">Terms & Conditions</Link></li>
            </ul>
          </div>

          <div className="col-md-3 mb-4">
            <h5 className="fw-semibold">Stay Connected</h5>
            <p>Subscribe to our newsletter for latest updates & offers.</p>
            <input type="email" placeholder="Enter your email" className="form-control mb-2" />
            <button className="btn btn-outline-light btn-sm">Subscribe</button>

            <div className="mt-3">
              <a href="#" className="text-white me-3"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-white me-3"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-white"><i className="bi bi-twitter-x"></i></a>
            </div>
          </div>

        </div>

        <hr className="border-secondary" />
        <p className="text-center mb-0">&copy; {new Date().getFullYear()} Loopa. All rights reserved.</p>
      </div>
    </footer>
  )
}
