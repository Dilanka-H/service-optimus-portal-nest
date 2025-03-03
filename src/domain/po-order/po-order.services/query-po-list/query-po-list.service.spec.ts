import { Test, TestingModule } from '@nestjs/testing';
import * as dayjs from 'dayjs';
import * as timezone from 'dayjs/plugin/timezone';
import * as utc from 'dayjs/plugin/utc';
import { TIMEZONE_THAI } from 'src/common/constants';
import { IPoHeaderCondition } from 'src/common/interfaces/database_domain.interface';
import { IQueryPoListResponse } from 'src/database/mongo/interfaces';
import { PoHeadersService } from 'src/database/mongo/repositories/po_headers.service';
import { QueryPoListDto } from '../../dto/query-po-list.dto';
import { QueryPoListService } from './query-po-list.service';

dayjs.extend(utc);
dayjs.extend(timezone);

describe('QueryPoListService', () => {
  let service: QueryPoListService;
  let poHeadersService: PoHeadersService;

  const requestDto: QueryPoListDto = {
    PONumber: 'PO123456',
    PRNumber: 'PR987654',
    POStatus: ['Pending', 'In Progress'],
    POstartDate: '2024-01-01',
    POendDate: '2024-01-31',
    excludeStatus: ['Cancelled'],
    SIMGroup: ['SIM123', 'SIM456'],
    Material: 'MaterialX',
    Description: 'Sample description of the PO',
  };

  const condition: IPoHeaderCondition = {
    PONumber: requestDto.PONumber,
    PRNumber: requestDto.PRNumber,
    SIMGroup: { $in: requestDto.SIMGroup },
    Material: requestDto.Material,
    Description: requestDto.Description,
    PODate: {
      $gte: dayjs.tz(requestDto.POstartDate, TIMEZONE_THAI).startOf('day').utc().toDate(),
      $lte: dayjs.tz(requestDto.POendDate, TIMEZONE_THAI).endOf('day').utc().toDate(),
    },
    status: { $in: requestDto.POStatus },
  };

  beforeEach(async () => {
    const mockPoHeadersService = {
      queryPoList: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [QueryPoListService, { provide: PoHeadersService, useValue: mockPoHeadersService }],
    }).compile();

    service = module.get<QueryPoListService>(QueryPoListService);
    poHeadersService = module.get<PoHeadersService>(PoHeadersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return documents if request is sent with POStatus', async () => {
    const mockResult: IQueryPoListResponse[] = [];
    poHeadersService.queryPoList = jest.fn().mockResolvedValue(mockResult);

    const result = await service.queryPoList(requestDto);
    expect(poHeadersService.queryPoList).toHaveBeenCalledWith(condition);
    expect(result).toEqual(mockResult);
  });

  it('should return documents if request is sent without POStatus', async () => {
    const mockResult: IQueryPoListResponse[] = [];
    delete requestDto.POStatus;
    condition.status = { $nin: requestDto.excludeStatus };
    poHeadersService.queryPoList = jest.fn().mockResolvedValue(mockResult);

    const result = await service.queryPoList(requestDto);
    expect(poHeadersService.queryPoList).toHaveBeenCalledWith(condition);
    expect(result).toEqual(mockResult);
  });
});
