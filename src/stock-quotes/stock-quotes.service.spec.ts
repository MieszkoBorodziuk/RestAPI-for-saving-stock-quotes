import { Test, TestingModule } from '@nestjs/testing';
import { StockQuotesService } from './stock-quotes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StockQuote } from './entities/stock-quote.entity';
import { RepositoryMock, repositoryMockFactory } from '../utils/mockFactory';
import { Connection, QueryRunner, Repository } from 'typeorm';
import { CompanyService } from '../company/company.service';
import { Company } from '../company/entities/company.entity';
import { CreateStockQuoteDto } from './dto/create-stock-quote.dto';
import { uuidv4 } from '../utils/uuid';
import { HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { CreateInstrumentDto } from './dto/create-instrument.dto';

describe('StockQuotesService', () => {
  let service: StockQuotesService;
  let repository: RepositoryMock<Repository<StockQuote>>;
  let companyService: CompanyService;
  let connection;
  const mockConnection = () => ({
    transaction: jest.fn(),
    createQueryRunner: jest.fn()
  });

  const qr = {
    manager: {},
  } as QueryRunner;

  class ConnectionMock {
    createQueryRunner(mode?: "master" | "slave"): QueryRunner {
      return qr;
    }
  }


  const companyServiceMock = {
    findOne: jest.fn(),
    create: jest.fn(),
    findAll: jest.fn(),
    findOneBySymbol: jest.fn(),
  };

  beforeEach(async () => {
    Object.assign(qr.manager, {
      save: jest.fn(),
      findOne: jest.fn()
    });
    qr.connect = jest.fn();
    qr.release = jest.fn();
    qr.startTransaction = jest.fn();
    qr.commitTransaction = jest.fn();
    qr.rollbackTransaction = jest.fn();
    qr.release = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StockQuotesService,
        { provide: getRepositoryToken(StockQuote), useFactory: repositoryMockFactory },
        { provide: CompanyService, useValue: companyServiceMock },
        { provide: Connection, useFactory: mockConnection, useClass: ConnectionMock }
      ],
    }).compile();

    service = module.get<StockQuotesService>(StockQuotesService);
    companyService = module.get<CompanyService>(CompanyService);
    repository = module.get(getRepositoryToken(StockQuote));
    connection = await module.get<Connection>(Connection);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const generateRequest = () => {
    const request = new CreateInstrumentDto();
    request.name = "Test",
      request.symbol = "TST"
    request.openPrice = 1;
    request.closePrice = 2;
    request.highPrice = 3;
    request.lowPrice = 1;
    request.date = new Date(1995, 11, 17, 3, 24, 0);
    return request;
  }

  const generateStockQuoteFromRequest = (request, company) => {
    const stockQuote = new StockQuote();
    stockQuote.id = uuidv4();
    stockQuote.openPrice = request.openPrice;
    stockQuote.closePrice = request.closePrice;
    stockQuote.highPrice = request.highPrice;
    stockQuote.lowPrice = request.lowPrice;
    stockQuote.date = request.date;
    stockQuote.company = company;
    return stockQuote;
  }

  const generateStockQuote = () => {
    const stockQuote = new StockQuote();
    stockQuote.id = uuidv4();
    stockQuote.openPrice = 1;
    stockQuote.closePrice = 2;
    stockQuote.highPrice = 5;
    stockQuote.lowPrice = 1;
    stockQuote.date = new Date(1995, 11, 17, 3, 24, 0);
    stockQuote.company = new Company();
    return stockQuote;
  }

  it('should create new StockQuote when call create', async () => {

    const request = generateRequest();

    const queryRunner = connection.createQueryRunner();


    const company = new Company();
    company.name = "Test"
    company.symbol = "TST"

    const stockQuote = generateStockQuoteFromRequest(request, company);


    companyService.findOneBySymbol = jest.fn().mockReturnValue(company);
    queryRunner.manager.findOne.mockReturnValue(null);
    queryRunner.manager.save.mockReturnValue(stockQuote);

    const testService = await service.create(request);
    stockQuote.id = undefined;
    expect(queryRunner.manager.save).toHaveBeenCalledWith(stockQuote);
    expect(testService).toEqual(stockQuote);
  })

  it('should create new StockQuote when call create and already exists ', async () => {

    const request = generateRequest();
    const queryRunner = connection.createQueryRunner();

    const company = new Company();
    company.id = uuidv4();
    company.name = "Test"
    company.symbol = "TST"

    const stockQuote = generateStockQuoteFromRequest(request, company);

    companyService.findOneBySymbol = jest.fn().mockReturnValue(company);
    queryRunner.manager.findOne.mockReturnValue(stockQuote);
    queryRunner.manager.save.mockReturnValue(stockQuote);

    await expect(service.create(request)).rejects.toStrictEqual(new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'This stock quote already exists',
    }, HttpStatus.FORBIDDEN))
  })

  it('should create new StockQuote when call create and lowPrice is higher than highPrice', async () => {

    const request = generateRequest();
    const queryRunner = connection.createQueryRunner();
    request.lowPrice = 10;

    const company = new Company();
    company.id = uuidv4();
    company.name = "Test"
    company.symbol = "TST"

    const stockQuote = generateStockQuoteFromRequest(request, company);

    companyService.findOneBySymbol = jest.fn().mockReturnValue(company);
    queryRunner.manager.findOne.mockReturnValue(null)
    queryRunner.manager.save.mockReturnValue(stockQuote);

    await expect(service.create(request)).rejects.toStrictEqual(new HttpException({
      status: HttpStatus.BAD_REQUEST,
      error: "highPrice must be higher than lowPrice"
    },
      HttpStatus.BAD_REQUEST))
  })

  it('should return an array of StockQote when call findAll', async () => {
    const dbStockQoutes = [generateStockQuote(), generateStockQuote()]
    const result = [dbStockQoutes, 2];


    repository.findAndCount.mockReturnValue(result);

    expect(await service.findAll('test', 1, 3)).toStrictEqual({ stockQuotes: dbStockQoutes, pagesCount: 1 })
  })

  it('should return empty array of StockQuote when repository return empty Array', async () => {
    const result = [[], 1];

    repository.findAndCount.mockReturnValue(result);

    expect(await service.findAll('test', 1, 5)).toStrictEqual({ stockQuotes: [], pagesCount: 1 })
  })

  it('should return one StockQuote when call findOne', async () => {
    const result = generateStockQuote();

    repository.findOneOrFail.mockReturnValue(result);

    expect(await service.findOne(result.id)).toBe(result)
  })
});
