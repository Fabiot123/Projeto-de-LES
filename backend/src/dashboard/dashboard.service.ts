/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { prisma } from '../lib/prisma';

@Injectable()
export class DashboardService {
  async getCategorias() {
    return prisma.categorias.findMany();
  }

  async getLivrosPorCategoria(categorias: string[]) {
    const itens = await prisma.itemCarrinhos.groupBy({
      by: ['icr_lvr_id'],
      _sum: { icr_qtn: true },
      orderBy: { _sum: { icr_qtn: 'desc' } },
      where: {
        icr_lvr: {
          lvr_cat: {
            some: {
              cat_nome: {
                in: categorias,
              },
            },
          },
        },
      },
    });

    const livrosMaisVendidos = await Promise.all(
      itens.map(async (item) => {
        const livro = await prisma.livros.findUnique({
          where: { lvr_id: item.icr_lvr_id },
        });
        return {
          lvr_ttl: livro?.lvr_ttl ?? 'Desconhecido',
          quantidadeVendida: item._sum.icr_qtn,
        };
      }),
    );

    return livrosMaisVendidos;
  }
}
