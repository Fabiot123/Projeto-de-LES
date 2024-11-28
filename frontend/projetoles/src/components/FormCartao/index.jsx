import React from "react";
import styles from "../../app/CadastroCliente/CadastroCliente.module.css";
import DefaultInput from "@/components/DefaultInput";
import DefaultSelect from "@/components/DefaultSelect";
import RadioButtonGroup from "@/components/RadioButtonGroup";
import { useForm, useFieldArray } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { cvvMask, dtvalMask, cardMask } from "@/utils/masks";
import { bandoption } from "./options";
import { creditCardEmpty } from "./empty";
import { userService } from "@/services/entities/userService";
import { clientschema } from "@/utils/validation";
import { clienteditschema } from "@/utils/validantionedit";
import { zodResolver } from "@hookform/resolvers/zod";

const defaultEmptyValues = {
  cartao: [creditCardEmpty],
};

const cartaoToForm = (client) => ({
  cartao: client.cli_crt.map((cartao) => ({
    id: cartao.crt_id,
    num: cartao.crt_num,
    nome: cartao.crt_nome,
    bandeira: cartao.crt_band,
    cvc: cartao.crt_cod_seg,
    validade: cartao.crt_validade,
    tipo: cartao.crt_tipo,
  })),
});

export default function FormCartao({ cliente }) {
  const {
    control,
    formState: { errors },
    register,
    setValue,
    watch,
    handleSubmit,
  } = useForm({
    defaultValues: cliente ? cartaoToForm(cliente) : defaultEmptyValues,
    resolver: cliente
      ? zodResolver(clienteditschema)
      : zodResolver(clientschema),
    mode: "onChange",
  });

  const cartoesFields = useFieldArray({
    control,
    name: "cartao",
  });

  const handleAddCreditCard = () => {
    cartoesFields.append(creditCardEmpty);
  };

  const router = useRouter();

  const onSubmit = async (value) => {
    const clienteId = localStorage.getItem("clienteId");

    if (!clienteId) {
      toast.error("Cliente não encontrado!");
      return;
    }

    try {
      const newCard = value.cartao[value.cartao.length - 1];
      await userService.addCard(clienteId, newCard);

      toast.success("Cartão adicionado com sucesso!");
      router.push("/Checkout");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao adicionar cartão!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles.formSection}>Pagamento</h2>
      <button
        type="button"
        onClick={() => {
          handleAddCreditCard();
        }}
      >
        Adicionar Cartão
      </button>
      {cartoesFields.fields.map((val, index) => {
        return (
          <div
            className={styles.wrapper}
            key={val}
            style={{
              borderBottom: "1px solid #ccc",
              padding: "16px",
            }}
          >
            <DefaultInput
              label="Número do Cartão"
              {...register(`cartao.[${index}].num`)}
              onInput={(e) => {
                e.target.value = cardMask(e.target.value);
              }}
              placeholder="Digite o Número do Cartão"
              error={errors.cartao?.[index]?.num?.message}
            />
            <DefaultInput
              label="CVV"
              {...register(`cartao.[${index}].cvc`)}
              onInput={(e) => {
                e.target.value = cvvMask(e.target.value);
              }}
              error={errors.cartao?.[index]?.cvc?.message}
              placeholder="Ex: 000"
            />
            <DefaultSelect
              label="Bandeira do Cartão"
              {...register(`cartao.[${index}].bandeira`)}
              options={bandoption}
              error={errors.cartao?.[index]?.bandeira?.message}
            />
            <DefaultInput
              label="Nome no Cartão"
              {...register(`cartao.[${index}].nome`)}
              placeholder="Digite o Nome no Cartão"
              error={errors.cartao?.[index]?.nome?.message}
            />
            <DefaultInput
              label="Data de Vencimento do Cartão"
              {...register(`cartao.[${index}].validade`)}
              onInput={(e) => {
                e.target.value = dtvalMask(e.target.value);
              }}
              error={errors.cartao?.[index]?.validade?.message}
              placeholder="Ex: MM/AA"
            />
            <RadioButtonGroup
              value={watch(`cartao.[${index}].tipo`)}
              onChange={(value) => setValue(`cartao.[${index}].tipo`, value)}
              error={errors.cartao?.[index]?.tipo?.message}
            />
          </div>
        );
      })}
      <button id="criar" type="submit">
        {cliente ? "Salvar" : "Criar"}
      </button>{" "}
    </form>
  );
}
