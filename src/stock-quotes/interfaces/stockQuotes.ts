export interface StockQutesInterface {
    id: string;
    openPrice: number;
    highPrice: number;
    lowPrice: number;
    closePrice: number;
    date: Date;
}

export type GetListStockQuotesResponse = StockQutesInterface[];

export type GetOneStockQutesResponse = StockQutesInterface;

export interface GetPaginatedListOfStockQotesResponse {
    stockQuotes: StockQutesInterface[];
    pagesCount: number;
}