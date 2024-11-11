/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CheckoutController } from './carts.controller';
import { CheckoutService } from './carts.service';

@Module({
  imports: [],
  controllers: [CheckoutController],
  providers: [CheckoutService],
})
export class CheckoutModule {}
