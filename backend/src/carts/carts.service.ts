/* eslint-disable prettier/prettier */
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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
          crn_dt_compra: new Date(),
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

  async saveCard(cards: any[]) {
    try {
      const createdCards = [];
      for (const cardData of cards) {
        const { num, nome, bandeira, validade, cvc, tipo, crt_cli_id } =
          cardData;
        console.log('Dados do Cartão Recebidos no Backend:', cardData); // Verificar os dados recebidos no backend

        const createdCard = await prisma.cartao.create({
          data: {
            crt_num: num,
            crt_nome: nome,
            crt_band: bandeira,
            crt_validade: validade,
            crt_cod_seg: cvc,
            crt_tipo: tipo,
            crt_cli_id: crt_cli_id,
          },
        });
        createdCards.push(createdCard);
      }
      console.log('Cartões criados com sucesso:', createdCards); // Log de sucesso
      return createdCards;
    } catch (error) {
      console.error('Erro ao criar cartão:', error);
      throw new Error('Erro ao criar cartão');
    }
  }

  async getCardById(id: string) {
    try {
      const cartao = await prisma.cartao.findMany({
        where: { crt_cli_id: id },
      });

      if (!cartao) {
        throw new NotFoundException('Cartao nao encontrado');
      }

      return cartao;
    } catch (error) {
      console.error(`Erro ao buscar Cartao com id ${id}:`, error);
      throw new InternalServerErrorException('Erro ao buscar Cartao');
    }
  }
}

module.exports = { CheckoutService };
