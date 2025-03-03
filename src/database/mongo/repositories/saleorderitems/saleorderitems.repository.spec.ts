import { Test, TestingModule } from '@nestjs/testing';
import { SaleOrderItemsRepository } from './saleorderitems.repository';

describe('SaleOrderItemsRepository', () => {
  let service: SaleOrderItemsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SaleOrderItemsRepository],
    }).compile();

    service = module.get<SaleOrderItemsRepository>(SaleOrderItemsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
