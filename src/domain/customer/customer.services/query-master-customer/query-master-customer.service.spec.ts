import { Test, TestingModule } from '@nestjs/testing';
import { QueryMasterCustomerService } from './query-master-customer.service';

describe('QueryMasterCustomerService', () => {
  let service: QueryMasterCustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QueryMasterCustomerService],
    }).compile();

    service = module.get<QueryMasterCustomerService>(QueryMasterCustomerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
