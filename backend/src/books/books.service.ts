/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { prisma } from '../lib/prisma';
import { Prisma } from '@prisma/client';

@Injectable()
export class BooksService {
  async create(data: Prisma.LivrosCreateInput) {
    try {
      console.log('Tentando criar livro com os seguintes dados:', data);
      const result = await prisma.livros.create({
        data,
      });
      console.log('Livro criado com sucesso:', result);
      return result;
    } catch (error) {
      console.error('Erro ao criar livro:', error);
      throw new InternalServerErrorException('Erro ao criar livro');
    }
  }

  async findAll() {
    try {
      return prisma.livros.findMany({
        include: { lvr_cat: true },
      });
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
      throw new InternalServerErrorException('Erro ao buscar livros');
    }
  }

  async findAllCat() {
    try {
      return prisma.categorias.findMany();
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      throw new InternalServerErrorException('Erro ao buscar categorias');
    }
  }

  async findOne(id: string) {
    try {
      const livro = await prisma.livros.findUnique({
        where: { lvr_id: id },
        include: { lvr_cat: true },
      });

      if (!livro) {
        throw new NotFoundException('Livro não encontrado');
      }

      return livro;
    } catch (error) {
      console.error(`Erro ao buscar livro com id ${id}:`, error);
      throw new InternalServerErrorException('Erro ao buscar livro');
    }
  }

  async update(id: string, data: Prisma.LivrosUpdateInput) {
    try {
      const livroExistente = await prisma.livros.findUnique({
        where: { lvr_id: id },
      });
      if (!livroExistente) {
        throw new NotFoundException('Livro não encontrado');
      }
      console.log('Atualizando livro com os seguintes dados:', data);
      const updatedBook = await prisma.livros.update({
        where: { lvr_id: id },
        data,
      });
      console.log('Livro atualizado com sucesso:', updatedBook);
      return updatedBook;
    } catch (error) {
      console.error(`Erro ao atualizar livro com id ${id}:`, error);
      throw new InternalServerErrorException('Erro ao atualizar livro');
    }
  }

  async delete(id: string) {
    try {
      const livroExistente = await prisma.livros.findUnique({
        where: { lvr_id: id },
      });

      if (!livroExistente) {
        throw new NotFoundException('Livro não encontrado');
      }

      return prisma.livros.delete({
        where: { lvr_id: id },
      });
    } catch (error) {
      console.error(`Erro ao excluir livro com id ${id}:`, error);
      throw new InternalServerErrorException('Erro ao excluir livro');
    }
  }
}
