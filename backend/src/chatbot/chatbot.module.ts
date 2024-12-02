/* eslint-disable prettier/prettier */
// meu-chatbot-backend/src/app.module.ts
import { Module } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { LivrosService } from '../products/products.service';
import { ChatbotController } from './chatbot.controller';

@Module({
  controllers: [ChatbotController],
  providers: [ChatbotService, LivrosService],
})
export class ChatbotModule {}
