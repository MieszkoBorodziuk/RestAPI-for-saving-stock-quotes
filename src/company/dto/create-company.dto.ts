import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class CreateCompanyDto {
    @ApiProperty()
    @IsString()
    @Length(0,100)
    name: string;
    @ApiProperty()
    @IsString()
    @Length(1,10)
    symbol: string;
}
