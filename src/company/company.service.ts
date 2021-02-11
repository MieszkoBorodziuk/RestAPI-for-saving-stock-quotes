import { HttpException, HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company } from './entities/company.entity';
import { CompanyResponse, GetPaginatedListOfCompanyResponse } from './interfaces/company';

@Injectable()
export class CompanyService {

  constructor(
    @InjectRepository(Company) private companyRepository: Repository<Company>,
  ) { }

  async create(createCompanyDto: CreateCompanyDto) {
    if (await this.findOneBySymbol(createCompanyDto.symbol)) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Company with this symbol already exists',
      }, HttpStatus.FORBIDDEN);
    }
    const newCompany = new Company();
    newCompany.name = createCompanyDto.name;
    newCompany.symbol = createCompanyDto.symbol;

    await this.companyRepository.save(newCompany);
    return newCompany;
  }

  async findAll(pageNumber: number, pageSize: number): Promise<GetPaginatedListOfCompanyResponse> {

    const [company, count] = await this.companyRepository.findAndCount({
      skip: pageSize * (pageNumber - 1),
      take: pageSize
    });

    const pagesCount = Math.ceil(count / pageSize);

    return {
      company,
      pagesCount
    };
  }

  async findOneBySymbol(symbol: string): Promise<Company> {
    return await this.companyRepository.findOne({ symbol: symbol });
  }

  async findOne(id: string): Promise<CompanyResponse> {
    return await this.companyRepository.findOneOrFail(id);
  }
}
