import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company } from './entities/company.entity';
import { CompanyInterface} from './interfaces/company';

@Injectable()
export class CompanyService {

  constructor(
    @InjectRepository(Company) private companyRepository: Repository<Company>,
  ) { }

  async create(createCompanyDto: CreateCompanyDto) {
    if(this.findOneBySymbol(createCompanyDto.symbol)){
      throw new Error("Company with this symbol already exists");
    }
    const newCompany = new Company();
    newCompany.name = createCompanyDto.name;
    newCompany.symbol = createCompanyDto.symbol;

    await this.companyRepository.save(newCompany);
    return newCompany;
  }

  async findAll(): Promise<CompanyInterface[]> {
    return await this.companyRepository.find({relations:['stockQuote']});
  }

  async findOneBySymbol(symbol: string): Promise<Company> {
    return await this.companyRepository.findOneOrFail({symbol:symbol});
  }

  async findOne(id: string): Promise<CompanyInterface> {
    return await this.companyRepository.findOneOrFail(id);
  }
}
