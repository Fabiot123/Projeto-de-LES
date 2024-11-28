/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { prisma } from '../lib/prisma';
import { TipoStatusTroca } from '@prisma/client';

@Injectable()
export class TrocaService {
  async createTroca(trocaData: any) {
    const { clientID, items } = trocaData;

    const troca = await prisma.trocas.create({
      data: {
        trc_cli_id: clientID,
        trc_status: 'Aberto',
        trc_itc: {
          create: items.map((item) => ({
            itc_icr_id: item.itemCarID,
            itc_qtn: item.quantidade,
          })),
        },
      },
      include: {
        trc_itc: true,
      },
    });

    return troca;
  }

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
        trc_cpn: true,
      },
    });
  }

  async getByID(id: string) {
    return await prisma.trocas.findFirst({
      where: {
        trc_cli_id: id,
      },
      include: {
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
