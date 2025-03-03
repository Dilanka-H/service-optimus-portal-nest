import { Test, TestingModule } from '@nestjs/testing';
import { SaleOrderJobListsRepository } from './saleorderjoblists.repository';

describe('SaleOrderJobListsRepository', () => {
  let service: SaleOrderJobListsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SaleOrderJobListsRepository],
    }).compile();

    service = module.get<SaleOrderJobListsRepository>(SaleOrderJobListsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
