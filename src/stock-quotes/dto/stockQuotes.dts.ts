import { ApiProperty } from "@nestjs/swagger";

export class StockQutesResponse {
    @ApiProperty()
    id: string;
    @ApiProperty()
    openPrice: number;
    @ApiProperty()
    highPrice: number;
    @ApiProperty()
    lowPrice: number;
    @ApiProperty()
    closePrice: number;
    @ApiProperty()
    date: Date;
}

export type GetListStockQuotesResponse = StockQutesResponse[];

export type GetOneStockQutesResponse = StockQutesResponse;

export class GetPaginatedListOfStockQotesResponse {
    @ApiProperty({ type: [StockQutesResponse]})
    stockQuotes: StockQutesResponse[];
    @ApiProperty()
    pagesCount: number;
}