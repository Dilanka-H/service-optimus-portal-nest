import { Test, TestingModule } from '@nestjs/testing';
import { OptimusomniordersRepository } from './optimusomniorders.repository';

describe('OptimusomniordersRepository', () => {
  let service: OptimusomniordersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OptimusomniordersRepository],
    }).compile();

    service = module.get<OptimusomniordersRepository>(OptimusomniordersRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
