
import React from "react";
import styles from "../../app/CadastroCliente/CadastroCliente.module.css"
// import styles from "./FormClient.module.css"
import DefaultInput from "@/components/DefaultInput";
import DefaultSelect from "@/components/DefaultSelect";
import RadioButtonGroup from "@/components/RadioButtonGroup";
import CheckboxGroup from "@/components/CheckboxGroup";
import { useForm, useFieldArray } from "react-hook-form"
import { useRouter } from "next/navigation"
import {toast} from "react-toastify"
import {cpfMask, telMask, dddMask, cepMask, cvvMask, dtvalMask} from "@/utils/masks"
import {bandoption,genoption,teloption,tipoLogradouroOption,tipoResidenciaOption} from "./options"
import { addressEmpty, creditCardEmpty } from "./empty";
import { userService } from "@/services/entities/userService"

const defaultEmptyValues = {
    endereco: [addressEmpty],
    cartao: [creditCardEmpty]
};
const clientToForm = (client) => ({
    name: client.cli_name,
    cpf: client.cli_cpf,
    gender: client.cli_gen,
    tipo: client.cli_tel.tel_tipo,
    ddd: client.cli_tel.tel_ddd,
    numerotel: client.cli_tel.tel_num,
    // tel: {
    // },
    dt_nascimento: client.cli_dt_nasc.split("T")[0],
    email: client.cli_email,
    senha: client.cli_senha,
    endereco: client.cli_end.map((endereco) => {
        const getTipos = () => {
            const temp_tip = []
            if (endereco.end_res) {
                temp_tip.push("Residência")
            }
            if (endereco.end_cob) {
                temp_tip.push("Cobrança")
            }
            if (endereco.end_ent) {
                temp_tip.push("Entrega")
            }
            return temp_tip;
        }
        return {
            id: endereco.end_id,
            resi: endereco.end_resi,
            tlogra: endereco.end_tlogra,
            logra: endereco.end_logra, 
            num: endereco.end_num, 
            bairro: endereco.end_bairro, 
            cep: endereco.end_cep, 
            cidade: endereco.end_cidade, 
            estado: endereco.end_estado, 
            pais: endereco.end_pais, 
            tipos: getTipos(),
        }
    }),
    cartao: client.cli_crt.map((cartao) => ({
        id: cartao.crt_id,
        num: cartao.crt_num,
        nome: cartao.crt_nome,
        bandeira: cartao.crt_band,
        cvc: cartao.crt_cod_seg,
        validade: cartao.crt_validade,
        tipo: cartao.crt_tipo,
    })),
})


