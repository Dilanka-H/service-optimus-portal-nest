import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { OPTIMUS_CONFIG_PSIM_MACHINES, RESULT_MACHINES_NOT_FOUND } from 'src/common/constants';
import { MongoService } from 'src/database/mongo/mongo.service';
import { OptimusConfigs, OptimusConfigsDocument } from 'src/database/mongo/schema/optimusconfigs.schema';
import { QueryMachineNoService } from './query-machine-no.service';

describe('QueryMachineNoService', () => {
  let service: QueryMachineNoService;
  let mongoService: MongoService;
  let mockOptimusConfigsModel: Model<OptimusConfigsDocument>

  beforeEach(async () => {
    const mockMongoService = {
      findDocuments: jest.fn(),
    };
    mockOptimusConfigsModel = {} as Model<OptimusConfigsDocument>;
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QueryMachineNoService,
        { provide: MongoService, useValue: mockMongoService },
        { provide: getModelToken(OptimusConfigs.name), useValue: mockOptimusConfigsModel },
      ],
    }).compile();

    service = module.get<QueryMachineNoService>(QueryMachineNoService);
    mongoService = module.get<MongoService>(MongoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return machines if result contains Machines array', async () => {
    const mockResult = [
      {
        configName: OPTIMUS_CONFIG_PSIM_MACHINES,
        Machines: [{ machineNo: '123', user: 'testUser' }],
      },
    ];
    mongoService.findDocuments = jest.fn().mockResolvedValue(mockResult);

    const result = await service.queryMachineNo();

    expect(mongoService.findDocuments).toHaveBeenCalledWith(
      mockOptimusConfigsModel,
      { configName: OPTIMUS_CONFIG_PSIM_MACHINES },
    );
    expect(result).toEqual({ Machines: mockResult[0].Machines });
  });

  it('should return resultMessage if no machines are found', async () => {
    mongoService.findDocuments = jest.fn().mockResolvedValue([]);

    const result = await service.queryMachineNo();

    expect(mongoService.findDocuments).toHaveBeenCalledWith(
      mockOptimusConfigsModel,
      { configName: OPTIMUS_CONFIG_PSIM_MACHINES },
    );
    expect(result).toEqual({ resultMessage: RESULT_MACHINES_NOT_FOUND });
  });

  it('should return resultMessage if Machines field is missing', async () => {
    const mockResult = [
      {
        configName: OPTIMUS_CONFIG_PSIM_MACHINES,
      },
    ];
    mongoService.findDocuments = jest.fn().mockResolvedValue(mockResult);

    const result = await service.queryMachineNo();

    expect(mongoService.findDocuments).toHaveBeenCalledWith(
      mockOptimusConfigsModel,
      { configName: OPTIMUS_CONFIG_PSIM_MACHINES },
    );
    expect(result).toEqual({ resultMessage: RESULT_MACHINES_NOT_FOUND });
  });
});
