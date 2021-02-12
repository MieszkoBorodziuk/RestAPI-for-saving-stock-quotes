import { DefaultValuePipe } from '@nestjs/common';
import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CompanyResponse, GetOneCompanyResponse, GetPaginatedListOfCompanyResponse } from './dto/companydto.';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) { }

  @ApiBody({ type: CreateCompanyDto })
  @ApiCreatedResponse({
    type: CompanyResponse
  })
  @ApiResponse({ status: 400, description: 'Not all required information provided' })
  @ApiResponse({ status: 403, description: 'This company already exists' })
  @ApiResponse({ status: 500, description: 'Something went wrong with the POST method' })
  @Post()
  create
    (@Body() createCompanyDto: CreateCompanyDto,
  ): Promise<CompanyResponse> {
    return this.companyService.create(createCompanyDto);
  }

  @ApiResponse({
    status: 200,
    type: GetPaginatedListOfCompanyResponse
  })
  @ApiResponse({ status: 500, description: 'Something went wrong with the GET method' })
  @Get('/')
  findAll(
    @Query('pageNumber', new DefaultValuePipe(1)) pageNumber: number,
    @Query('pageSize', new DefaultValuePipe(3)) pageSize: number,
  ): Promise<GetPaginatedListOfCompanyResponse> {
    return this.companyService.findAll(pageNumber, pageSize);
  }

  @ApiResponse({
    status: 200,
    type: CompanyResponse
  })
  @ApiResponse({ status: 500, description: 'Something went wrong with the GET method' })
  @Get(':id')
  findOne
    (@Param('id') id: string,
  ): Promise<GetOneCompanyResponse> {
    return this.companyService.findOne(id);
  }
}
