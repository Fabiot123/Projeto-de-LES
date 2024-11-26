/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CuponsController } from './cupom.controller';
import { CuponsService } from './cupom.service';

@Module({
  imports: [],
  controllers: [CuponsController],
  providers: [CuponsService],
})
export class CupomModule {}
