/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { bookSearchPrompt, BookSearchProps } from './chatbot.utils';
import { ChatMessage } from '../types/chat';

@Injectable()
export class ChatbotService {
  private genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  async getResponse(
    message: string,
    messages: ChatMessage[],
    availableBooks: { title: string; category: string; synopsis: string }[],
  ): Promise<{ bookName?: string; synopsis?: string; message?: string }> {
    const promptProps: BookSearchProps = { message, messages, availableBooks };
    const prompt = bookSearchPrompt(promptProps);

    const model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = JSON.parse(result.response.text());

    if (response.message) {
      return { message: response.message };
    } else {
      return { bookName: response.bookName, synopsis: response.synopsis };
    }
  }
}
