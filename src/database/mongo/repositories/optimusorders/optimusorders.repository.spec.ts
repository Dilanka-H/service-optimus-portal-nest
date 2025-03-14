import { Test, TestingModule } from '@nestjs/testing';
import { OptimusOrdersRepository } from './optimusorders.repository';

describe('OptimusOrdersRepository', () => {
  let service: OptimusOrdersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OptimusOrdersRepository],
    }).compile();

    service = module.get<OptimusOrdersRepository>(OptimusOrdersRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
