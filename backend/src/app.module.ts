/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ClientModule } from './clients/client.module';
import { LivrosModule } from './products/products.module';
import { AuthenticModule } from './authentic/authentic.module';

@Module({
  imports: [ClientModule, LivrosModule, AuthenticModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
