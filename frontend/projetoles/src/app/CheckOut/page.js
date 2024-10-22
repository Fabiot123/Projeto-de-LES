"use client";
import Link from "next/link";
import styles from "./Checkout.module.css";

export default function Checkout() {
  const handleCheckout = () => {
    console.log("Finalizando a compra");
  };

  return (
    <div className={styles.checkoutContainer}>
      <h2 className={styles.title}>Checkout</h2>
      <form className={styles.checkoutForm}>
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
          <div className={styles.cardOptions}>
            <label className={styles.label}>
              <input
                type="radio"
                name="card"
                value="card1"
                className={styles.radioInput}
              />
              Cartão de Crédito 1 - Termina em 1234
            </label>
            <label className={styles.label}>
              <input
                type="radio"
                name="card"
                value="card2"
                className={styles.radioInput}
              />
              Cartão de Crédito 2 - Termina em 5678
            </label>
            <label className={styles.label}>
              <input
                type="radio"
                name="card"
                value="card3"
                className={styles.radioInput}
              />
              Adicionar Novo Cartão
            </label>
          </div>
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
