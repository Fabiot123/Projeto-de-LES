/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ClientModule } from './clients/client.module';
import { LivrosModule } from './products/products.module';

@Module({
  imports: [ClientModule, LivrosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
