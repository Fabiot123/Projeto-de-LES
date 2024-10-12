/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';
import { AuthenticService } from './authentic.service';

@Controller('authentic')
export class AuthenticController {
  constructor(private readonly authenticService: AuthenticService) {}

  @Post()
  async login(@Body() body: any) {
    try {
      return await this.authenticService.login(body);
    } catch (e) {
      return { Error: e };
    }
  }
}

module.exports = { AuthenticController };
