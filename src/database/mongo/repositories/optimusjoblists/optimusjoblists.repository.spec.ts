import { Test, TestingModule } from '@nestjs/testing';
import { OptimusjoblistsRepository } from './optimusjoblists.repository';

describe('OptimusjoblistsRepository', () => {
  let service: OptimusjoblistsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OptimusjoblistsRepository],
    }).compile();

    service = module.get<OptimusjoblistsRepository>(OptimusjoblistsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
