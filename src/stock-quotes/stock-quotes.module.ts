import { Module } from '@nestjs/common';
import { StockQuotesService } from './stock-quotes.service';
import { StockQuotesController } from './stock-quotes.controller';

@Module({
  controllers: [StockQuotesController],
  providers: [StockQuotesService]
})
export class StockQuotesModule {}
