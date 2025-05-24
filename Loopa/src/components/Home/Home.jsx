import React from 'react'
import { Link, useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className='home-container my-5'>
      
      <section className="home-slogan  d-flex flex-column justify-content-center align-items-center zoom-out">
        <h1 className='home-text pt-4 fw-bold'>
          Make your Outfit <span>wonderful</span>
        </h1>
        <p className='m-0 text-body-tertiary fs-5 text-center'>
          Loopa brings fashion to life. Discover high-quality, comfortable, and stylish clothing for every occasion. <br />
          Designed to inspire confidence and self-expression, our collections are crafted with care and delivered with passion.
        </p>
        <div className='home-buttons d-flex gap-3 mt-4'>
          <button onClick={()=>navigate("/products")}>Start Shopping</button>
          <button onClick={()=>navigate("/aboutme")}>Learn more</button>
        </div>
      </section>

      <section className="hero fade-in-up">
        <h2>Welcome to Loopa</h2>
        <p>Discover quality products, fast delivery, and a smooth shopping experience – all in one place.</p>
        <Link to='/products' className="shop-btn">Shop Now</Link>
      </section>

      <section className='features-container'>
        <h1 className='text-center fw-bold mt-5 mb-3 zoom-out' >We Provide</h1>
        <p className='text-center text-body-tertiary'>
          <span>Fast and reliable delivery, premium quality products, and hassle-free returns — all in one seamless shopping experience.</span><br />
          <span>Shop with confidence and enjoy top-notch service from click to doorstep.</span>
        </p>
        <div className="features">
          <div className="feature-box zoom-out">
            <i className="bi bi-truck fs-1 text-primary"></i>
            <h3>Fast Delivery</h3>
            <p>We deliver your orders quickly and safely to your doorstep.</p>
          </div>
          <div className="feature-box zoom-out">
            <i className="bi bi-patch-check fs-1 text-primary"></i>
            <h3>Quality Products</h3>
            <p>Only the best and most reliable items make it into our store.</p>
          </div>
          <div className="feature-box zoom-out">
            <i className="bi bi-arrow-repeat fs-1 text-primary"></i> 
            <h3>Easy Returns</h3>
            <p>Not satisfied? We offer simple and hassle-free returns.</p>
          </div>
        </div>
      </section>
    
    </div>
  )
}
