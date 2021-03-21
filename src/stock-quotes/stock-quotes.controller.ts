import { Controller, Get, Post, Body, Param, Query, DefaultValuePipe } from '@nestjs/common';
import { StockQuotesService } from './stock-quotes.service';
import { GetOneStockQuotesResponse, GetPaginatedListOfStockQuotesResponse, InstrumentResponse, StockQuotesResponse } from './dto/stockQuotes.dto';
import { ApiBody, ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';
import { CreateInstrumentDto } from './dto/create-instrument.dto';

@Controller('company/stock-quotes')
export class StockQuotesController {
  constructor(private readonly stockQuotesService: StockQuotesService) { }

  @ApiBody({ type: CreateInstrumentDto })
  @ApiCreatedResponse({
    type: InstrumentResponse
  })
  @ApiResponse({ status: 400, description: 'Not all required information provided' })
  @ApiResponse({ status: 403, description: 'This stock quote already exists' })
  @ApiResponse({ status: 500, description: 'Something went wrong with the POST method' })
  @Post('/')
  create
    (@Body() createInstrumentDto: CreateInstrumentDto
    ): Promise<StockQuotesResponse> {
    return this.stockQuotesService.create(createInstrumentDto);
  }

  @ApiResponse({
    status: 200,
    type: GetPaginatedListOfStockQuotesResponse
  })
  @ApiResponse({ status: 400, description: 'No found company with this symbol' })
  @ApiResponse({ status: 500, description: 'Something went wrong with the GET method' })
  @Get('/:company')
  findAll(
    @Param('company') company: string,
    @Query('pageNumber', new DefaultValuePipe(1)) pageNumber: number,
    @Query('pageSize', new DefaultValuePipe(5)) pageSize: number,
  ): Promise<GetPaginatedListOfStockQuotesResponse> {
    return this.stockQuotesService.findAll(company, pageNumber, pageSize);
  }

  @ApiResponse({
    status: 200,
    type: InstrumentResponse
  })
  @ApiResponse({ status: 500, description: 'Something went wrong with the GET method' })
  @Get('id/:id')
  findOne(
    @Param('id') id: string,
  ): Promise<GetOneStockQuotesResponse> {
    return this.stockQuotesService.findOne(id);
  }
}
