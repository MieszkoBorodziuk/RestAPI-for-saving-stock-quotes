import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { GetListCompanyResponse, GetOneCompanyResponse } from './interfaces/company';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) { }

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @Get()
  findAll(): Promise<GetListCompanyResponse> {
    return this.companyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<GetOneCompanyResponse> {
    return this.companyService.findOne(id);
  }
}
