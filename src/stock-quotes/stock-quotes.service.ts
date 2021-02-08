
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyService } from '../company/company.service';
import { Company } from '../company/entities/company.entity';
import { Repository } from 'typeorm';
import { CreateStockQuoteDto } from './dto/create-stock-quote.dto';
import { StockQuote } from './entities/stock-quote.entity';
import { StockQutesInterface } from './interfaces/stockQuotes';

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
    if(createStockQuoteDto.highPrice < createStockQuoteDto.lowPrice){
      throw new Error("highPrice must be higher than lowPrice");
    }
    const newStockQuote = new StockQuote();
    newStockQuote.openPrice = createStockQuoteDto.openPrice;
    newStockQuote.closePrice = createStockQuoteDto.closePrice;
    newStockQuote.highPrice = createStockQuoteDto.highPrice;
    newStockQuote.lowPrice = createStockQuoteDto.lowPrice;
    newStockQuote.date = createStockQuoteDto.date;

    newStockQuote.company = await this.findCompany(companySymbol);
    await this.stockQuoteRepository.save(newStockQuote);

    return newStockQuote;
  }

  async findAll(searchTerm: string): Promise<StockQutesInterface[]> {
    const company = await this.companyService.findOneBySymbol(searchTerm);
    if (!company) {
      throw new Error("Company not found");
    }
    return await this.stockQuoteRepository.find(
      {
        where: {
          company,
        },
        relations: ['company']
      });
  }

  async findOne(id: string): Promise<StockQuote> {
    return await this.stockQuoteRepository.findOneOrFail(id);
  }
}
