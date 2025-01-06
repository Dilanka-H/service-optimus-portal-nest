import { Test, TestingModule } from '@nestjs/testing';
import { QueryPoListService } from './query-po-list.service';

describe('QueryPoListService', () => {
  let service: QueryPoListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QueryPoListService],
    }).compile();

    service = module.get<QueryPoListService>(QueryPoListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
