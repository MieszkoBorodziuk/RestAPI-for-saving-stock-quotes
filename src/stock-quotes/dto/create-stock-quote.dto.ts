import { IsDate, IsNumber, Min, min } from "class-validator";

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
    date: Date;
}
