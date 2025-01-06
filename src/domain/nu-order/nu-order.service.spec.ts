import { Test, TestingModule } from '@nestjs/testing';
import { NuOrderService } from './nu-order.service';

describe('NuOrderService', () => {
  let service: NuOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NuOrderService],
    }).compile();

    service = module.get<NuOrderService>(NuOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
