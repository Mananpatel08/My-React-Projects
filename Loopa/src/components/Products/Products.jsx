import React, {useEffect, useState} from 'react'
import { Loader } from '../Loader/Loader';
import { productServices } from '../../services/productServices'
import { Link, useNavigate } from "react-router-dom";
import { useCart } from '../../context/CartContext'; 
import { useAuth } from '../../context/AuthContext';

export const Products = () => {
  const navigate = useNavigate();
  const { isLogIn } = useAuth();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [displayedProducts, setDisplayedProducts] = useState([]);

  useEffect(() => {
    const fetchCategory = async() => {
      try{
        const res = await productServices.categoryId();
        setCategory(res);
      } catch(error) {
        console.log(error);
      }
    };
    fetchCategory();
  }, []);

  useEffect(() => {
    const fetchProducts = async() => {
      try{
        const res = await productServices.productList(activeCategory);
        setProducts(res);
        setDisplayedProducts(res);
        console.log(res)
      } catch(error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [activeCategory]);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setDisplayedProducts(products);
      return;
    }
    
    const filtered = products.filter(product =>
      product.title && product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    console.log(filtered)
    
    setDisplayedProducts(filtered);
  };

  const handleAddToCart = (product) => {
    if (!isLogIn) {
      navigate("/login")
    }
    addToCart(product);
  };


  if (loading) return <Loader />;

  return (
    <div className="container">
      
      <div className="position-relative my-4" style={{ width: '25%' }}>
        <i onClick={handleSearch} className="bi bi-search bg-primary text-white rounded-2 position-absolute" style={{padding:"2px 5px", top: '50%', left: '10px', transform: 'translateY(-50%)' }}></i>
        <input type="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className='border rounded-1 px-5 py-2 ' placeholder='Search..' name="" id="" />
      </div>
      
      <p className='product-count text-black-50 fw-semibold' style={{ fontSize: '14px' }}>Showing {displayedProducts.length} Products</p>


      <div className="product-container w-100">
        
      
        <div className="d-flex w-100 gap-4">

          <div className="row g-4 mb-5">

            {
            displayedProducts.length === 0 
            && 
            <div className="text-center my-5 pt-5 zoom-in">
              <i className="bi bi-emoji-frown display-4 text-secondary mb-3"></i>
              <h4 className="no-text text-muted mt-1">No products found</h4>
            </div>
            }

            {displayedProducts.map(product => (
              <div onClick={()=>navigate(`/product/${product.id}`)} className="col-md-4" key={product.id}>
                
                <div className="card mb-3 p-4 zoom-in">
                  
                  <img src={product.images[0]} className="card-img-top rounded-3" alt={product.title} />
                  
                  <div className="card-body p-0 mt-4 pb-2 ">
                    
                    <div className="up mb-3">
                      <h5 className="card-title fw-bold">{product.title}</h5>

                      <p className="card-text">
                      {product.description.length > 20
                        ? `${product.description.substring(0, 20)}... `
                        : product.description
                      }
                      <span className="text-black fw-semibold" style={{ cursor: "pointer" }}> Read More</span>
                      </p>
                    </div>
                    
                    <div>
                      <p className='category bg-body-secondary rounded-pill'>{product.category.name}</p>

                      <div className="down d-flex justify-content-between align-items-end">
                        <div>
                          <label htmlFor="price">Price</label>
                          <p className="card-text-price fw-bold m-0">$ {product.price}</p>
                        </div>
                        
                        <button className='add-cart-btn' onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(product);
                          }}>
                          <i className="bi bi-cart-plus me-2" />
                          <span>Add to Cart</span>
                        </button>
                      </div>
                    </div>

                  </div>

                </div>
              
              </div>
            ))}
          </div>

          <div className="filter-bar pt-4 pb-2 mb-4 zoom-in">
            <h5 className='cat fw-semibold pb-2 mx-3 '>
              <i className="bi bi-grid me-2"></i>
              Categories :
            </h5>

            <ul className='list-unstyled mb-2'>
              <li
                className={`fw-normal mb-2 ${activeCategory === null ? 'active-category' : ''}`}
                onClick={() => {
                  setActiveCategory(null);
                }}
              >
                All
              </li>

              {category.slice(0,6).map(cat => (
                <li
                  key={cat.id}
                  className={`fw-normal mb-2 ${activeCategory === cat.id ? 'active-category' : ''}`}
                  onClick={() => {
                    setActiveCategory(cat.id);
                  }}
                >
                  {cat.name}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  )
}
