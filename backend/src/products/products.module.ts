/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { LivrosController } from './products.controller';
import { LivrosService } from './products.service';

@Module({
  imports: [],
  controllers: [LivrosController],
  providers: [LivrosService],
})
export class LivrosModule {}
