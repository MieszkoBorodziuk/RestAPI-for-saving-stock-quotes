import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { StockQuotesService } from './stock-quotes.service';
import { CreateStockQuoteDto } from './dto/create-stock-quote.dto';
import { GetOneStockQutesResponse, GetPaginatedListOfStockQotesResponse } from './interfaces/stockQuotes';

@Controller('company/:company/stock-quotes')
export class StockQuotesController {
  constructor(private readonly stockQuotesService: StockQuotesService) { }

  @Post()
  create
    (@Param('company') company: string,
      @Body() createStockQuoteDto: CreateStockQuoteDto,
  ) {
    return this.stockQuotesService.create(company, createStockQuoteDto);
  }

  @Get('/:pageNumber')
  findAll(
    @Param('company',) company: string,
    @Param('pageNumber') pageNumber: string,
  ): Promise<GetPaginatedListOfStockQotesResponse> {
    return this.stockQuotesService.findAll(company, Number(pageNumber));
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
  ): Promise<GetOneStockQutesResponse> {
    return this.stockQuotesService.findOne(id);
  }
}
