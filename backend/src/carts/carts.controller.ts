/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Get,
  NotFoundException,
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
      const cards = await this.checkoutService.saveCard(body.cards);
      return { cards };
    } catch (e) {
      console.error('Erro ao criar cartão:', e);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('card/:id')
  async getCardById(@Param('id') id: string) {
    try {
      const cartoes = await this.checkoutService.getCardById(id);
      if (!cartoes || cartoes.length === 0) {
        throw new NotFoundException('Cartao nao encontrado');
      }
      return cartoes;
    } catch (error) {
      console.error(`Erro ao buscar Cartao com id ${id}:`, error);
      throw new InternalServerErrorException('Erro ao buscar Cartao');
    }
  }
}
