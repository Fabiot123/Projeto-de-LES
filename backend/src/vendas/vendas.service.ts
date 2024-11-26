/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { prisma } from '../lib/prisma';
import { TipoStatusVendas } from '@prisma/client';

@Injectable()
export class VendasService {
  async getAllVendas() {
    return await prisma.carrinhos.findMany({
      include: {
        crn_icr: {
          include: {
            icr_lvr: {
              select: {
                lvr_id: true,
                lvr_ttl: true,
              },
            },
          },
        },
        crn_cli: {
          select: {
            cli_id: true,
            cli_name: true,
          },
        },
        crn_cpn: {
          select: {
            cpn_id: true,
            cpn_code: true,
          },
        },
      },
    });
  }

  async getByID(id: string) {
    return await prisma.carrinhos.findFirst({
      where: {
        crn_cli_id: id,
      },
      include: {
        crn_icr: {
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
    });
  }

  async updateStatusCompra(status: TipoStatusVendas, id: string) {
    return await prisma.carrinhos.update({
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
