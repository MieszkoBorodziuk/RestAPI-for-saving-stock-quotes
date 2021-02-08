import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockQuotesService } from './stock-quotes.service';
import { StockQuotesController } from './stock-quotes.controller';
import { StockQuote } from './entities/stock-quote.entity';
import { CompanyModule } from 'src/company/company.module';


@Module({
  imports: [
    CompanyModule,
    TypeOrmModule.forFeature([StockQuote])
  ],
  controllers: [StockQuotesController],
  providers: [StockQuotesService],
})
export class StockQuotesModule { }
