import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OPTIMUS_CONFIG_PSIM_MACHINES, RESULT_MACHINES_NOT_FOUND } from 'src/common/constants';
import { IOptimusConfigCondition } from 'src/common/interfaces/database_domain.interface';
import { MongoService } from 'src/database/mongo/mongo.service';
import { OptimusConfigs, OptimusConfigsDocument } from 'src/database/mongo/schema/optimusconfigs.schema';
import { IQueryMachineNoResponse } from '../../interfaces';

@Injectable()
export class QueryMachineNoService {
    constructor(
        @InjectModel(OptimusConfigs.name) private OptimusConfigsModel: Model<OptimusConfigsDocument>,
        private mongoService: MongoService
    ){}

    async queryMachineNo() {
        const condition: IOptimusConfigCondition = {configName: OPTIMUS_CONFIG_PSIM_MACHINES}
        const response: IQueryMachineNoResponse = {}

        const result = await this.mongoService.findDocuments(this.OptimusConfigsModel, condition)

        if (result && result.length > 0 && result[0].Machines) {
            response.Machines = result[0].Machines
        } else {
            response.resultMessage = RESULT_MACHINES_NOT_FOUND
        }
        return response
    }
}
