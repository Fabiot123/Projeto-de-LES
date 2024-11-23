/* eslint-disable prettier/prettier */
import { Controller, Get, Put } from '@nestjs/common';
import { TrocaService } from './troca.service';

@Controller('trocas')
export class TrocarController {
  constructor(private readonly vendasService: TrocaService) {}

  @Get()
  async findAll() {
    return await this.vendasService.getAllTrocas();
  }

  @Put()
  async changeStatus() {}
}

module.exports = { TrocarController };
