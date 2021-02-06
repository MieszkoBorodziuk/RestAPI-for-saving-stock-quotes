import { Test, TestingModule } from '@nestjs/testing';
import { StockQuotesService } from './stock-quotes.service';

describe('StockQuotesService', () => {
  let service: StockQuotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockQuotesService],
    }).compile();

    service = module.get<StockQuotesService>(StockQuotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
