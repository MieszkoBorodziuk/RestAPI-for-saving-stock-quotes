import { HttpStatus, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyService } from '../company/company.service';
import { Company } from '../company/entities/company.entity';
import { Connection, Repository } from 'typeorm';
import { CreateStockQuoteDto } from './dto/create-stock-quote.dto';
import { StockQuote } from './entities/stock-quote.entity';
import { GetPaginatedListOfStockQotesResponse } from './dto/stockQuotes.dts';
import { HttpException } from '@nestjs/common';

@Injectable()
export class StockQuotesService {

  constructor(
    @Inject(CompanyService) private companyService: CompanyService,
    @InjectRepository(StockQuote) private stockQuoteRepository: Repository<StockQuote>,
    private connection: Connection,
  ) { }

  findCompany = async (symbol: string): Promise<Company> => {
    const company = (await this.companyService.findOneBySymbol(symbol));
    if (company) {
      return company
    };
  }

  async create(companySymbol: string, createStockQuoteDto: CreateStockQuoteDto) {
    const queryRunner = this.connection.createQueryRunner();

    if (createStockQuoteDto.highPrice < createStockQuoteDto.lowPrice) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: "highPrice must be higher than lowPrice"
      },
        HttpStatus.BAD_REQUEST);
    }

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {

      const company = await this.findCompany(companySymbol);

      if (await queryRunner.manager.findOne(StockQuote, {
        where: {
          company: company.id,
          date: createStockQuoteDto.date
        },
      })) {
        throw new HttpException({
          status: HttpStatus.FORBIDDEN,
          error: 'This stock quote already exists',
        }, HttpStatus.FORBIDDEN);
      }

      const newStockQuote = new StockQuote();
      newStockQuote.openPrice = createStockQuoteDto.openPrice;
      newStockQuote.closePrice = createStockQuoteDto.closePrice;
      newStockQuote.highPrice = createStockQuoteDto.highPrice;
      newStockQuote.lowPrice = createStockQuoteDto.lowPrice;
      newStockQuote.date = createStockQuoteDto.date;
      newStockQuote.company = company;

      await queryRunner.manager.save(newStockQuote);
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return newStockQuote;

    } catch (err) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw err;
    }
  }

  async findAll(searchTerm: string, pageNumber: number, pageSize: number): Promise<GetPaginatedListOfStockQotesResponse> {

    const company = await this.companyService.findOneBySymbol(searchTerm);
    if (!company) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: "No company found with this symbol"
      },
        HttpStatus.BAD_REQUEST);
    }


    const [stockQuotes, count] = await this.stockQuoteRepository.findAndCount({

      where: {
        company,
      },
      relations: ['company'],

      skip: pageSize * (pageNumber - 1),
      take: 3
    });

    const pagesCount = Math.ceil(count / pageSize);

    return {
      stockQuotes,
      pagesCount
    };
  }

  async findOne(id: string): Promise<StockQuote> {
    return await this.stockQuoteRepository.findOneOrFail(id);
  }

  async findOneByDate(date: Date, companyId: string): Promise<StockQuote> {


    return await this.stockQuoteRepository.findOne(
      {
        where: {
          company: companyId,
          date,
        },
      });
  }
}
