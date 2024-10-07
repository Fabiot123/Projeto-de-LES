/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { LivrosService } from './products.service';

@Controller('livros')
export class LivrosController {
  constructor(private readonly livrosService: LivrosService) {}

  @Get()
  async findAll() {
    return await this.livrosService.getAllLivros();
  }
}

module.exports = { LivrosController };
