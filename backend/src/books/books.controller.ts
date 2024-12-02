/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Prisma } from '@prisma/client';

@Controller('books')
export class BooksController {
  constructor(private readonly livrosService: BooksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() data: Prisma.LivrosCreateInput) {
    try {
      return this.livrosService.create(data);
    } catch (error) {
      console.error('Erro ao criar livro:', error);
      throw new InternalServerErrorException('Erro ao criar livro');
    }
  }

  @Get()
  async findAll() {
    try {
      return this.livrosService.findAll();
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
      throw new InternalServerErrorException('Erro ao buscar livros');
    }
  }

  @Get('categorias')
  async findAllCat() {
    try {
      return this.livrosService.findAllCat();
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      throw new InternalServerErrorException('Erro ao buscar categorias');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return this.livrosService.findOne(id);
    } catch (error) {
      console.error(`Erro ao buscar livro com id ${id}:`, error);
      throw new InternalServerErrorException('Erro ao buscar livro');
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Prisma.LivrosUpdateInput,
  ) {
    try {
      return this.livrosService.update(id, data);
    } catch (error) {
      console.error(`Erro ao atualizar livro com id ${id}:`, error);
      throw new InternalServerErrorException('Erro ao atualizar livro');
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    try {
      await this.livrosService.delete(id);
    } catch (error) {
      console.error(`Erro ao excluir livro com id ${id}:`, error);
      throw new InternalServerErrorException('Erro ao excluir livro');
    }
  }
}
