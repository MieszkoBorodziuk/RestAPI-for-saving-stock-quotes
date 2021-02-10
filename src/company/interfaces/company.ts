export interface CompanyInterface {
    id: string;
    name: string;
    symbol: string;
}

export type GetListCompanyResponse = CompanyInterface[];

export type GetOneCompanyResponse = CompanyInterface;

export interface GetPaginatedListOfCompanyResponse {
    company: CompanyInterface[];
    pagesCount: number;
}
