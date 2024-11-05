/* eslint-disable prettier/prettier */
import { Controller, Post } from '@nestjs/common';
import { CheckoutService } from './carts.service';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post()
  async checkout() {}
}
