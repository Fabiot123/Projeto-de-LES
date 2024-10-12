/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthenticController } from './authentic.controller';
import { AuthenticService } from './authentic.service';

@Module({
  imports: [],
  controllers: [AuthenticController],
  providers: [AuthenticService],
})
export class AuthenticModule {}
