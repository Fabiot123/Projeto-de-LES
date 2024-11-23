/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TrocarController } from './troca.controller';
import { TrocaService } from './troca.service';

@Module({
  imports: [],
  controllers: [TrocarController],
  providers: [TrocaService],
})
export class CheckoutModule {}
