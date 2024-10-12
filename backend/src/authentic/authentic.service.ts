/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { prisma } from '../lib/prisma';

@Injectable()
export class AuthenticService {
  async login(data: any) {
    const login = await prisma.client.findFirst({
      where: {
        cli_email: data.email,
      },
    });
    if (!login) {
      throw new Error('Usuario nao existe');
    }
    if (login.cli_senha != data.senha) {
      throw new Error('Senha nao corresponde com usuario');
    }
    return login;
  }
}

module.exports = { AuthenticService };
