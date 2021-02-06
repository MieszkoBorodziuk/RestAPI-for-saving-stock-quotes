import { Test, TestingModule } from '@nestjs/testing';
import { StockQuotesController } from './stock-quotes.controller';
import { StockQuotesService } from './stock-quotes.service';

describe('StockQuotesController', () => {
  let controller: StockQuotesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockQuotesController],
      providers: [StockQuotesService],
    }).compile();

    controller = module.get<StockQuotesController>(StockQuotesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
