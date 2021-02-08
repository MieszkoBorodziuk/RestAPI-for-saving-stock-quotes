import { IsString, Length, Min } from "class-validator";

export class CreateCompanyDto {
    @IsString()
    @Length(0,100)
    name: string;

    @IsString()
    @Length(1,10)
    symbol: string;
}
