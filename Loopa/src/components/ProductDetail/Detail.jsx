import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader } from '../Loader/Loader';
import { productServices } from '../../services/productServices';
import { useCart } from '../../context/CartContext'; 
import { useAuth } from '../../context/AuthContext';

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLogIn } = useAuth();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState();

  const getProduct = async () => {
    try {
      const res = await productServices.productDetail(id);
      setProduct(res);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    if (!isLogIn) {
      navigate("/login");
      return;
    }
    addToCart(product);
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  useEffect(() => {
    if (product && product.images.length > 0) {
      setActiveImage(product.images[0]);
    }
  }, [product]);

  if (loading) return <Loader />;

  return (
    <div className='w-100 my-5 py-5 d-flex justify-content-center align-items-center'>
      <div className="product-card w-75 d-flex flex-column border border-black border-1 rounded-4 p-5">
        
        <button className='back-btn rounded-pill' onClick={() => window.history.back()}>
          <i className="bi bi-chevron-left me-2" />
          Back
        </button>
        
        <div className="prodcut-containter-detatil d-flex gap-4">

          <div className='row-img d-flex flex-column gap-3'>
            {product.images.slice(0, 3).map((img, index) => (
              <img  
                className={`rounded-4 ${activeImage === img ? '' : ''}`} 
                key={index} 
                src={img} 
                alt={`${product.title} ${index + 1}`} 
                width="100"
                style={{ cursor: 'pointer', opacity: activeImage === img ? 1 : 0.6 }} 
                onClick={() => setActiveImage(img)}  
              />
            ))}
          </div>

          <div className="d-flex gap-5 w-100">
            <div>
              {activeImage && (
                <img 
                  className='rounded-4' 
                  src={activeImage} 
                  alt={product.title} 
                  width="300" 
                />
              )}
            </div>
            <div className='d-flex flex-column gap-3 w-100'>
              <h2 className='fw-semibold'>{product.title}</h2>
              <p className='category bg-body-secondary rounded-pill'>{product.category.name}</p>
              <p className='product-description'>{product.description}</p>
              <div className='d-flex justify-content-between align-items-end'>
                <div>
                  <span>Price</span><br />
                  <h6 className='fw-bold fs-5'>$ {product.price}</h6>
                </div>
                <button 
                  className='add-cart-btn' 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                >
                  <i className="bi bi-cart-plus me-2" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Detail;
