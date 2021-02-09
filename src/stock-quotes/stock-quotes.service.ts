import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyService } from '../company/company.service';
import { Company } from '../company/entities/company.entity';
import { Repository } from 'typeorm';
import { CreateStockQuoteDto } from './dto/create-stock-quote.dto';
import { StockQuote } from './entities/stock-quote.entity';
import { GetPaginatedListOfStockQotesResponse } from './interfaces/stockQuotes';

@Injectable()
export class StockQuotesService {

  constructor(
    @Inject(CompanyService) private companyService: CompanyService,
    @InjectRepository(StockQuote) private stockQuoteRepository: Repository<StockQuote>,
  ) { }

  findCompany = async (symbol: string): Promise<Company> => {
    const company = (await this.companyService.findOneBySymbol(symbol));
    if (company) {
      return company
    }
  }

  async create(companySymbol: string, createStockQuoteDto: CreateStockQuoteDto) {
    if (createStockQuoteDto.highPrice < createStockQuoteDto.lowPrice) {
      throw new Error("highPrice must be higher than lowPrice");
    }

    const company = await this.findCompany(companySymbol);

    if (await this.findOneByDate(createStockQuoteDto.date, company.id)) {
      throw new Error("already exists");
    }

    const newStockQuote = new StockQuote();
    newStockQuote.openPrice = createStockQuoteDto.openPrice;
    newStockQuote.closePrice = createStockQuoteDto.closePrice;
    newStockQuote.highPrice = createStockQuoteDto.highPrice;
    newStockQuote.lowPrice = createStockQuoteDto.lowPrice;
    newStockQuote.date = createStockQuoteDto.date;
    newStockQuote.company = company;

    return this.stockQuoteRepository.save(newStockQuote);
  }

  async findAll(searchTerm: string, currentPage: number = 1): Promise<GetPaginatedListOfStockQotesResponse> {
    const company = await this.companyService.findOneBySymbol(searchTerm);
    if (!company) {
      throw new Error("Company not found");
    }
    const maxPerPage = 3;

    const [stockQuotes, count] = await this.stockQuoteRepository.findAndCount({

      where: {
        company,
      },
      relations: ['company'],

      skip: maxPerPage * (currentPage - 1),
      take: 3
    });

    const pagesCount = Math.ceil(count / maxPerPage);

    return {
      stockQuotes,
      pagesCount
    };

  }

  async findOne(id: string): Promise<StockQuote> {
    return await this.stockQuoteRepository.findOneOrFail(id);
  }

  async findOneByDate(date: Date, companyId): Promise<StockQuote> {
    return await this.stockQuoteRepository.findOne(
      {
        where: {
          company: companyId,
          date: date,
        },
      });
  }
}
