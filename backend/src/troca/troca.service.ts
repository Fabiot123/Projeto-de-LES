/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { prisma } from '../lib/prisma';
import { TipoStatusTroca } from '@prisma/client';

@Injectable()
export class TrocaService {
  async getAllTrocas() {
    return await prisma.trocas.findMany({
      include: {
        trc_cli: {
          select: {
            cli_id: true,
            cli_name: true,
          },
        },
        trc_itc: {
          include: {
            itc_icr: {
              include: {
                icr_lvr: {
                  select: {
                    lvr_id: true,
                    lvr_ttl: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async updateStatusTroca(status: TipoStatusTroca, id: string) {
    return await prisma.trocas.update({
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
