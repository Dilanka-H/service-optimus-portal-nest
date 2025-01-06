import { Test, TestingModule } from '@nestjs/testing';
import { PoOrderController } from './po-order.controller';

describe('PoOrderController', () => {
  let controller: PoOrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PoOrderController],
    }).compile();

    controller = module.get<PoOrderController>(PoOrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
