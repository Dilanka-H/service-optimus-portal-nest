import { Test, TestingModule } from '@nestjs/testing';
import { SaleOrderService } from './sale-order.service'; 
import { OptimusJobListsService } from '../../database/mongo/services/optimusjoblists.service';
import { UpdateJobListDto } from './dto/update-job-list.dto';

describe('SaleOrderService', () => {
  let service: SaleOrderService;
  let optimusJobListsService: OptimusJobListsService;

  const mockOptimusJobListsService = {
    updateJobList: jest.fn(),
    createJob: jest.fn(),
    findAll: jest.fn(),
  };

  const mockJobList = [
    {
      "jobStatus" : "7071744e696c41516655506953746543:e2e326f6a2ecbad80b49ae06b36c3b2b",
      "jobId" : "JOB001",
      "jobName" : "Test Job",
      "orderDate" : "2024-10-08",
      "jobType" : "Standard",
      "createBy" : "admin",
      "updateBy" : "admin",
      "TIMESTAMP" : new Date("2024-10-08T12:35:07.811+0000"),
      "forwarderName" : "Forwarder A",
      "jobDate" : "2024-10-09",
      "itemsSize" : 1,
      "itemsList" : [
          {
              "serialNo" : "12345",
              "imsi" : "123456789012345",
              "nuNotifyFlag" : "Y",
              "orderStatus" : "Pending",
              "prepTransactionNo" : "TX123",
          }
      ],
    }
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SaleOrderService,
        {
          provide: OptimusJobListsService,
          useValue: mockOptimusJobListsService,  
        },
      ],
    }).compile();

    service = module.get<SaleOrderService>(SaleOrderService);
    optimusJobListsService = module.get<OptimusJobListsService>(OptimusJobListsService);
  });

  afterEach(() => {
    jest.clearAllMocks();  
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('updateJobList', () => {
    it('should call updateJobList with correct parameters', async () => {
      const updateJobListDto: UpdateJobListDto = {
        condition: { jobId: '123' },
        updateData: { jobStatus: 'Updated', printDeliverySheet: false },
      };

      const mockResult = {
        acknowledged: true,
        upsertedId: null,
        upsertedCount: 0,
        matchedCount: 1,
        modifiedCount: 1,
      };

      mockOptimusJobListsService.updateJobList.mockResolvedValue(mockResult);

      const result = await service.updateJobList(updateJobListDto);

      expect(result).toEqual(mockResult);
      expect(mockOptimusJobListsService.updateJobList).toHaveBeenCalledWith(
        updateJobListDto.condition,
        updateJobListDto.updateData,
      );
    });
  });

  describe('createOrder', () => {
    it('should call createJob with correct data', async () => {
      const createDto = { mockJobList };

      const mockJob = { ...createDto, _id: 'abc123' };

      mockOptimusJobListsService.createJob.mockResolvedValue(mockJob);

      const result = await service.createOrder(createDto);

      expect(result).toEqual(mockJob);
      expect(mockOptimusJobListsService.createJob).toHaveBeenCalledWith(createDto);
    });
  });

  describe('findAll', () => {
    it('should return all job lists', async () => {
      mockOptimusJobListsService.findAll.mockResolvedValue(mockJobList);

      const result = await service.findAll();

      expect(result).toEqual(mockJobList);
      expect(mockOptimusJobListsService.findAll).toHaveBeenCalled();
    });
  });
});
