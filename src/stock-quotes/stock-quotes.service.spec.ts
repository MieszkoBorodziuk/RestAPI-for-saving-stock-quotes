import { Test, TestingModule } from '@nestjs/testing';
import { StockQuotesService } from './stock-quotes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StockQuote } from './entities/stock-quote.entity';
import { RepositoryMock, repositoryMockFactory} from '../utils/mockFactory';
import { Repository } from 'typeorm';
import { CompanyService } from '../company/company.service';
import { Company } from '../company/entities/company.entity';
import { CreateStockQuoteDto } from './dto/create-stock-quote.dto';

describe('StockQuotesService', () => {
  let service: StockQuotesService;
  let repository: RepositoryMock<Repository<StockQuote>>;
  let companyService: CompanyService;

  const companyServiceMock = {
    findOne: jest.fn(),
    create: jest.fn(),
    findAll: jest.fn(),
    findOneBySymbol: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StockQuotesService,
        { provide: getRepositoryToken(StockQuote), useFactory: repositoryMockFactory },
        { provide: CompanyService, useValue: companyServiceMock }
      ],
    }).compile();

    service = module.get<StockQuotesService>(StockQuotesService);
    companyService = module.get<CompanyService>(CompanyService);
    repository = module.get(getRepositoryToken(StockQuote));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create new StockQuote when call create', async () => {

    const request = new CreateStockQuoteDto();
    request.openPrice = 1;
    request.closePrice = 2;
    request.highPrice = 3;
    request.lowPrice = 1;
    request.date = new Date(1995,11,17,3,24,0);

    const company = new Company();
    company.name = "Test"
    company.symbol = "TST"

    const stockQuote = new StockQuote();
    stockQuote.openPrice = request.openPrice;
    stockQuote.closePrice = request.closePrice;
    stockQuote.highPrice = request.highPrice;
    stockQuote.lowPrice = request.lowPrice;
    stockQuote.date = request.date;
    stockQuote.company = company;

    companyService.findOneBySymbol = jest.fn().mockReturnValue(company);
    repository.save.mockReturnValue(stockQuote);

    expect(await service.create(company.symbol, request)).toStrictEqual(stockQuote)
  })


  it('should return an array of StockQote when call findAll', async () => {
    const result = [new StockQuote()];

    repository.find.mockReturnValue(result);

    expect(await service.findAll('test')).toBe(result)
  })

  it('should return empty array of StockQuote when repository return empty Array', async () => {
    const result = [];

    repository.find.mockReturnValue(result);

    expect(await service.findAll('test')).toBe(result)
  })

  it('should return one StockQuote when call findOne', async () => {
    const company = new Company();
    const result = new StockQuote();
    result.openPrice = 1;
    result.closePrice = 2;
    result.highPrice = 3;
    result.lowPrice = 1;
    result.date = new Date(1995,11,17,3,24,0);
    result.company = company;

    repository.findOneOrFail.mockReturnValue(result); 

    expect(await service.findOne(result.id)).toBe(result)
  })
});
