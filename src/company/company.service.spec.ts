import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RepositoryMock, repositoryMockFactory } from '../utils/mockFactory';
import { Repository } from 'typeorm';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company } from './entities/company.entity';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { uuidv4 } from '../utils/uuid';


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

  const generateRequest = () => {
    const request = new CreateCompanyDto();
    request.symbol = "TST";
    return request;
  }

  const generateCompanyFromRequest = (request) => {
    const company = new Company();
    company.symbol = request.symbol;
    return company;
  }

  const generateCompany = () => {
    const company = new Company();
    company.id = uuidv4();
    company.symbol = "TST";
    return company;
  }

  it('should create new company when call create', async () => {
    const request = generateRequest();
    const company = generateCompanyFromRequest(request);
    
    repository.findOne.mockReturnValue(null);
    repository.save.mockReturnValue(company);

    expect(await service.create(request)).toEqual(company);
  })

  it('should throw error when call creat and company.symbol is already exists', async () => {
    const request = generateRequest();
    const company = generateCompanyFromRequest(request);

    repository.findOneOrFail.mockReturnValue(company);
    repository.save.mockReturnValue(company);

    await expect(service.create(request)).rejects.toEqual(new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'Company with this symbol already exists',
    }, HttpStatus.FORBIDDEN));
  })

  it('should return an array of company when call findAll', async () => {

    repository.findAndCount.mockReturnValue([[new Company()], 1]);

    expect(await service.findAll(1, 3)).toStrictEqual({ company: [new Company()], pagesCount: 1 });
  })

  it('should return empty array of company when repository return empty Array', async () => {

    repository.findAndCount.mockReturnValue([[], 1]);

    expect(await service.findAll(1, 3)).toStrictEqual({ company: [], pagesCount: 1 })
  })

  it('should return one company when call findOne', async () => {
    const result = generateCompany();

    repository.findOneOrFail.mockReturnValue(result);

    expect(await service.findOne(result.id)).toBe(result);
  })

  it('should return one company when call findOneBySymbol', async () => {
    const result = generateCompany();

    repository.findOne.mockReturnValue(result);

    expect(await service.findOneBySymbol(result.symbol)).toBe(result);
  })
});
