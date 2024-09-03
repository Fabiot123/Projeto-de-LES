/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ClientsController } from './client.controller';
import { ClientsService } from './client.service';
import { PrismaService } from 'src/lib/prisma.service';

@Module({
  imports: [],
  controllers: [ClientsController],
  providers: [ClientsService, PrismaService],
})
export class ClientModule {}
