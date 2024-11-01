"use client";
import Link from "next/link";
import styles from "./Checkout.module.css";
import useStore from "@/useStore";

export default function Checkout() {
  const handleCheckout = () => {
    console.log("Finalizando a compra");
  };

  const { cart } = useStore();

  const subtotal =
    cart.length > 0
      ? cart
          .reduce((acc, item) => acc + item.lvr_prc * item.quantity, 0)
          .toFixed(2)
      : 0;

  return (
    <div className={styles.checkoutContainer}>
      <h2 className={styles.title}>Checkout</h2>
      <form className={styles.checkoutForm}>
        <div className={styles.section}>
          {cart.map((item) => (
            <li key={item.lvr_id} className={styles.cartItem}>
              <div className={styles.itemDetails}>
                <div className={styles.bookImage}></div>
                <div>
                  <h4>{item.lvr_ttl}</h4>
                  <p>{item.lvr_atr}</p>
                  <p>x {item.quantity}</p>
                </div>
              </div>
            </li>
          ))}
        </div>
        <div className={styles.subtotal}>
          <p>Subtotal</p>
          <p>R${subtotal}</p>
        </div>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Adicionar Cupom</h3>
          <input
            type="text"
            placeholder="Digite o código do cupom"
            className={styles.input}
          />
          <button type="button" className={styles.couponButton}>
            Aplicar
          </button>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Escolha o Cartão de Crédito</h3>
          <div className={styles.cardOptions}> </div>
        </div>

        <div className={styles.buttonSection}>
          <Link href="http://localhost:3000/HomePagina">
            <button
              type="button"
              className={styles.checkoutButton}
              onClick={handleCheckout}
            >
              Finalizar Compra
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
