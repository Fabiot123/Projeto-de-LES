/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { prisma } from '../lib/prisma';

@Injectable()
export class LivrosService {
  async getAllLivros() {
    return await prisma.livros.findMany({
      include: {
        lvr_cat: true,
      },
    });
  }
}

module.exports = { LivrosService };
