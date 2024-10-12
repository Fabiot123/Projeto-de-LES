import { useState } from "react";

export function adicionarCarrinho() {
  return (
    <div>
      <button className={styles.button} onClick={() => decreaseQuantity(index)}>
        -
      </button>
      <span>{book.quantity || 0}</span>
      <button className={styles.button} onClick={() => increaseQuantity(index)}>
        +
      </button>
      <button
        className={styles.button}
        onClick={() => addToCart(book)}
      ></button>
    </div>
  );
}
