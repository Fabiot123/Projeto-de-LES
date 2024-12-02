/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { prisma } from '../lib/prisma';

@Injectable()
export class CheckoutService {
  async saveCheckout(cartData: any) {
    const { cart, clientId } = cartData;

    try {
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
    } catch (error) {
      console.error('Erro ao salvar checkout:', error);
      throw new Error('Erro ao salvar checkout');
    }
  }

  async saveCard(cardData: any) {
    const {
      crt_num,
      crt_nome,
      crt_band,
      crt_validade,
      crt_cod_seg,
      crt_tipo,
      crt_cli_id,
    } = cardData;
    console.log('Dados do Cartão Recebidos no Backend:', cardData); // Verificar os dados recebidos no backend

    try {
      const createdCard = await prisma.cartao.create({
        data: {
          crt_num,
          crt_nome,
          crt_band,
          crt_validade,
          crt_cod_seg,
          crt_tipo,
          crt_cli_id,
        },
      });
      console.log('Cartão criado com sucesso:', createdCard); // Log de sucesso
      return createdCard;
    } catch (error) {
      console.error('Erro ao criar cartão:', error);
      throw new Error('Erro ao criar cartão');
    }
  }
}

module.exports = { CheckoutService };
