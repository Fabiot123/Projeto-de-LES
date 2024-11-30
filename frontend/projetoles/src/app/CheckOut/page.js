"use client";
import styles from "./Checkout.module.css";
import useStore from "@/useStore";
import { api } from "@/libs/axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { NumericFormat } from "react-number-format";

const notify = () => {
  toast.success("Compra Realizada com Sucesso!");
};

export default function Checkout() {
  const { cart } = useStore();
  const router = useRouter();
  const [user, setUser] = useState();
  const [cupomCode, setCupomCode] = useState("");
  const [desconto, setDesconto] = useState(0);
  const [valueWarnings, setValueWarnings] = useState({});

  useEffect(() => {
    const usuario = localStorage.getItem("user");
    const usuarioParse = JSON.parse(usuario);
    setUser(usuarioParse);
  }, []);

  const handleApplyCupom = async () => {
    if (!cupomCode.trim()) {
      toast.error("Digite um código de cupom válido!");
      return;
    }

    try {
      const response = await api.post("/cupons/validar", { code: cupomCode });
      console.log("Response da API:", response.data);

      if (response.data.isValid) {
        toast.success("Cupom aplicado com sucesso!");
        setDesconto(response.data.desconto);
      } else {
        toast.error(response.data.message || "Cupom inválido ou expirado.");
      }
    } catch (error) {
      console.error(
        "Erro ao validar o cupom:",
        error.response?.data || error.message
      );
      toast.error("Erro ao validar o cupom.");
    }
  };

  const subtotal =
    cart.length > 0
      ? cart.reduce((acc, item) => acc + item.lvr_prc * item.quantity, 0) -
        desconto
      : 0;

  const handleCheckout = async () => {
    console.log("Finalizando a compra");

    const { cart } = useStore.getState();

    const checkoutData = {
      cart: cart,
      subtotal: parseFloat(subtotal.toFixed(2)),
      clientId: user.cli_id,
    };

    try {
      const response = await api.post("/checkout", checkoutData);

      if (response.status !== 201) {
        throw new Error("Erro ao finalizar compra");
      }

      const data = response.data;
      console.log("Compra finalizada com sucesso:", data);

      console.log("Resposta da API:", response.data);

      console.log("Compra finalizada com sucesso:", response.data);
      notify();
      router.push("/HomePagina");
    } catch (error) {
      console.error("Erro:", error);
      toast.error("Erro ao finalizar a compra.");
    }
  };

  const handleValueChange = (value, cartaoNum) => {
    if (value < 15) {
      setValueWarnings((prev) => ({
        ...prev,
        [cartaoNum]: "A quantia mínima é 15,00.",
      }));
    } else {
      setValueWarnings((prev) => {
        const newWarnings = { ...prev };
        delete newWarnings[cartaoNum];
        return newWarnings;
      });
    }
  };

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
          <p>R${subtotal.toFixed(2)}</p>
          {desconto > 0 && (
            <p className={styles.discount}>- R${desconto.toFixed(2)}</p>
          )}
        </div>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Adicionar Cupom</h3>
          <input
            data-test="cupom-code"
            type="text"
            placeholder="Digite o código do cupom"
            value={cupomCode}
            onChange={(e) => setCupomCode(e.target.value)}
            className={styles.input}
          />
          <button
            data-test="aplicar-cupom"
            type="button"
            className={styles.couponButton}
            onClick={handleApplyCupom}
          >
            Aplicar
          </button>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Escolha o Cartão de Crédito</h3>
          {user?.cli_crt?.map((cartao) => (
            <div key={cartao.crt_num} className={styles.wrapper}>
              <input
                type="checkbox"
                id={cartao.crt_num}
                name="cartaoCredito"
                value={cartao.crt_num}
              />
              <label>
                {cartao.crt_num} - {cartao.crt_band} - {cartao.crt_validade}
              </label>
              <NumericFormat
                data-test="preco"
                thousandSeparator="."
                decimalSeparator=","
                prefix="R$ "
                fixedDecimalScale
                decimalScale={2}
                allowNegative={false}
                name={`quantia_${cartao.crt_num}`}
                placeholder="Digite o valor: EX: 15,00"
                className={styles.inputAmount}
                onValueChange={(values) =>
                  handleValueChange(values.floatValue, cartao.crt_num)
                }
              />
              {valueWarnings[cartao.crt_num] && (
                <p className={styles.warningText}>
                  {valueWarnings[cartao.crt_num]}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Escolha o Endereço</h3>
          {user?.cli_end?.map((endereco) => (
            <div key={endereco.end_cep} className={styles.wrapper}>
              <input
                data-test="endereco"
                type="checkbox"
                id={endereco.end_cep}
                name="endereco"
                value={endereco.end_cep}
              />
              <label htmlFor={endereco.end_cep}>
                {endereco.end_logra}, {endereco.end_num}, {endereco.end_cep}
              </label>
            </div>
          ))}
        </div>

        <div className={styles.buttonSection}>
          <button
            type="button"
            className={styles.returnButton}
            onClick={() => {
              router.push("/HomePagina");
            }}
          >
            Retornar as Compras
          </button>

          <button
            data-test="finalizar"
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
