/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ClientModule } from './clients/client.module';
import { LivrosModule } from './products/products.module';
import { AuthenticModule } from './authentic/authentic.module';
import { VendasModule } from './vendas/vendas.module';
import { CheckoutModule } from './carts/carts.module';
import { TrocaModule } from './troca/troca.module';
import { CupomModule } from './cupom/cupom.module';
import { ChatbotModule } from './chatbot/chatbot.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    ClientModule,
    LivrosModule,
    AuthenticModule,
    VendasModule,
    CheckoutModule,
    TrocaModule,
    CupomModule,
    ChatbotModule,
    DashboardModule,
    BooksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
