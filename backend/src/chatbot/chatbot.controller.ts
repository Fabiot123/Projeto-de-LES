/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { ChatMessage } from '../types/chat';
import { LivrosService } from '../products/products.service';

@Controller('chat')
export class ChatbotController {
  constructor(
    private readonly chatbotService: ChatbotService,
    private readonly livrosService: LivrosService,
  ) {}

  @Post()
  async getChatResponse(
    @Body('prompt') prompt: string,
    @Body('messages') messages: ChatMessage[],
  ) {
    const livros = await this.livrosService.getAllLivros();
    const availableBooks = livros.map((livro) => ({
      title: livro.lvr_ttl,
      category: livro.lvr_cat[0] ? livro.lvr_cat[0].cat_nome : 'Uncategorized',
      synopsis: livro.lvr_snp,
    }));

    const response = await this.chatbotService.getResponse(
      prompt,
      messages,
      availableBooks,
    );

    if (response.message) {
      return { message: response.message };
    } else {
      return { bookName: response.bookName, synopsis: response.synopsis };
    }
  }
}
