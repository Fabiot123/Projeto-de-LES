"use client"

import React, { useState } from 'react';
import styles from './Cart.module.css';
import Link from 'next/link';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, title: "Example 0", author: "Author 4", price: 8.99, quantity: 1 },
    { id: 2, title: "Example 1", author: "Author 5", price: 9.99, quantity: 1 },
    { id: 3, title: "Example 2", author: "Author 6", price: 10.99, quantity: 1 }
  ]);

  const removeItem = (id) => {
    const updatedCartItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCartItems);
  };

  const increaseQuantity = (id) => {
    const updatedCartItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCartItems);
  };

  const decreaseQuantity = (id) => {
    const updatedCartItems = cartItems.map(item =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCartItems);
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  return (
    <div className={styles.cartContainer}>
      <h2>Meu Carrinho</h2>
      <ul className={styles.cartList}>
        {cartItems.map(item => (
          <li key={item.id} className={styles.cartItem}>
            <div className={styles.itemDetails}>
              <div className={styles.bookImage}>{item.title}</div>
              <div>
                <h4>{item.title}</h4>
                <p>{item.author}</p>
                <p>x {item.quantity}</p>
              </div>
            </div>
            <div className={styles.itemActions}>
              <button onClick={() => decreaseQuantity(item.id)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => increaseQuantity(item.id)}>+</button>
              <p>R${(item.price * item.quantity).toFixed(2)}</p>
              <button onClick={() => removeItem(item.id)} className={styles.removeButton}>
                Remover
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.subtotal}>
        <p>Subtotal</p>
        <p>R${subtotal}</p>
      </div>
      <button className={styles.checkoutButton}>Checkout</button>
      <Link href="http://localhost:3000/HomePagina">
        <p className={styles.continueShopping}>Ou Continuar Comprando →</p>
      </Link>
    </div>
  );
};

export default Cart;
