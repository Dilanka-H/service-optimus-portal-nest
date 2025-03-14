import { Test, TestingModule } from '@nestjs/testing';
import * as dayjs from 'dayjs';
import * as timezone from 'dayjs/plugin/timezone';
import * as utc from 'dayjs/plugin/utc';
import { TIMEZONE_THAI } from 'src/common/constants';
import { PoHeaderCondition } from 'src/database/mongo/repositories/po_headers/po_headers.interface';
import { PoJobCondition, QueryPoJobListResponse } from 'src/database/mongo/repositories/po_jobs/po_jobs.interface';
import { PoJobsRepository } from 'src/database/mongo/repositories/po_jobs/po_jobs.respository';
import { QueryPoJobListDto } from '../../dto/query-po-job-list.dto';
import { QueryPoJobListService } from './query-po-job-list.service';

dayjs.extend(utc);
dayjs.extend(timezone);

describe('QueryPoJobListService', () => {
  let service: QueryPoJobListService;
  let poJobsRepository: PoJobsRepository;
  const requestDto: QueryPoJobListDto = {
    PONumber: 'PO123456',
    jobId: 'JOB789',
    jobStatus: ['waiting', 'on-process'],
    excludeStatus: ['Cancelled'],
    POstartDate: '2024-01-01',
    POendDate: '2024-01-31',
    PRNumber: 'PR987654',
    POStatus: 'Approved',
    SalesOrder: 'SO5555',
    Inspect1: {
      Inspect1startDate: '2024-02-01',
      Inspect1endDate: '2024-02-10',
      Inspect1status: 'Completed',
    },
    Inspect2: {
      Inspect2startDate: '2024-03-01',
      Inspect2endDate: '2024-03-15',
      Inspect2status: 'Pending',
    },
    GIGR: {
      GIGRstartDate: '2024-04-01',
      GIGRendDate: '2024-04-10',
    },
    SIMGroup: ['SIM123', 'SIM456'],
    material: 'MaterialX',
    description: 'Sample description of the job',
    flagPrintPO: false,
    searchIns: '',
  };

  const conditionPoJob: PoJobCondition = {
    PONumber: requestDto.PONumber,
    jobId: requestDto.jobId,
    jobStatus: { $in: requestDto.jobStatus },
    'inspectInfo.inspectStatus1': requestDto.Inspect1.Inspect1status,
    'inspectInfo.inspectDate1': {
      $gte: dayjs.tz(requestDto.Inspect1.Inspect1startDate, TIMEZONE_THAI).startOf('day').utc().toISOString(),
      $lte: dayjs.tz(requestDto.Inspect1.Inspect1endDate, TIMEZONE_THAI).endOf('day').utc().toISOString(),
    },
    'inspectInfo.inspectStatus2': requestDto.Inspect2.Inspect2status,
    'inspectInfo.inspectDate2': {
      $gte: dayjs.tz(requestDto.Inspect2.Inspect2startDate, TIMEZONE_THAI).startOf('day').utc().toISOString(),
      $lte: dayjs.tz(requestDto.Inspect2.Inspect2endDate, TIMEZONE_THAI).endOf('day').utc().toISOString(),
    },
    'GIGRInfo.GIGRDate': {
      $gte: dayjs.tz(requestDto.GIGR.GIGRstartDate, TIMEZONE_THAI).startOf('day').utc().toISOString(),
      $lte: dayjs.tz(requestDto.GIGR.GIGRendDate, TIMEZONE_THAI).endOf('day').utc().toISOString(),
    },
  };

  const conditionPoHeader: PoHeaderCondition = {
    PRNumber: requestDto.PRNumber,
    status: requestDto.POStatus,
    Description: requestDto.description,
    Material: requestDto.material,
    SalesOrder: requestDto.SalesOrder,
    PODate: {
      $gte: dayjs.tz(requestDto.POstartDate, TIMEZONE_THAI).startOf('day').utc().toDate(),
      $lte: dayjs.tz(requestDto.POendDate, TIMEZONE_THAI).endOf('day').utc().toDate(),
    },
    SIMGroup: { $in: requestDto.SIMGroup },
  };

  beforeEach(async () => {
    const mockPoJobsService = {
      queryPoJobList: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [QueryPoJobListService, { provide: PoJobsRepository, useValue: mockPoJobsService }],
    }).compile();

    service = module.get<QueryPoJobListService>(QueryPoJobListService);
    poJobsRepository = module.get<PoJobsRepository>(PoJobsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return documents if request is sent with jobStatus', async () => {
    const mockResult: QueryPoJobListResponse[] = [];
    poJobsRepository.queryPoJobList = jest.fn().mockResolvedValue(mockResult);

    const result = await service.queryPoJobList(requestDto);
    expect(poJobsRepository.queryPoJobList).toHaveBeenCalledWith(conditionPoJob, conditionPoHeader);
    expect(result).toEqual(mockResult);
  });

  it('should return documents if request is sent without jobStatus', async () => {
    const mockResult: QueryPoJobListResponse[] = [];
    delete requestDto.jobStatus;
    conditionPoJob.jobStatus = { $nin: requestDto.excludeStatus };
    poJobsRepository.queryPoJobList = jest.fn().mockResolvedValue(mockResult);

    const result = await service.queryPoJobList(requestDto);
    expect(poJobsRepository.queryPoJobList).toHaveBeenCalledWith(conditionPoJob, conditionPoHeader);
    expect(result).toEqual(mockResult);
  });
});
