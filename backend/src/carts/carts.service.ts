/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { prisma } from '../lib/prisma';

@Injectable()
export class CheckoutService {
  async saveCheckout(cartData: any) {
    const { cart, clientId } = cartData;

    const createdCart = await prisma.carrinhos.create({
      data: {
        crn_cli_id: clientId,
        crn_status: 'Em_Processamento',
        crn_icr: {
          create: cart.map((item) => ({
            icr_qtn: item.quantity,
            icr_lvr_id: item.lvr_id,
          })),
        },
      },
      include: {
        crn_icr: true,
      },
    });

    return createdCart;
  }

  async createOtherCard(cardData: any) {
    console.log('Dados recebidos:', cardData);

    const { clientID, numero, cvv, bandeira, nome, validade, tipo } = cardData;

    // Validação dos dados
    if (
      !clientID ||
      !numero ||
      !cvv ||
      !bandeira ||
      !nome ||
      !validade ||
      !tipo
    ) {
      throw new Error('Todos os campos do cartão são obrigatórios.');
    }

    const createCard = await prisma.cartao.create({
      data: {
        crt_cli_id: clientID,
        crt_num: numero,
        crt_cod_seg: cvv,
        crt_band: bandeira,
        crt_nome: nome,
        crt_validade: validade,
        crt_tipo: tipo,
      },
    });

    return createCard;
  }
}

module.exports = { CheckoutService };
