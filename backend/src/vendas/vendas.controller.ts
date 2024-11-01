/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { CarrinhosService } from './vendas.service';

@Controller('livros')
export class VendasController {
  constructor(private readonly vendasService: CarrinhosService) {}

  @Get()
  async findAll() {
    return await this.vendasService.getAllVendas();
  }
}

module.exports = { VendasController };
