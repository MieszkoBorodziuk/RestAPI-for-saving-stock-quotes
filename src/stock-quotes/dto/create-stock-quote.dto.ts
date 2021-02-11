import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNumber, Min } from "class-validator";

export class CreateStockQuoteDto {
    @ApiProperty()
    @IsNumber()
    @Min(0)
    openPrice: number;
    @ApiProperty()
    @IsNumber()
    @Min(0)
    highPrice: number;
    @ApiProperty()
    @IsNumber()
    @Min(0)
    lowPrice: number;
    @ApiProperty()
    @IsNumber()
    @Min(0)
    closePrice: number;
    @ApiProperty()
    @IsDate()
    @Type(_ => Date)
    date: Date;
}
