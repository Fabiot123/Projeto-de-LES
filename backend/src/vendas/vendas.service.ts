/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { prisma } from '../lib/prisma';

@Injectable()
export class VendasService {
  async getAllVendas() {
    return await prisma.vendas.findMany();
  }
}

module.exports = { VendasService };
