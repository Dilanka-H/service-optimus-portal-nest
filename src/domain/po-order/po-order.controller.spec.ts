import { Test, TestingModule } from '@nestjs/testing';
import { QueryPoJobListDto } from './dto/query-po-job-list.dto';
import { QueryPoListDto } from './dto/query-po-list.dto';
import { ReservePoJobToProcessDto } from './dto/reserve-po-job-to-process.dto';
import { UpdatePoJobListDto } from './dto/update-po-job-list.dto';
import { PoOrderController } from './po-order.controller';
import { QueryPoJobListService } from './po-order.services/query-po-job-list/query-po-job-list.service';
import { QueryPoListService } from './po-order.services/query-po-list/query-po-list.service';
import { ReservePoJobToProcessService } from './po-order.services/reserve-po-job-to-process/reserve-po-job-to-process.service';
import { UpdatePoJobListService } from './po-order.services/update-po-job-list/update-po-job-list.service';

describe('PoOrderController', () => {
  let controller: PoOrderController;
  let queryPoListService: QueryPoListService;
  let queryPoJobListService: QueryPoJobListService;
  let updatePoJobListService: UpdatePoJobListService;
  let reservePoJobToProcessService: ReservePoJobToProcessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PoOrderController],
      providers: [
        {
          provide: QueryPoListService,
          useValue: {
            queryPoList: jest.fn().mockResolvedValue('mockQueryResult'),
          },
        },
        {
          provide: QueryPoJobListService,
          useValue: {
            queryPoJobList: jest.fn().mockResolvedValue('mockQueryResult'),
          },
        },
        {
          provide: UpdatePoJobListService,
          useValue: {
            updatePoJobList: jest.fn().mockResolvedValue('mockQueryResult'),
          },
        },
        {
          provide: ReservePoJobToProcessService,
          useValue: {
            reservePoJobToProcess: jest.fn().mockResolvedValue('mockQueryResult'),
          },
        },
      ],
    }).compile();

    controller = module.get<PoOrderController>(PoOrderController);
    queryPoListService = module.get<QueryPoListService>(QueryPoListService);
    queryPoJobListService = module.get<QueryPoJobListService>(QueryPoJobListService);
    updatePoJobListService = module.get<UpdatePoJobListService>(UpdatePoJobListService);
    reservePoJobToProcessService = module.get<ReservePoJobToProcessService>(ReservePoJobToProcessService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call queryPoListService.queryPoList with DTO and return the result', async () => {
    const dto: QueryPoListDto = { PONumber: '1233456' } as QueryPoListDto;
    const result = await controller.queryPoList(dto);
    expect(queryPoListService.queryPoList).toHaveBeenCalledWith(dto);
    expect(result).toBe('mockQueryResult');
  });

  it('should call queryPoJobListService.queryPoJobList with DTO and return the result', async () => {
    const dto: QueryPoJobListDto = { PONumber: '1233456' } as QueryPoJobListDto;
    const result = await controller.queryPoJobList(dto);
    expect(queryPoJobListService.queryPoJobList).toHaveBeenCalledWith(dto);
    expect(result).toBe('mockQueryResult');
  });

  it('should call updatePoJobListService.updatePoJobList with DTO and return the result', async () => {
    const dto: UpdatePoJobListDto = {
      jobId: '1233456232323232',
    } as UpdatePoJobListDto;
    const result = await controller.updatePoJobList(dto);
    expect(updatePoJobListService.updatePoJobList).toHaveBeenCalledWith(dto);
    expect(result).toBe('mockQueryResult');
  });

  it('should call reservePoJobToProcessService.reservePoJobToProcess with DTO and return the result', async () => {
    const dto: ReservePoJobToProcessDto = {
      jobId: ['1233456'],
    } as ReservePoJobToProcessDto;
    const result = await controller.reservePoJobToProcess('user', dto);
    expect(reservePoJobToProcessService.reservePoJobToProcess).toHaveBeenCalledWith(dto);
    expect(result).toBe('mockQueryResult');
  });
});
