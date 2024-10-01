/* eslint-disable prettier/prettier */
import { z } from 'zod';

export const clienteditschema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  cpf: z
    .string()
    .min(1, 'CPF é obrigatório')
    .regex(/^\d{3}.\d{3}.\d{3}-\d{2}$/g, 'CPF inválido'),
  gender: z.string().min(1, 'Gênero Obrigatório'),
  tel: z.object({
    tipo: z.string().min(1, 'Tipo do Telefone Obrigatório'),
    ddd: z.string().min(1, 'DDD é Obrigatório'),
    numero: z.string().min(1, 'Número de Telefone Obrigatório'),
  }),
  dt_nascimento: z.string().min(1, 'Data de Nascimento Obrigatório'),
  endereco: z.array(
    z.object({
      id: z.string().nullable(),
      resi: z.string().min(1, 'Residencia Obrigatório'),
      tlogra: z.string().min(1, 'Tipo de Logradouro Obrigatório'),
      logra: z.string().min(1, 'Logradouro Obrigatório'),
      num: z.string().min(1, 'Número de Residencia Obrigatório'),
      bairro: z.string().min(1, 'Bairro Obrigatório'),
      cep: z.string().min(1, 'CEP Obrigatório'),
      cidade: z.string().min(1, 'Cidade Obrigatório'),
      estado: z.string().min(1, 'Estado Obrigatório'),
      pais: z.string().min(1, 'Pais Obrigatório'),
      tipos: z
        .array(z.string().min(1, 'Obrigatório'))
        .min(1, 'Tipo é obrigatório'),
    }),
  ),
  cartao: z.array(
    z.object({
      id: z.string().nullable(),
      num: z.string().min(1, 'Numero do Cartão Obrigatório'),
      nome: z.string().min(1, 'Nome no Cartão Obrigatório'),
      bandeira: z.string().min(1, 'Bandeira Obriogatório'),
      cvc: z.string().min(1, 'CVC Obrigatório'),
      validade: z.string().min(1, 'Data de validade é obrigatório'),
      tipo: z.string().min(1, 'Tipo de Cartão é Obrigatório'),
    }),
  ),
});

export type ClientEditSchema = z.infer<typeof clienteditschema>;
