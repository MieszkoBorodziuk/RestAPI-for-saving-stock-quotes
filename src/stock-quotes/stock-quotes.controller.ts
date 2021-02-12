import { Controller, Get, Post, Body, Param, Query, DefaultValuePipe } from '@nestjs/common';
import { StockQuotesService } from './stock-quotes.service';
import { CreateStockQuoteDto } from './dto/create-stock-quote.dto';
import { GetOneStockQutesResponse, GetPaginatedListOfStockQotesResponse, StockQutesResponse } from './interfaces/stockQuotes';
import { ApiBody, ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';

@Controller('company/:company/stock-quotes')
export class StockQuotesController {
  constructor(private readonly stockQuotesService: StockQuotesService) { }

  @ApiBody({ type: CreateStockQuoteDto })
  @ApiCreatedResponse({
    type: StockQutesResponse
  })
  @ApiResponse({ status: 400, description: 'Not all required information provided' })
  @ApiResponse({ status: 403, description: 'This stock quote already exists' })
  @ApiResponse({ status: 500, description: 'Something went wrong with the POST method' })
  @Post('/')
  create
    (@Param('company') company: string,
      @Body() createStockQuoteDto: CreateStockQuoteDto,
  ): Promise<StockQutesResponse> {
    return this.stockQuotesService.create(company, createStockQuoteDto);
  }

  @ApiResponse({
    status: 200,
    type: GetPaginatedListOfStockQotesResponse
  })
  @ApiResponse({ status: 400, description: 'No found company with this symbol' })
  @ApiResponse({ status: 500, description: 'Something went wrong with the GET method' })
  @Get('/')
  findAll(
    @Param('company') company: string,
    @Query('pageNumber', new DefaultValuePipe(1)) pageNumber: number,
    @Query('pageSize', new DefaultValuePipe(5)) pageSize: number,
  ): Promise<GetPaginatedListOfStockQotesResponse> {
    return this.stockQuotesService.findAll(company, pageNumber, pageSize);
  }

  @ApiResponse({
    status: 200,
    type: StockQutesResponse
  })
  @ApiResponse({ status: 500, description: 'Something went wrong with the GET method' })
  @Get(':id')
  findOne(
    @Param('id') id: string,
  ): Promise<GetOneStockQutesResponse> {
    return this.stockQuotesService.findOne(id);
  }
}
