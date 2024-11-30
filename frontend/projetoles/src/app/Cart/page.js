"use client";

import React from "react";
import styles from "./Cart.module.css";
import Link from "next/link";
import useStore from "@/useStore";

const Cart = () => {
  const { addQuantity, cart } = useStore();

  const removeItem = (index) => {
    let { quantity, ...rest } = index;
    addQuantity(rest, 0);
  };

  const increaseQuantity = (index) => {
    let { quantity, ...rest } = index;
    if (quantity) {
      quantity += 1;
    } else {
      quantity = 1;
    }
    addQuantity(rest, quantity);
  };

  const decreaseQuantity = (index) => {
    let { quantity, ...rest } = index;
    if (quantity) {
      if (quantity > 0) {
        quantity -= 1;
      } else {
        quantity = 0;
      }
    } else {
      quantity = 0;
    }
    addQuantity(rest, quantity);
  };

  const subtotal =
    cart.length > 0
      ? cart
          .reduce((acc, item) => acc + item.lvr_prc * item.quantity, 0)
          .toFixed(2)
      : 0;

  return (
    <div className={styles.cartContainer}>
      <h2>Meu Carrinho</h2>
      <ul className={styles.cartList}>
        {cart.map((item) => (
          <li key={item.lvr_id} className={styles.cartItem}>
            <div className={styles.itemDetails}>
              <div className={styles.bookImage}>{item.lvr_ttl}</div>
              <div>
                <h4>{item.lvr_ttl}</h4>
                <p>{item.lvr_atr}</p>
                <p>x {item.quantity}</p>
              </div>
            </div>
            <div className={styles.itemActions}>
              <button
                data-test="add-item"
                onClick={() => decreaseQuantity(item)}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                data-test="remove-item"
                onClick={() => increaseQuantity(item)}
              >
                +
              </button>
              <p>R${(item.lvr_prc * item.quantity).toFixed(2)}</p>
              <button
                data-test="remove-all"
                onClick={() => removeItem(item.lvr_id)}
                className={styles.removeButton}
              >
                Remover Todos os Items
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.subtotal}>
        <p>Subtotal</p>
        <p>R${subtotal}</p>
      </div>
      <Link href="http://localhost:3000/CheckOut">
        <button data-test="cart" className={styles.checkoutButton}>
          Checkout
        </button>
      </Link>
      <Link href="http://localhost:3000/HomePagina">
        <p className={styles.continueShopping}>Ou Continuar Comprando →</p>
      </Link>
    </div>
  );
};

export default Cart;
