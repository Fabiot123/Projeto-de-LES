/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { prisma } from '../lib/prisma';
import { TipoStatusTroca } from '@prisma/client';

@Injectable()
export class TrocaService {
  async getAllTrocas() {
    return await prisma.trocas.findMany();
  }

  async updateStatusTroca(status: TipoStatusTroca, id: string) {
    prisma.trocas.update({
      data: {
        trc_status: status,
      },
      where: {
        trc_id: id,
      },
    });
  }
}

module.exports = { TrocaService };
