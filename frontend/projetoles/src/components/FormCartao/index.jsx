import { useState, useEffect } from "react";
import { api } from "@/libs/axios";
import styles from "./FormCartao.module.css";

const CardForm = () => {
  const [formData, setFormData] = useState({
    crt_num: "",
    crt_nome: "",
    crt_band: "",
    crt_validade: "",
    crt_cod_seg: "",
    crt_tipo: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const crt_cli_id = user?.cli_id;
    if (!crt_cli_id) {
      setError("ID do cliente não encontrado.");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const user = JSON.parse(localStorage.getItem("user"));
    const crt_cli_id = user?.cli_id;
    console.log("ID do Cliente:", crt_cli_id);

    if (!crt_cli_id) {
      setError("ID do cliente não encontrado.");
      return;
    }

    try {
      const cardData = { ...formData, crt_cli_id };
      console.log("Dados do Cartão:", cardData);
      await api.post("/checkout/card", cardData);
      alert("Cartão adicionado com sucesso!"); // ou qualquer ação que queira tomar após adicionar o cartão
    } catch (error) {
      console.error("Erro ao adicionar cartão:", error);
      setError(
        "Erro ao adicionar cartão. Verifique os dados e tente novamente."
      );
    }
  };

  return (
    <div className={styles.cardFormContainer}>
      <h2 className={styles.title}>Adicionar Cartão</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        {error && <p className={styles.error}>{error}</p>}
        <label>Número do Cartão</label>
        <input
          type="text"
          name="crt_num"
          value={formData.crt_num}
          onChange={handleChange}
          required
        />

        <label>Nome no Cartão</label>
        <input
          type="text"
          name="crt_nome"
          value={formData.crt_nome}
          onChange={handleChange}
          required
        />

        <label>Bandeira</label>
        <select
          name="crt_band"
          value={formData.crt_band}
          onChange={handleChange}
          required
        >
          <option value="">Selecione a Bandeira</option>
          <option value="Visa">Visa</option>
          <option value="MasterCard">MasterCard</option>
          <option value="AmericanExpress">American Express</option>
          <option value="Elo">Elo</option>
          <option value="Hipercard">Hipercard</option>
          <option value="Alelo">Alelo</option>
        </select>

        <label>Validade</label>
        <input
          type="text"
          name="crt_validade"
          value={formData.crt_validade}
          onChange={handleChange}
          required
        />

        <label>Código de Segurança</label>
        <input
          type="text"
          name="crt_cod_seg"
          value={formData.crt_cod_seg}
          onChange={handleChange}
          required
        />

        <label>Tipo do Cartão</label>
        <select
          name="crt_tipo"
          value={formData.crt_tipo}
          onChange={handleChange}
          required
        >
          <option value="">Selecione o Tipo</option>
          <option value="Credito">Crédito</option>
          <option value="Debito">Débito</option>
        </select>

        <button type="submit">Adicionar Cartão</button>
      </form>
    </div>
  );
};

export default CardForm;
