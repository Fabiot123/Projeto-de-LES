/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { prisma } from '../lib/prisma';

@Injectable()
export class AuthenticService {
  async login(data: any) {
    const login = await prisma.client.findFirst({
      where: {
        cli_email: data.email || '',
      },
      include: {
        cli_crt: true,
        cli_end: true,
      },
    });
    console.log(login);
    if (!login) {
      throw new Error('Email nao existe');
    }
    return login;
  }
}

module.exports = { AuthenticService };
