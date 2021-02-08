import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { StockQuotesService } from './stock-quotes.service';
import { CreateStockQuoteDto } from './dto/create-stock-quote.dto';
import { GetListStockQuotesResponse, GetOneStockQutesResponse } from './interfaces/stockQuotes';

@Controller('company/:company/stock-quotes')
export class StockQuotesController {
  constructor(private readonly stockQuotesService: StockQuotesService) {}

  @Post()
  create(@Param('company') company: string, @Body() createStockQuoteDto: CreateStockQuoteDto) {
    return this.stockQuotesService.create(company, createStockQuoteDto);
  }

  @Get()
  findAll(@Param('company') company: string,): Promise<GetListStockQuotesResponse> {
    return this.stockQuotesService.findAll(company);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<GetOneStockQutesResponse> {
    return this.stockQuotesService.findOne(id);
  }
  
}
