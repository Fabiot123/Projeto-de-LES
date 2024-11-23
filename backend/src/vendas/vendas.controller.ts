/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { VendasService } from './vendas.service';
import { TipoStatusVendas } from '@prisma/client';

@Controller('livros')
export class VendasController {
  constructor(private readonly vendasService: VendasService) {}

  @Get()
  async findAll() {
    return await this.vendasService.getAllVendas();
  }

  @Put(':id')
  async changeStatusVendas(
    @Param('id') id: string,
    @Body('status') status: TipoStatusVendas,
  ) {
    return this.vendasService.updateStatusCompra(status, id);
  }
}

module.exports = { VendasController };
