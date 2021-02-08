import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompanyModule } from './company/company.module';
import { StockQuotesModule } from './stock-quotes/stock-quotes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    CompanyModule, 
    StockQuotesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
