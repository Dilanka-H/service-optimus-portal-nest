import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OPTIMUS_CONFIG_PSIM_MACHINES, RESULT_FAIL_MESSAGE, RESULT_SUCCESS_MESSAGE } from 'src/common/constants';
import { IOptimusConfigCondition, IOptimusConfigSetParams } from 'src/common/interfaces/database_domain.interface';
import { MongoService } from 'src/database/mongo/mongo.service';
import { OptimusConfigs, OptimusConfigsDocument } from 'src/database/mongo/schema/optimusconfigs.schema';
import { ReserveMachineNoDto } from '../../dto/reserve-machine-no.dto';
import { IReserveMachineNoResponse } from '../../interfaces';

@Injectable()
export class ReserveMachineNoService {
    constructor(
        @InjectModel(OptimusConfigs.name) private OptimusConfigsModel: Model<OptimusConfigsDocument>,
        private mongoService: MongoService
    ){}

    async reserveMachineNo(reserveMachineNoDto: ReserveMachineNoDto) {
        const condition: IOptimusConfigCondition = {configName: OPTIMUS_CONFIG_PSIM_MACHINES, "Machines.machineNo": reserveMachineNoDto.machineNo}
        const setParams: IOptimusConfigSetParams = {"Machines.$.user": reserveMachineNoDto.reserveFlag ? reserveMachineNoDto.updateBy : ""}
        const response: IReserveMachineNoResponse = {result: RESULT_FAIL_MESSAGE}

        const result = await this.mongoService.updateManyDocuments(this.OptimusConfigsModel, condition, setParams)

        if (result.modifiedCount == 1) {response.result = RESULT_SUCCESS_MESSAGE}
        return response
    }
}
