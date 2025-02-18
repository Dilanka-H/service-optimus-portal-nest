import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import * as dayjs from 'dayjs';
import * as timezone from 'dayjs/plugin/timezone';
import * as utc from 'dayjs/plugin/utc';
import { Model } from 'mongoose';
import {
  RESULT_FAIL_MESSAGE,
  RESULT_NOT_FOUND_MESSAGE,
  STATUS_CANCELED,
  STATUS_ON_PROCESS,
} from 'src/common/constants';
import { IPoJobCondition } from 'src/common/interfaces/database_domain.interface';
import { MongoService } from 'src/database/mongo/mongo.service';
import { PoHeaders, PoHeadersDocument } from 'src/database/mongo/schema/po_headers.schema';
import { PoJobs, PoJobsDocument } from 'src/database/mongo/schema/po_jobs.schema';
import { PoJobsService } from 'src/database/mongo/services/po_jobs.service';
import { ReservePoJobToProcessDto } from '../../dto/reserve-po-job-to-process.dto';
import { ReservePoJobToProcessService } from './reserve-po-job-to-process.service';

dayjs.extend(utc);
dayjs.extend(timezone);

describe('ReservePoJobToProcessService', () => {
  let service: ReservePoJobToProcessService;
  let poJobsService: PoJobsService;
  let mongoService: MongoService;
  let mockPoJobsModel: Model<PoJobsDocument>;
  let mockPoHeadersModel: Model<PoHeadersDocument>;
  const fixedDate = '2025-01-30T05:27:22.403Z';

  beforeEach(async () => {
    jest.spyOn(dayjs, 'tz').mockReturnValue(dayjs(fixedDate).tz('Asia/Bangkok', true));
    jest.spyOn(dayjs, 'utc').mockReturnValue(dayjs(fixedDate).utc(true));

    const mockPoJobsService = { reservePoJobToProcess: jest.fn() };
    const mockMongoService = { findDocuments: jest.fn(), updateManyDocuments: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservePoJobToProcessService,
        { provide: PoJobsService, useValue: mockPoJobsService },
        { provide: MongoService, useValue: mockMongoService },
        { provide: getModelToken(PoJobs.name), useValue: mockPoJobsModel },
        { provide: getModelToken(PoHeaders.name), useValue: mockPoHeadersModel },
      ],
    }).compile();

    service = module.get(ReservePoJobToProcessService);
    poJobsService = module.get(PoJobsService);
    mongoService = module.get(MongoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const testCases = [
    { reserveFlag: true, setParams: { lockedBy: 'testUser', lockedDateTime: fixedDate } },
    { reserveFlag: false, setParams: { lockedBy: '', lockedDateTime: '' } },
  ];

  testCases.forEach(({ reserveFlag, setParams }) => {
    it(`should call reservePoJobToProcess with correct condition when reserveFlag is ${reserveFlag}`, async () => {
      const request: ReservePoJobToProcessDto = {
        jobId: ['1234'],
        action: 'on-process',
        reserveFlag,
        SIMGroup: 'PSIM',
        tokenUser: 'testUser',
      };
      const condition: IPoJobCondition = { jobId: request.jobId[0], 'lockInfo.lockedBy': '' };
      await service.reservePoJobToProcess(request);
      expect(poJobsService.reservePoJobToProcess).toHaveBeenCalledWith(condition, setParams);
    });
  });

  describe('Fail to lock case', () => {
    it('should search documents when locking fails', async () => {
      const request = {
        jobId: ['1234'],
        action: 'on-process',
        reserveFlag: true,
        SIMGroup: 'PSIM',
        tokenUser: 'testUser',
      };
      poJobsService.reservePoJobToProcess = jest.fn().mockResolvedValue(null);

      await service.reservePoJobToProcess(request);
      expect(mongoService.findDocuments).toHaveBeenCalledWith(mockPoJobsModel, { jobId: '1234' }, 'jobId lockInfo');
    });

    it.each([{ lockInfo: { lockedBy: 'testUser2', lockedDateTime: fixedDate }, result: RESULT_FAIL_MESSAGE }])(
      'should return correct response when record exists: %o',
      async ({ lockInfo, result }) => {
        const request = {
          jobId: ['1234'],
          action: 'on-process',
          reserveFlag: true,
          SIMGroup: 'PSIM',
          tokenUser: 'testUser',
        };
        poJobsService.reservePoJobToProcess = jest.fn().mockResolvedValue(null);
        mongoService.findDocuments = jest.fn().mockResolvedValue([{ jobId: '1234', lockInfo }]);

        const response = await service.reservePoJobToProcess(request);
        expect(response).toEqual([{ jobId: '1234', lockedBy: lockInfo.lockedBy, result }]);
      },
    );

    it('should return correct response when no record is found', async () => {
      const request = {
        jobId: ['1234'],
        action: 'on-process',
        reserveFlag: true,
        SIMGroup: 'PSIM',
        tokenUser: 'testUser',
      };
      poJobsService.reservePoJobToProcess = jest.fn().mockResolvedValue(null);
      mongoService.findDocuments = jest.fn().mockResolvedValue([]);

      const response = await service.reservePoJobToProcess(request);
      expect(response).toEqual([{ jobId: '1234', lockedBy: '', result: RESULT_NOT_FOUND_MESSAGE }]);
    });
  });

  describe('Successfully locked case', () => {
    it('should retrieve SIMGroup if not provided in request', async () => {
      const request = { jobId: ['1234'], action: 'on-process', reserveFlag: true, tokenUser: 'testUser' };
      poJobsService.reservePoJobToProcess = jest.fn().mockResolvedValue({ PONumber: '1234' });
      mongoService.findDocuments = jest.fn().mockResolvedValue([{ SIMGroup: 'PSIM' }]);

      await service.reservePoJobToProcess(request);
      expect(mongoService.findDocuments).toHaveBeenCalledWith(mockPoHeadersModel, { PONumber: '1234' });
    });

    it.each([
      { action: 'inspect1', updateField: 'inspectInfo.inspectStatus1' },
      { action: 'inspect2', updateField: 'inspectInfo.inspectStatus2' },
    ])('should update po_job for action: %o', async ({ action, updateField }) => {
      const request = { jobId: ['1234'], action, reserveFlag: true, tokenUser: 'testUser', SIMGroup: 'PSIM' };
      poJobsService.reservePoJobToProcess = jest.fn().mockResolvedValue({ PONumber: '1234' });

      await service.reservePoJobToProcess(request);
      expect(mongoService.updateManyDocuments).toHaveBeenCalledWith(
        mockPoJobsModel,
        { jobId: '1234' },
        { [updateField]: STATUS_ON_PROCESS, lastUpdate: fixedDate },
      );
    });

    it.each([
      {
        action: 'process',
        conditionJob: { jobId: '1234' },
        conditionHeader: { PONumber: '1234' },
        setParamsJob: { jobStatus: STATUS_ON_PROCESS, lastUpdate: fixedDate },
        setParamsHeader: { status: STATUS_ON_PROCESS, lastUpdate: fixedDate },
      },
      {
        action: 'cancel',
        conditionJob: { jobId: '1234' },
        conditionHeader: { PONumber: '1234' },
        setParamsJob: { jobStatus: STATUS_CANCELED, lastUpdate: fixedDate },
        setParamsHeader: { status: STATUS_CANCELED, lastUpdate: fixedDate },
      },
    ])(
      'should update po_job and po_header if action is "process"|"cancel" and SIMGroup is not PSIM',
      async ({ action, conditionJob, conditionHeader, setParamsJob, setParamsHeader }) => {
        const request = {
          jobId: ['1234'],
          action: action,
          reserveFlag: true,
          tokenUser: 'testUser',
          SIMGroup: 'ESIM',
        };
        poJobsService.reservePoJobToProcess = jest.fn().mockResolvedValue({ PONumber: '1234' });

        await service.reservePoJobToProcess(request);
        expect(mongoService.updateManyDocuments).toHaveBeenCalledWith(mockPoJobsModel, conditionJob, setParamsJob);
        expect(mongoService.updateManyDocuments).toHaveBeenCalledWith(
          mockPoHeadersModel,
          conditionHeader,
          setParamsHeader,
        );
      },
    );

    it('should send correct response if "catch" is triggered', async () => {
      const request: ReservePoJobToProcessDto = {
        jobId: ['1234'],
        action: 'cancel',
        reserveFlag: true,
        tokenUser: 'testUser',
      };
      poJobsService.reservePoJobToProcess = jest.fn().mockResolvedValue({ PONumber: '1234' });
      mongoService.findDocuments = jest.fn().mockRejectedValue(new Error('Test error'));

      const response = await service.reservePoJobToProcess(request);

      expect(response).toEqual([
        {
          jobId: request.jobId[0],
          lockedBy: request.tokenUser,
          result: RESULT_FAIL_MESSAGE,
        },
      ]);
    });
  });
});
