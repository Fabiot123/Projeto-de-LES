/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { prisma } from '../lib/prisma';

@Injectable()
export class CuponsService {
  async createCupom(cupomData: any) {
    const { codigo, preco, troca } = cupomData;

    const existingCupom = await prisma.cupons.findUnique({
      where: { cpn_trc_id: troca },
    });

    if (existingCupom) {
      return await prisma.cupons.update({
        where: { cpn_trc_id: troca },
        data: {
          cpn_prc: preco,
          cpn_code: codigo,
          cpn_status: 'Ativado',
          cpn_tipo: 'Troca',
        },
      });
    }

    const cupom = await prisma.cupons.create({
      data: {
        cpn_prc: preco,
        cpn_code: codigo,
        cpn_trc_id: troca,
        cpn_status: 'Ativado',
        cpn_tipo: 'Troca',
      },
    });

    return cupom;
  }

  async validarCupom(code: string) {
    const cupom = await prisma.cupons.findUnique({
      where: { cpn_code: code },
    });

    if (!cupom) {
      return { isValid: false, message: 'Cupom não encontrado' };
    }

    if (cupom.cpn_status !== 'Ativado') {
      return { isValid: false, message: 'Cupom inválido ou expirado' };
    }

    return { isValid: true, desconto: cupom.cpn_prc };
  }
}

export default CuponsService;
