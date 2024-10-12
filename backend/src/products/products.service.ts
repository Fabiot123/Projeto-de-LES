/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { prisma } from '../lib/prisma';

@Injectable()
export class LivrosService {
  async getAllLivros() {
    return await prisma.livros.findMany();
  }
}

module.exports = { LivrosService };
