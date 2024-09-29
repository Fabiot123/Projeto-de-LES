// pages/checkout.js
import styles from './Checkout.module.css';

export default function Checkout() {
  return (
    <div className={styles.checkoutContainer}>
      <h2 className={styles.title}>Checkout</h2>
      <form className={styles.checkoutForm}>
        
        {/* Seção de Cupom */}
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

        {/* Seção de Cartão de Crédito */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Escolha o Cartão de Crédito</h3>
          <div className={styles.cardOptions}>
            <label className={styles.label}>
              <input type="radio" name="card" value="card1" className={styles.radioInput} />
              Cartão de Crédito 1 - Termina em 1234
            </label>
            <label className={styles.label}>
              <input type="radio" name="card" value="card2" className={styles.radioInput} />
              Cartão de Crédito 2 - Termina em 5678
            </label>
            <label className={styles.label}>
              <input type="radio" name="card" value="card3" className={styles.radioInput} />
              Adicionar Novo Cartão
            </label>
          </div>
        </div>

        <div className={styles.buttonSection}>
          <button type="submit" className={styles.checkoutButton}>
            Finalizar Compra
          </button>
          <button type="button" className={styles.continueShopping}>
            Continuar Comprando
          </button>
        </div>
      </form>
    </div>
  );
}