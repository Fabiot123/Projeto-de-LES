"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { api } from "@/libs/axios";
import styles from "./FormCartao.module.css";
import RadioButtonGroup from "../RadioButtonGroup";
import DefaultInput from "../DefaultInput";
import DefaultSelect from "../DefaultSelect";
import { bandoption } from "../FormClient/options";
import { cardMask, cvvMask, dtvalMask } from "@/utils/masks";
import { useRouter } from "next/navigation";

const CardForm = ({ addCard }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      cartao: [
        { num: "", cvc: "", bandeira: "", nome: "", validade: "", tipo: "" },
      ],
    },
  });
  const { fields, append } = useFieldArray({
    control,
    name: "cartao",
  });

  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    setError("");
    const user = JSON.parse(localStorage.getItem("user"));
    const crt_cli_id = user?.cli_id;
    console.log("ID do Cliente:", crt_cli_id);

    if (!crt_cli_id) {
      setError("ID do cliente não encontrado.");
      return;
    }

    try {
      const cardData = data.cartao.map((card) => ({ ...card, crt_cli_id }));
      console.log("Dados do Cartão:", cardData);
      const response = await api.post("/checkout/card", { cards: cardData });
      if (addCard) {
        addCard(response.data); // Atualizar o estado dos cartões com os dados retornados
      }
      alert("Cartão(s) adicionado(s) com sucesso!");
      router.push("/CheckOut");
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
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {error && <p className={styles.error}>{error}</p>}
        {fields.map((val, index) => (
          <div
            className={styles.wrapper}
            key={val.id}
            style={{
              borderBottom: "1px solid #ccc",
              padding: "16px",
            }}
          >
            <DefaultInput
              label="Número do Cartão"
              {...register(`cartao.${index}.num`)}
              onInput={(e) => {
                e.target.value = cardMask(e.target.value);
              }}
              placeholder="Digite o Número do Cartão"
              error={errors.cartao?.[index]?.num?.message}
            />
            <DefaultInput
              label="CVV"
              {...register(`cartao.${index}.cvc`)}
              onInput={(e) => {
                e.target.value = cvvMask(e.target.value);
              }}
              error={errors.cartao?.[index]?.cvc?.message}
              placeholder="Ex: 000"
            />
            <DefaultSelect
              label="Bandeira do Cartão"
              {...register(`cartao.${index}.bandeira`)}
              options={bandoption}
              error={errors.cartao?.[index]?.bandeira?.message}
            />
            <DefaultInput
              label="Nome no Cartão"
              {...register(`cartao.${index}.nome`)}
              placeholder="Digite o Nome no Cartão"
              error={errors.cartao?.[index]?.nome?.message}
            />
            <DefaultInput
              label="Data de Vencimento do Cartão"
              {...register(`cartao.${index}.validade`)}
              onInput={(e) => {
                e.target.value = dtvalMask(e.target.value);
              }}
              error={errors.cartao?.[index]?.validade?.message}
              placeholder="Ex: MM/AA"
            />
            <RadioButtonGroup
              value={watch(`cartao.${index}.tipo`)}
              onChange={(value) => setValue(`cartao.${index}.tipo`, value)}
              error={errors.cartao?.[index]?.tipo?.message}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            append({
              num: "",
              cvc: "",
              bandeira: "",
              nome: "",
              validade: "",
              tipo: "",
            })
          }
        >
          Adicionar Novo Cartão
        </button>
        <button type="submit">Adicionar Cartão</button>
      </form>
    </div>
  );
};

export default CardForm;
