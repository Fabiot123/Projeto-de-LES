/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthenticService } from './authentic.service';

@Controller('authentic')
export class AuthenticController {
  constructor(private readonly authenticService: AuthenticService) {}

  @Post()
  async login(@Body() body: any) {
    try {
      const user = await this.authenticService.login(body);
      return { message: 'Login bem-sucedido', user };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.UNAUTHORIZED);
    }
  }
}
