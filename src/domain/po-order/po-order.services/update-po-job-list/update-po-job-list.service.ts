import { Injectable } from '@nestjs/common';
import { UpdatePoJobListDto } from 'src/domain/po-order/dto/update-po-job-list.dto';
import { IPoJobCondition, IPoJobSetParams } from 'src/common/interfaces/database_domain.interface';
import { IUpdatePoJobListResponse } from 'src/domain/po-order/po-order.services/update-po-job-list/interfaces';
import { RESULT_NOT_FOUND_MESSAGE, RESULT_SUCCESS_MESSAGE } from 'src/common/constants';
import { MongoService } from 'src/database/mongo/mongo.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PoJobs, PoJobsDocument } from 'src/database/mongo/schema/po_jobs.schema';

@Injectable()
export class UpdatePoJobListService {
    constructor(
        @InjectModel(PoJobs.name) private PoJobsModel: Model<PoJobsDocument>,
        private mongoService: MongoService,
    ){}

    async updatePoJobList(updatePoJobListDto: UpdatePoJobListDto) {
        const condition: IPoJobCondition = {jobId: updatePoJobListDto.jobId}
        const setParams: IPoJobSetParams = {}
        const response: IUpdatePoJobListResponse = {result: ""}

        if(updatePoJobListDto.jobStatus.length > 0) {
            setParams.jobStatus = updatePoJobListDto.jobStatus
        }
        if(updatePoJobListDto.inspect1Status) {
            setParams['inspectInfo.inspectStatus1'] = updatePoJobListDto.inspect1Status
        }
        if(updatePoJobListDto.inspect2Status) {
            setParams['inspectInfo.inspectStatus2'] = updatePoJobListDto.inspect2Status
        }
    
        const result = await this.mongoService.updateManyDocuments(this.PoJobsModel, condition, setParams);

        if (result.matchedCount == 1) {
            response.result = RESULT_SUCCESS_MESSAGE
        } else if (result.matchedCount == 0) {
            response.result = RESULT_NOT_FOUND_MESSAGE
        }
    
        return response; 
    }
}
