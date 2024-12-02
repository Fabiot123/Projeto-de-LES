/* eslint-disable prettier/prettier */
import { Controller, Get, Query, Logger } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  private readonly logger = new Logger(DashboardController.name);

  constructor(private dashboardService: DashboardService) {}

  @Get('categorias')
  async getCategorias() {
    this.logger.log('Recebida requisição para obter categorias');
    return this.dashboardService.getCategorias();
  }

  @Get('livros-por-categoria')
  async getLivrosPorCategoria(@Query('categorias') categorias: string) {
    this.logger.log(
      `Recebida requisição para obter livros das categorias: ${categorias}`,
    );
    const categoriasArray = categorias.split(',');
    return this.dashboardService.getLivrosPorCategoria(categoriasArray);
  }
}
