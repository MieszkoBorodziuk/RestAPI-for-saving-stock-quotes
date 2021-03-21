import { HttpStatus, Inject, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyService } from '../company/company.service';
import { Company } from '../company/entities/company.entity';
import { Connection, Repository } from 'typeorm';
import { StockQuote } from './entities/stock-quote.entity';
import { GetPaginatedListOfStockQuotesResponse } from './dto/stockQuotes.dto';
import { HttpException } from '@nestjs/common';
import { CreateInstrumentDto } from './dto/create-instrument.dto';

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

  async create(createInstrumentDto: CreateInstrumentDto) {
    const queryRunner = this.connection.createQueryRunner();

    if (createInstrumentDto.highPrice < createInstrumentDto.lowPrice) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: "highPrice must be higher than lowPrice"
      },
        HttpStatus.BAD_REQUEST);
    }

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if(!await this.findCompany(createInstrumentDto.symbol))
      this.companyService.create({name: createInstrumentDto.name, symbol: createInstrumentDto.symbol})
      

      const company = await this.findCompany(createInstrumentDto.symbol);
     

      console.log(company);
      

      if (await queryRunner.manager.findOne(StockQuote, {
        where: {
          company: company.id,
          date: createInstrumentDto.date          
        },
      })) {
        throw new HttpException({
          status: HttpStatus.FORBIDDEN,
          error: 'This stock quote already exists',
        }, HttpStatus.FORBIDDEN);
      }

      const newStockQuote = new StockQuote();
      newStockQuote.openPrice = createInstrumentDto.openPrice;
      newStockQuote.closePrice = createInstrumentDto.closePrice;
      newStockQuote.highPrice = createInstrumentDto.highPrice;
      newStockQuote.lowPrice = createInstrumentDto.lowPrice;
      newStockQuote.date = createInstrumentDto.date;
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

  async findAll(searchTerm: string, pageNumber: number, pageSize: number): Promise<GetPaginatedListOfStockQuotesResponse> {

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
    return await this.stockQuoteRepository.findOneOrFail({
      where: {
        id,
      },
      relations: ['company']
    });
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
