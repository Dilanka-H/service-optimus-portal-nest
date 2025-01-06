import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PoJobs } from '../schema/po_jobs.schema';
import { IPoJobCondition, IPoJobSetParams, IReservePoJobToProcessCondition, IReservePoJobToProcessSetParams } from 'src/common/interfaces/database_domain.interface';

@Injectable()
export class PoJobsService {
  constructor(
    @InjectModel(PoJobs.name) private PoJobsModel: Model<PoJobs>,
  ) {}

    async findPoJob(condition: IPoJobCondition, projection: string): Promise<any> {
        return this.PoJobsModel.find(condition, projection)
    }

    async updatePoJob(condition: IPoJobCondition, setParams: IPoJobSetParams): Promise<any> {
        return this.PoJobsModel.updateMany(condition, {$set: setParams})
    }

    async reservePoJobToProcess(condition: IReservePoJobToProcessCondition, setParams: IReservePoJobToProcessSetParams): Promise<any> {
       return this.PoJobsModel.findOneAndUpdate({ 
            jobId: condition.jobId,
            $or: [
                { "lockInfo.lockedBy": "" }, 
                { "lockInfo.lockedBy": condition.username } 
            ]
        },
        {
            $set: {
                "lockInfo.lockedBy": setParams.lockedBy,
                "lockInfo.lockedDateTime": setParams.lockedDateTime
            }
        },
        {
            returnOriginal: false
        })
    }
}
