/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ClientModule } from './clients/client.module';
import { LivrosModule } from './products/products.module';
import { AuthenticModule } from './authentic/authentic.module';
import { VendasModule } from './vendas/vendas.module';

@Module({
  imports: [ClientModule, LivrosModule, AuthenticModule, VendasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
