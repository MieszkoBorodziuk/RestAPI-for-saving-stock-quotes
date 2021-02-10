import { Transform, Type } from "class-transformer";
import { IsDate, IsNumber, Min } from "class-validator";

export class CreateStockQuoteDto {
    @IsNumber()
    @Min(0)
    openPrice: number;
    @IsNumber()
    @Min(0)
    highPrice: number;
    @IsNumber()
    @Min(0)
    lowPrice: number;
    @IsNumber()
    @Min(0)
    closePrice: number;
    @IsDate()
    @Type(_ => Date)
    date: Date;
}
