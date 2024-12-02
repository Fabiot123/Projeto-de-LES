/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CheckoutService } from './carts.service';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post()
  async checkout(@Body() body: any) {
    try {
      const checkout = await this.checkoutService.saveCheckout(body);
      return { checkout };
    } catch (e) {
      console.error('Erro ao realizar checkout:', e);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('card')
  async createCard(@Body() body: any) {
    console.log('Requisição Recebida para Criar Cartão:', body); // Verificar a requisição recebida
    try {
      const card = await this.checkoutService.saveCard(body);
      return { card };
    } catch (e) {
      console.error('Erro ao criar cartão:', e);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
