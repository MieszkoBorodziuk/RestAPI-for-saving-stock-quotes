import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { StockQuotesService } from './stock-quotes.service';
import { CreateStockQuoteDto } from './dto/create-stock-quote.dto';
import { UpdateStockQuoteDto } from './dto/update-stock-quote.dto';

@Controller('stock-quotes')
export class StockQuotesController {
  constructor(private readonly stockQuotesService: StockQuotesService) {}

  @Post()
  create(@Body() createStockQuoteDto: CreateStockQuoteDto) {
    return this.stockQuotesService.create(createStockQuoteDto);
  }

  @Get()
  findAll() {
    return this.stockQuotesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockQuotesService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateStockQuoteDto: UpdateStockQuoteDto) {
    return this.stockQuotesService.update(+id, updateStockQuoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockQuotesService.remove(+id);
  }
}
