import { Test, TestingModule } from '@nestjs/testing';
import { OptimusOmniOrdersRepository } from './optimusomniorders.repository';

describe('OptimusOmniOrdersRepository', () => {
  let service: OptimusOmniOrdersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OptimusOmniOrdersRepository],
    }).compile();

    service = module.get<OptimusOmniOrdersRepository>(OptimusOmniOrdersRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
