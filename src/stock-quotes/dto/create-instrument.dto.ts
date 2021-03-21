import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber, Min,IsString, Length } from "class-validator";

export class CreateInstrumentDto {
    @ApiProperty()
    @IsString()
    @Length(1,10)
    symbol: string;
    @ApiProperty()
    @IsNumber()
    @Min(0)
    price: number;
    @ApiProperty()
    @IsDate()
    @Type(() => Date)
    date: Date;
}
