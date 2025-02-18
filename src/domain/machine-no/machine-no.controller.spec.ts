import { Test, TestingModule } from '@nestjs/testing';
import { ReserveMachineNoDto } from './dto/reserve-machine-no.dto';
import { MachineNoController } from './machine-no.controller';
import { QueryMachineNoService } from './machine-no.services/query-machine-no/query-machine-no.service';
import { ReserveMachineNoService } from './machine-no.services/reserve-machine-no/reserve-machine-no.service';

describe('MachineNoController', () => {
  let controller: MachineNoController;
  let queryMachineNoService: QueryMachineNoService;
  let reserveMachineNoService: ReserveMachineNoService;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MachineNoController],
      providers: [
        {
          provide: QueryMachineNoService,
          useValue: { queryMachineNo: jest.fn().mockResolvedValue('mockQueryResult') },
        },
        {
          provide: ReserveMachineNoService,
          useValue: { reserveMachineNo: jest.fn().mockResolvedValue({ result: 'Success' }) },
        },
      ],
    }).compile();

    controller = module.get<MachineNoController>(MachineNoController);
    queryMachineNoService = module.get<QueryMachineNoService>(QueryMachineNoService);
    reserveMachineNoService = module.get<ReserveMachineNoService>(ReserveMachineNoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call queryMachineNoService.queryMachineNo and return the result', async () => {
    const result = await controller.queryMachineNo();
    expect(queryMachineNoService.queryMachineNo).toHaveBeenCalled();
    expect(result).toBe('mockQueryResult');
  });

  it('should call reserveMachineNoService.reserveMachineNo with DTO and return the result', async () => {
    const dto: ReserveMachineNoDto = { machineNo: '123', reserveFlag: true, updateBy: 'user1' };
    const result = await controller.reserveMachineNo(dto);

    expect(reserveMachineNoService.reserveMachineNo).toHaveBeenCalledWith(dto);
    expect(result).toEqual({ result: 'Success' });
  });
});
