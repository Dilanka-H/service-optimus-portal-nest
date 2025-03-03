import { Test, TestingModule } from '@nestjs/testing';
import { OptimusordersRepository } from './optimusorders.repository';

describe('OptimusordersRepository', () => {
  let service: OptimusordersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OptimusordersRepository],
    }).compile();

    service = module.get<OptimusordersRepository>(OptimusordersRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
