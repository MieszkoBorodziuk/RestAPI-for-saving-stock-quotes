import { PartialType } from '@nestjs/mapped-types';
import { CreateStockQuoteDto } from './create-stock-quote.dto';

export class UpdateStockQuoteDto extends PartialType(CreateStockQuoteDto) {}
