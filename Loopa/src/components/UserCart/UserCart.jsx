import React from 'react'
import { useCart } from '../../context/CartContext';
import { useNavigate } from "react-router-dom";

function UserCart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, grandTotal, clearCart, decreaseQuantity, addToCart, totalQuantity} = useCart();
  const handelRemoveItem = (productID) => {
    removeFromCart(productID)
  }
  const handleClearCart = () => {
    clearCart()
  }
  const handleDecrease = (productId) => {
    decreaseQuantity(productId);
  };

  const handleIncrease = (product) => {
    addToCart(product);
  };

  return  (
    <div className="container w-75 my-5 fade-in-up">
      <div className='your-cart d-flex justify-content-between border-bottom pb-3 mb-4 '>
          <h2 className="fw-semibold">Your Cart <span className='fs-5'> ({totalQuantity} items)</span></h2>
          <button onClick={() => handleClearCart()} className='btn btn-dark'>
            <i className="bi bi-trash me-2" />
            <span className='fw-semibold'>Clear Cart</span>
          </button>
      </div>

      {cart.length === 0 ? (
        <div className="no-cart-text text-center mt-5">
          <i className="bi bi-cart-x display-3 text-muted" />
          <p className="text-muted mt-3">Your cart is empty.</p>
        </div>
      ) : (
        <div className="d-flex gap-5">
          <div className="full-item-cart d-flex flex-column gap-4 w-75">

            {cart.map(item => (
              <div className="" key={item.id}>

                <div className="item-card p-3 zoom-out">

                  <div className="d-flex gap-3">

                    <div className="item-img" onClick={()=>navigate(`/product/${item.id}`)}>
                      <img
                        src={item.images?.[0]}
                        className="img-fluid rounded-3 h-100 object-fit-cover"
                        alt={item.title}
                        style={{ objectFit: 'cover', height: '100%' }}
                      />
                    </div>

                    <div className="d-flex justify-content-between w-100">

                      <div className="item-card-body">
                        <h5 className="card-title">{item.title}</h5>
                        <p className="card-text fs-6 mt-2 m-0">Quantity: {item.quantity}</p>
                        <p className="card-text fs-6 mt-2 m-0">Price: ${item.price}</p>
                      </div>

                      <div className='d-flex gap-5'> 
                        <p className="card-text m-0 fs-6">
                            Quantity:
                            <button
                              className="btn btn-sm btn-outline-secondary mx-2"
                              onClick={() => item.quantity === 1 ? handelRemoveItem(item.id) : handleDecrease(item.id)}
                            >
                              -
                            </button>
                            {item.quantity}
                            <button
                              className="btn btn-sm btn-outline-secondary mx-2"
                              onClick={() => handleIncrease(item)}
                            >
                              +
                            </button>
                        </p>

                        <div className="d-flex flex-column justify-content-between">
                          <div className='rmb-btn border border-dark rounded-3 p-1' onClick={() => handelRemoveItem(item.id)}>
                            <i className="bi bi-trash3-fill me-2" />
                            <span>Remove</span>
                          </div>
                          <p className="card-text fs-6 fw-semibold">Total: ${item.totalPrice}</p>
                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>
            ))}

          </div>

          <div className="d-flex flex-column w-25 fade-in-up">
            <h1 className='o-top fs-2 border-bottom pb-2 mb-4 fw-semibold'>Order Summary</h1>
            <h4 className="d-flex justify-content-between pb-2 fs-6">Total Price: <span>${grandTotal}</span></h4>
            <h4 className="d-flex justify-content-between fs-6">Delivery Charges: <span>$0</span></h4>
            <h4 className="o-down d-flex justify-content-between fs-5 border-top pt-2 mt-2">Grand Total: <strong>${grandTotal}</strong></h4>
            <button className='btn btn-success mt-3'>   Pay Now</button>
          </div>
          
        </div>
      )}


    </div>
  );
};

export default UserCart