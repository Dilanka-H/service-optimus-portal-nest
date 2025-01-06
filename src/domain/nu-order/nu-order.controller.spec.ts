import { Test, TestingModule } from '@nestjs/testing';
import { NuOrderController } from './nu-order.controller';

describe('NuOrderController', () => {
  let controller: NuOrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NuOrderController],
    }).compile();

    controller = module.get<NuOrderController>(NuOrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
