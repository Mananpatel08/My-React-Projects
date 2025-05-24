import React, { createContext, useState, useEffect, useContext } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const userEmail = localStorage.getItem("userEmail");
    const cartKey = userEmail ? `cart_${userEmail}` : null;

    const [cart, setCart] = useState([]);

    useEffect(() => {
        if (cartKey) {
        const savedCart = JSON.parse(localStorage.getItem(cartKey)) || [];
        setCart(savedCart);
        }
    }, [cartKey, userEmail]);

    const addToCart = (product) => {
        if (!cartKey) return;

        const existingCart = [...cart];
        const productIndex = existingCart.findIndex(item => item.id === product.id);

        if (productIndex === -1) {
        existingCart.push({ ...product, quantity: 1, totalPrice: product.price });
        } else {
        existingCart[productIndex].quantity += 1;
        existingCart[productIndex].totalPrice = existingCart[productIndex].quantity * product.price;
        }

        setCart(existingCart);
        localStorage.setItem(cartKey, JSON.stringify(existingCart));
    };

    const removeFromCart = (productId) => {
        const updatedCart = cart.filter(item => item.id !== productId);
        setCart(updatedCart);
            if (cartKey) {
                localStorage.setItem(cartKey, JSON.stringify(updatedCart));
            }
    };

    const clearCart = () => {
        setCart([]);
        if (cartKey) {
            localStorage.removeItem(cartKey);
        }
    };

    const decreaseQuantity = (productId) => {
        const updatedCart = cart.map(item => {
        if (item.id === productId) {
            const newQuantity = Math.max(1, item.quantity - 1);
            return {
            ...item,
            quantity: newQuantity,
            totalPrice: newQuantity * item.price,
            };
        }
        return item;
        });
        setCart(updatedCart);
        localStorage.setItem(cartKey, JSON.stringify(updatedCart));
    };

  
  const totalQuantity = cart.reduce((sum, product) => sum + product.quantity, 0);
  const grandTotal = cart.reduce((sum, product) => sum + product.totalPrice, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, decreaseQuantity, totalQuantity, grandTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
