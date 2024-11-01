/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { prisma } from '../lib/prisma';

@Injectable()
export class CarrinhosService {
  async getAllVendas() {
    return await prisma.carrinhos.findMany();
  }
}

module.exports = { CarrinhosService };
