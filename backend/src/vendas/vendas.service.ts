/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { prisma } from '../lib/prisma';
import { TipoStatusVendas } from '@prisma/client';

@Injectable()
export class VendasService {
  async getAllVendas() {
    return await prisma.carrinhos.findMany();
  }

  async updateStatusCompra(status: TipoStatusVendas, id: string) {
    prisma.carrinhos.update({
      data: {
        crn_status: status,
      },
      where: {
        crn_id: id,
      },
    });
  }
}

module.exports = { VendasService };
