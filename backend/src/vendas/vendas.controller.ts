/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { VendasService } from './vendas.service';

@Controller('livros')
export class VendasController {
  constructor(private readonly vendasService: VendasService) {}

  @Get()
  async findAll() {
    return await this.vendasService.getAllVendas();
  }
}

module.exports = { VendasController };
