import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompanyModule } from './company/company.module';
import { StockQuotesModule } from './stock-quotes/stock-quotes.module';

@Module({
  imports: [CompanyModule, StockQuotesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
