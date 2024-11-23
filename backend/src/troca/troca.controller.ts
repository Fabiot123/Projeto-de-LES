/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { TrocaService } from './troca.service';
import { TipoStatusTroca } from '@prisma/client';

@Controller('trocas')
export class TrocarController {
  constructor(private readonly trocaService: TrocaService) {}

  @Get()
  async findAll() {
    return await this.trocaService.getAllTrocas();
  }

  @Put(':id')
  async changeStatusTroca(
    @Param('id') id: string,
    @Body('status') status: TipoStatusTroca,
  ) {
    return this.trocaService.updateStatusTroca(status, id);
  }
}

module.exports = { TrocarController };
