import { ApiProperty } from "@nestjs/swagger";
import { CompanyResponse } from "src/company/dto/company.dto.";
import { Company } from "src/company/entities/company.entity";

export class StockQuotesResponse {
    @ApiProperty()
    id: string;
    @ApiProperty()
    price: number;
    @ApiProperty()
    date: Date; 
}

export class InstrumentResponse extends StockQuotesResponse{
    @ApiProperty({type: CompanyResponse})
    company: Company;
}

export type GetListStockQuotesResponse = StockQuotesResponse[];

export type GetOneStockQuotesResponse = InstrumentResponse;


export class GetPaginatedListOfStockQuotesResponse {
    @ApiProperty({ type: [InstrumentResponse]})
    stockQuotes: StockQuotesResponse[];
    @ApiProperty()
    pagesCount: number;
}