export default function FormClient({ cliente }){
    const { control, register, setValue, watch, handleSubmit  } = useForm({
        defaultValues: cliente ? clientToForm(cliente) : defaultEmptyValues,
    });

    const addressFields = useFieldArray({
        control,
        name: 'endereco'
    });
    const cartoesFields =  useFieldArray({
        control,
        name: 'cartao'
    });

    const handleAddAddress = () => {
        addressFields.append(addressEmpty);
      };
    const handleDeleteAddress = (index) => {
        addressFields.remove(index);
    };

    const handleAddCreditCard = () => {
        cartoesFields.append(creditCardEmpty);
    };
    const handleDeleteCreditCard = (index) => {
        cartoesFields.remove(index);
    };

    const router = useRouter();

    const onSubmit = async (value) => {

        const formattedData = {
            ...value,
            tel: {
                tipo: value.tipo,
                ddd: value.ddd,
                numero: value.numerotel,
            }
        };
    
        try {
            if (cliente) {
                await userService.update(cliente.cli_id, formattedData)
            } else {
                await userService.create(formattedData);
            }
            toast.success("Cliente salvo com sucesso!")
            router.push("/Admin/Users")
            
        } catch (error) {
            toast.error("Deu erro")
        }
    }

    console.log(watch())

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.formSection}>
            Informações Pessoais
        </h2>

        <div className={styles.wrapper}>
            <DefaultInput name="nome" label="Nome" {...register("name")} placeholder="Digite seu Nome Completo"/>

            <DefaultInput name="cpf" label="CPF" {...register("cpf")} onInput={(e) => {
                e.target.value = cpfMask(e.target.value)
            }} placeholder="000-000-000-00"/>
            
            <DefaultSelect name="genero" label="Gênero" {...register("gender")} options={genoption}/>
            
            <DefaultSelect name="tiptel" label="Tipo de Telefone" {...register("tipo")} options={teloption}/>

            <DefaultInput name="ddd" label="DDD" {...register("ddd")} onInput={(e) => {
                e.target.value = dddMask(e.target.value)}}
                placeholder="Ex: 11"/>
                
            <DefaultInput name="numtel" label="Número de Telefone" {...register("numerotel")} onInput={(e) => {
                e.target.value = telMask(e.target.value, watch("tipo") ?? "fixo")
            }} placeholder="Digite seu Numero de Telefone"/>

            <DefaultInput type="date" name="datanasc" label="Data de Nascimento" {...register("dt_nascimento")} />
            {
                !cliente && <>
                <DefaultInput name="senha" type="password" label="Senha" {...register("senha")} placeholder="Digite sua Senha"/>
                <DefaultInput name="confsenha" type="password" label="Confirmar Senha" {...register("confsenha")} placeholder="Confirma sua Senha"/>
                <DefaultInput name="email" label="Email" {...register("email")} placeholder="Digite seu Email"/>
                </>
            }
        </div>
        
        <h2 className={styles.formSection}>
            Endereço
        </h2>
        <button type="button" onClick={() => {
            handleAddAddress();
        }}>
            Add Endereço
        </button>
         
        <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px"
        }}> 
            {
                addressFields.fields.map((val, index) => {
                    return (
                        <div className={styles.wrapper} key={val} style={{
                            borderBottom: "1px solid #ccc",
                            padding: "16px"
                        }}>
                            <CheckboxGroup value={watch(`endereco.[${index}].tipos`)} onChange={(value) => setValue(`endereco.[${index}].tipos`, value)} /> 
                            <DefaultSelect name="tipoderesidencia" label="Tipo de Residência" {...register(`endereco.[${index}].resi`)} options={tipoResidenciaOption}/>
                            <DefaultSelect name="tipologradouro" label="Tipo Logradouro" {...register(`endereco.[${index}].tlogra`)} options={tipoLogradouroOption}/>
                            <DefaultInput name="numendereco" label="Número" {...register(`endereco.[${index}].num`)} placeholder="Número da Residência"/>
                            <DefaultInput name="endereco" label="Endereço" {...register(`endereco.[${index}].logra`)} placeholder="Insira seu Endereço"/>
                            <DefaultInput name="cep" label="CEP" {...register(`endereco.[${index}].cep`)} onInput={(e) => {
                            e.target.value = cepMask(e.target.value)
                        }} placeholder="Ex: 00000-000"/>
                            <DefaultInput name="bairro" label="Bairro" {...register(`endereco.[${index}].bairro`)} placeholder="Digite o Nome do Bairro"/>
                            <DefaultInput name="cidade" label="Cidade" {...register(`endereco.[${index}].cidade`)} placeholder="Digite sua Cidade"/>
                            <DefaultInput name="estado" label="Estado" {...register(`endereco.[${index}].estado`)} placeholder="Digite seu Estado"/>
                            <DefaultInput name="pais" label="País" {...register(`endereco.[${index}].pais`)} placeholder="Digite seu País"/>
                        </div> 
                    ) 
                })
            }
        </div>

        <h2 className={styles.formSection}>
            Pagamento
        </h2>
        <button type="button" onClick={() => {
            handleAddCreditCard();
        }}>
            Add Cartão
        </button>

        {
            cartoesFields.fields.map((val, index) => {
                return (
                    <div className={styles.wrapper} key={val} style={{
                        borderBottom: "1px solid #ccc",
                        padding: "16px"
                    }}>
                        <DefaultInput label="Número do Cartão" {...register(`cartao.[${index}].num`)} placeholder="Digite o Número do Cartão"/>
                        <DefaultInput 
                        label="CVV" 
                        {...register(`cartao.[${index}].cvc`)} onInput={(e) => {
                        e.target.value = cvvMask(e.target.value)
                        }} placeholder="Ex: 000"/>
                        <DefaultSelect label="Bandeira do Cartão" {...register(`cartao.[${index}].bandeira`)} options={bandoption}/>
                        <DefaultInput label="Nome no Cartão" {...register(`cartao.[${index}].nome`)} placeholder="Digite o Nome no Cartão"/>
                        <DefaultInput label="Data de Vencimento do Cartão" {...register(`cartao.[${index}].validade`)} onInput={(e) => {
                        e.target.value = dtvalMask(e.target.value)
                        }} placeholder="Ex: MM/AA"/>
                        <RadioButtonGroup value={watch(`cartao.[${index}].tipo`)} onChange={(value) => setValue(`cartao.[${index}].tipo`, value)} />
                    </div> 
                )
            }) 
        }
        <button id="criar">{cliente ? "Salvar" :"Criar"}</button>
        </form>
    );   
}