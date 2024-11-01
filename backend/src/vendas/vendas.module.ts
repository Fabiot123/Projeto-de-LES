/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { VendasController } from './vendas.controller';
import { CarrinhosService } from './vendas.service';

@Module({
  imports: [],
  controllers: [VendasController],
  providers: [CarrinhosService],
})
export class VendasModule {}
