import { Controller, Get, Post, Body, Param} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CompanyInterface, GetOneCompanyResponse, GetPaginatedListOfCompanyResponse } from './interfaces/company';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) { }

  @Post()
  create
    (@Body() createCompanyDto: CreateCompanyDto,
    ): Promise<CompanyInterface> {
    return this.companyService.create(createCompanyDto);
  }

  @Get('/:pageNumber')
  findAll(
    @Param('pageNumber') pageNumber: string,
  ): Promise<GetPaginatedListOfCompanyResponse> {
    return this.companyService.findAll(Number(pageNumber));
  }

  @Get(':id')
  findOne
    (@Param('id') id: string,
    ): Promise<GetOneCompanyResponse> {
    return this.companyService.findOne(id);
  }
}
