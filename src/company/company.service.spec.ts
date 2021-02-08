import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RepositoryMock, repositoryMockFactory } from '../utils/mockFactory';
import { Repository } from 'typeorm';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company } from './entities/company.entity';

describe('CompanyService', () => {
  let service: CompanyService;
  let repository: RepositoryMock<Repository<Company>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyService,
        { provide: getRepositoryToken(Company), useFactory: repositoryMockFactory }
      ],
    }).compile();

    service = module.get<CompanyService>(CompanyService);
    repository = module.get(getRepositoryToken(Company));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create new company when call create', async () => {
    const request = new CreateCompanyDto();
    request.name = "test";
    request.symbol = "TST";

    const company = new Company();
    company.name = request.name;
    company.symbol = request.symbol;


    repository.save.mockReturnValue(company);

    expect(await service.create(request)).toStrictEqual(company)
  })

  it('should return an array of company when call findAll', async () => {
    const result = [new Company()];

    repository.find.mockReturnValue(result);

    expect(await service.findAll()).toBe(result)
  })

  it('should return empty array of company when repository return empty Array', async () => {
    const result = [];

    repository.find.mockReturnValue(result);

    expect(await service.findAll()).toBe(result)
  })

  it('should return one company when call findOne', async () => {
    const result = new Company();
    result.name = "test";
    result.symbol = "TST";

    repository.findOneOrFail.mockReturnValue(result);

    expect(await service.findOne(result.id)).toBe(result)
  })

  it('should return one company when call findOneBySymbol', async () => {
    const result = new Company();
    result.name = "test";
    result.symbol = "TST";

    repository.findOneOrFail.mockReturnValue(result);

    expect(await service.findOneBySymbol(result.symbol)).toBe(result)
  })
});
