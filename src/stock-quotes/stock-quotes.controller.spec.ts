import { Test, TestingModule } from '@nestjs/testing';
import { StockQuotesController } from './stock-quotes.controller';
import { StockQuotesService } from './stock-quotes.service';

describe('StockQuotesController', () => {
  let controller: StockQuotesController;
  let service: StockQuotesService;

  const stockQuoteServiceMock = {
    findOne: jest.fn(),
    create: jest.fn(),
    findAll: jest.fn(),
    findOneBySymbol: jest.fn(),
  };


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockQuotesController],
      providers: [StockQuotesService,
        {provide: StockQuotesService , useValue: stockQuoteServiceMock}
      ],
    }).compile();

    controller = module.get<StockQuotesController>(StockQuotesController);
    service = module.get<StockQuotesService>(StockQuotesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
