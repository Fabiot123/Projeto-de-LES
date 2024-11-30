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
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post('cartoes')
  async createCard(@Body() body: any) {
    try {
      const card = await this.checkoutService.createOtherCard(body);
      return { card };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
  }
}
