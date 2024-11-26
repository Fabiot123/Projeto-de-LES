/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { CuponsService } from './cupom.service';

@Controller('cupons')
export class CuponsController {
  constructor(private readonly cuponsService: CuponsService) {}

  @Post()
  async validarCupom(@Body() { code }: { code: string }) {
    return this.cuponsService.validarCupom(code);
  }
}
