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
}

module.exports = { CheckoutService };
