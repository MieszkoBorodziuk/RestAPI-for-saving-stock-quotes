import { ApiProperty } from "@nestjs/swagger";

export class CompanyResponse {
    @ApiProperty()
    id: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    symbol: string;
}

export type GetListCompanyResponse = CompanyResponse[];

export type GetOneCompanyResponse = CompanyResponse;

export class GetPaginatedListOfCompanyResponse {
    @ApiProperty({ type: [CompanyResponse]})
    company: CompanyResponse[];
    @ApiProperty()
    pagesCount: number;
}
