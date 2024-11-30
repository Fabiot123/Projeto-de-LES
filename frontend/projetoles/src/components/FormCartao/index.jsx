import React from "react";
import styles from "../../app/CadastroCliente/CadastroCliente.module.css";
import DefaultInput from "@/components/DefaultInput";
import DefaultSelect from "@/components/DefaultSelect";
import RadioButtonGroup from "@/components/RadioButtonGroup";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { cvvMask, dtvalMask, cardMask } from "@/utils/masks";
import { bandoption } from "./options";
import { creditCardEmpty } from "./empty";
import { clientschema } from "@/utils/validation";
import { clienteditschema } from "@/utils/validantionedit";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/libs/axios";

export default function FormCartao({ cliente }) {
  const {
    formState: { errors },
    register,
    setValue,
    watch,
    handleSubmit,
  } = useForm({
    defaultValues: cliente ? cartaoToForm(cliente) : creditCardEmpty,
    resolver: cliente
      ? zodResolver(clienteditschema)
      : zodResolver(clientschema),
    mode: "onChange",
  });

  const router = useRouter();

  const onSubmit = async (value) => {
    const clienteId = localStorage.getItem("clienteId");

    if (!clienteId) {
      toast.error("Cliente não encontrado!");
      return;
    }

    const cardData = {
      clientID: clienteId,
      numero: value.num,
      cvv: value.cvc,
      bandeira: value.bandeira,
      nome: value.nome,
      validade: value.validade,
      tipo: value.tipo,
    };

    console.log("Dados enviados:", cardData);

    try {
      const response = await api.post("checkout/cartoes", cardData);

      if (response.status !== 201) {
        throw new Error("Erro ao adicionar cartão");
      }
      console.log("Resposta da API:", response.data);
      toast.success("Cartão criado com sucesso!");
      router.push("/Checkout");
    } catch (error) {
      console.error("Erro ao criar cartão:", error);
      toast.error("Erro ao adicionar cartão.");
    }
  };

  return (
    <div>
      <h2 className={styles.formSection}>Criando Cartao</h2>
      <div
        className={styles.wrapper}
        style={{
          borderBottom: "1px solid #ccc",
          padding: "16px",
        }}
      >
        <DefaultInput
          label="Número do Cartão"
          {...register("num")}
          onInput={(e) => {
            e.target.value = cardMask(e.target.value);
          }}
          placeholder="Digite o Número do Cartão"
          error={errors.num?.message}
        />
        <DefaultInput
          label="CVV"
          {...register("cvc")}
          onInput={(e) => {
            e.target.value = cvvMask(e.target.value);
          }}
          error={errors.cvc?.message}
          placeholder="Ex: 000"
        />
        <DefaultSelect
          label="Bandeira do Cartão"
          {...register("bandeira")}
          options={bandoption}
          error={errors.bandeira?.message}
        />
        <DefaultInput
          label="Nome no Cartão"
          {...register("nome")}
          placeholder="Digite o Nome no Cartão"
          error={errors.nome?.message}
        />
        <DefaultInput
          label="Data de Vencimento do Cartão"
          {...register("validade")}
          onInput={(e) => {
            e.target.value = dtvalMask(e.target.value);
          }}
          error={errors.validade?.message}
          placeholder="Ex: MM/AA"
        />
        <RadioButtonGroup
          value={watch("tipo")}
          onChange={(value) => setValue("tipo", value)}
          error={errors.tipo?.message}
        />
      </div>
      <button onClick={handleSubmit(onSubmit)}>Criar</button>
    </div>
  );
}
