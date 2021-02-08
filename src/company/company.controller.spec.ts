import { Test, TestingModule } from '@nestjs/testing';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';

describe('CompanyController', () => {
  let controller: CompanyController;
  let service: CompanyService;

  const CompanyServiceMock = {
    findOne: jest.fn(),
    create: jest.fn(),
    findAll: jest.fn(),
    findOneBySymbol: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyController],
      providers: [CompanyService,
        {provide: CompanyService , useValue: CompanyServiceMock}
      ],
    }).compile();

    controller = module.get<CompanyController>(CompanyController);
    service = module.get<CompanyService>(CompanyService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });  
});
