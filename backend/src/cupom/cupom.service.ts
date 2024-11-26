/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { prisma } from '../lib/prisma';

@Injectable()
export class CuponsService {
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

module.exports = { CuponsService };
