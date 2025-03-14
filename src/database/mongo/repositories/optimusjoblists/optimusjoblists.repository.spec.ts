import { Test, TestingModule } from '@nestjs/testing';
import { OptimusJobListsRepository } from './optimusjoblists.repository';

describe('OptimusJobListsRepository', () => {
  let service: OptimusJobListsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OptimusJobListsRepository],
    }).compile();

    service = module.get<OptimusJobListsRepository>(OptimusJobListsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
