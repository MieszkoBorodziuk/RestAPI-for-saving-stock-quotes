import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company } from './entities/company.entity';
import { CompanyInterface, GetPaginatedListOfCompanyResponse } from './interfaces/company';

@Injectable()
export class CompanyService {

  constructor(
    @InjectRepository(Company) private companyRepository: Repository<Company>,
  ) { }

  async create(createCompanyDto: CreateCompanyDto) {
    if (await this.findOneBySymbol(createCompanyDto.symbol)) {
      throw new Error("Company with this symbol already exists");
    }
    const newCompany = new Company();
    newCompany.name = createCompanyDto.name;
    newCompany.symbol = createCompanyDto.symbol;

    await this.companyRepository.save(newCompany);
    return newCompany;
  }

  async findAll(currentPage: number = 1): Promise<GetPaginatedListOfCompanyResponse> {
    const maxPerPage = 3;

    const [company, count] = await this.companyRepository.findAndCount({
      skip: maxPerPage * (currentPage - 1),
      take: 3
    });

    const pagesCount = Math.ceil(count / maxPerPage);
    return {
      company,
      pagesCount
    };
  }

  async findOneBySymbol(symbol: string): Promise<Company> {
    return await this.companyRepository.findOne({ symbol: symbol });
  }

  async findOne(id: string): Promise<CompanyInterface> {
    return await this.companyRepository.findOneOrFail(id);
  }
}
