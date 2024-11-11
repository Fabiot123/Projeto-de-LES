"use client";
import styles from "./Checkout.module.css";
import useStore from "@/useStore";
import { api } from "@/libs/axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Checkout() {
  const { cart } = useStore();
  const router = useRouter();
  const [user, setUser] = useState();

  useEffect(() => {
    const usuario = localStorage.getItem("user");

    const usuarioParse = JSON.parse(usuario);

    setUser(usuarioParse);
  }, []);

  const handleCheckout = async () => {
    console.log("Finalizando a compra");

    const { cart } = useStore.getState();

    const checkoutData = {
      cart: cart,
      subtotal: parseFloat(subtotal),
      clientId: user.cli_id,
    };

    try {
      const response = await api.post("/checkout", checkoutData);

      if (!response.ok) {
        throw new Error("Erro ao finalizar compra");
      }

      const data = await response.json();
      console.log("Compra finalizada com sucesso:", data);
    } catch (error) {
      console.error("Erro:", error);
    }
  };

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
          {user?.cli_crt?.map((user) => (
            <div className={styles.wrapper}>
              <p>Numero do Cartao</p>
              <p>Bandeira</p>
              <p>Validade</p>
              <p>{user.crt_num}</p>
              <p>{user.crt_band} </p>
              <p> {user.crt_validade}</p>
            </div>
          ))}
          <div className={styles.cardOptions}> </div>
        </div>

        <div className={styles.buttonSection}>
          <button
            type="button"
            className={styles.checkoutButton}
            onClick={() => {
              handleCheckout();
              router.push("/HomePagina");
            }}
          >
            Finalizar Compra
          </button>
        </div>
      </form>
    </div>
  );
}
