import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber, Min } from "class-validator";

export class CreateStockQuoteDto {
    @ApiProperty()
    @IsNumber()
    @Min(0)
    price: number;
    @ApiProperty()
    @IsDate()
    @Type(() => Date)
    date: Date;
}
