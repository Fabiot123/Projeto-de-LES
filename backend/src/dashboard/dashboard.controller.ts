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
  async getLivrosPorCategoria(@Query('categoria') categoria: string) {
    this.logger.log(
      `Recebida requisição para obter livros da categoria: ${categoria}`,
    );
    return this.dashboardService.getLivrosPorCategoria(categoria);
  }
}
