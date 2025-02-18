import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { OPTIMUS_CONFIG_PSIM_MACHINES, RESULT_FAIL_MESSAGE, RESULT_SUCCESS_MESSAGE } from 'src/common/constants';
import { IOptimusConfigCondition, IOptimusConfigSetParams } from 'src/common/interfaces/database_domain.interface';
import { MongoService } from 'src/database/mongo/mongo.service';
import { OptimusConfigs, OptimusConfigsDocument } from 'src/database/mongo/schema/optimusconfigs.schema';
import { ReserveMachineNoDto } from '../../dto/reserve-machine-no.dto';
import { IReserveMachineNoResponse } from '../../interfaces';
import { ReserveMachineNoService } from './reserve-machine-no.service';

describe('ReserveMachineNoService', () => {
  let service: ReserveMachineNoService;
  let mongoService: MongoService;
  let mockOptimusConfigsModel: Model<OptimusConfigsDocument>

  beforeEach(async () => {
    const mockMongoService = {
      updateManyDocuments: jest.fn(),
    };
    mockOptimusConfigsModel = {} as Model<OptimusConfigsDocument>;
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReserveMachineNoService,
        { provide: MongoService, useValue: mockMongoService },
        { provide: getModelToken(OptimusConfigs.name), useValue: mockOptimusConfigsModel },
      ],
    }).compile();

    service = module.get<ReserveMachineNoService>(ReserveMachineNoService);
    mongoService = module.get<MongoService>(MongoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should return "Success" if modified count is 1', async () => {
    const mockResult = {modifiedCount: 1}
    const mockRequest: ReserveMachineNoDto = {machineNo: "1", reserveFlag: true, updateBy: "testUser"}
    const mockCondition: IOptimusConfigCondition = {configName: OPTIMUS_CONFIG_PSIM_MACHINES, "Machines.machineNo": mockRequest.machineNo}
    const mockSetParams: IOptimusConfigSetParams = {"Machines.$.user": mockRequest.updateBy}
    const mockResponse: IReserveMachineNoResponse = {result: RESULT_SUCCESS_MESSAGE}
    mongoService.updateManyDocuments = jest.fn().mockResolvedValue(mockResult);

    const result = await service.reserveMachineNo(mockRequest)

    expect(mongoService.updateManyDocuments).toHaveBeenCalledWith(
      mockOptimusConfigsModel,
      mockCondition, 
      mockSetParams
    );
    expect(result).toEqual(mockResponse);
  })

  it('Should return "Success" if modified count is 1 (reserveFlag is false)', async () => {
    const mockResult = {modifiedCount: 1}
    const mockRequest: ReserveMachineNoDto = {machineNo: "1", reserveFlag: false, updateBy: "testUser"}
    const mockCondition: IOptimusConfigCondition = {configName: OPTIMUS_CONFIG_PSIM_MACHINES, "Machines.machineNo": mockRequest.machineNo}
    const mockSetParams: IOptimusConfigSetParams = {"Machines.$.user": ""}
    const mockResponse: IReserveMachineNoResponse = {result: RESULT_SUCCESS_MESSAGE}
    mongoService.updateManyDocuments = jest.fn().mockResolvedValue(mockResult);

    const result = await service.reserveMachineNo(mockRequest)

    expect(mongoService.updateManyDocuments).toHaveBeenCalledWith(
      mockOptimusConfigsModel,
      mockCondition, 
      mockSetParams
    );
    expect(result).toEqual(mockResponse);
  })

  it('Should return "Fail" if modified count is 0', async () => {
    const mockResult = {modifiedCount: 0}
    const mockRequest: ReserveMachineNoDto = {machineNo: "1", reserveFlag: true, updateBy: "testUser"}
    const mockCondition: IOptimusConfigCondition = {configName: OPTIMUS_CONFIG_PSIM_MACHINES, "Machines.machineNo": mockRequest.machineNo}
    const mockSetParams: IOptimusConfigSetParams = {"Machines.$.user": mockRequest.updateBy}
    const mockResponse: IReserveMachineNoResponse = {result: RESULT_FAIL_MESSAGE}
    mongoService.updateManyDocuments = jest.fn().mockResolvedValue(mockResult);

    const result = await service.reserveMachineNo(mockRequest)

    expect(mongoService.updateManyDocuments).toHaveBeenCalledWith(
      mockOptimusConfigsModel,
      mockCondition, 
      mockSetParams
    );
    expect(result).toEqual(mockResponse);
  })
});
