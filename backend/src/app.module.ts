/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ClientModule } from './clients/client.module';

@Module({
  imports: [ClientModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
