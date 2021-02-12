import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
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
    @Type(() => Date)
    date: Date;
}
