import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Response } from '../interfaces';
import { SaleOrderJobLists } from '../schema/saleorderjoblists.schema';

@Injectable()
export class SaleOrderJobListsService {
  constructor(
    @InjectModel(SaleOrderJobLists.name) private saleorderJobListsModel: Model<SaleOrderJobLists>,
  ) {}

  async updateJobList(condition: Object, updateData: Object): Promise<Response> {
    const result: Response = {
      acknowledged: true,
      upsertedId: null, 
      upsertedCount: 0, 
      matchedCount: 1, 
      modifiedCount: 1
    };
    const jobList = await this.saleorderJobListsModel.find(condition).exec();

    if (!jobList) {
      result.acknowledged = true
      result.matchedCount = 0
      result.modifiedCount = 0
      result.upsertedCount = 0
      result.upsertedId = null
      return result
    }

    const updatePromises = jobList.map(async (jobList) => {
      if (updateData["printDeliverySheet"]) {
        jobList.$inc("moreInfo.printCounter", 1).$set("moreInfo.lastPrint", updateData["TIMESTAMP"])
      }
      Object.assign(jobList, updateData);
      await jobList.save();
      return jobList;
    });

    const updatedJobLists = await Promise.all(updatePromises);

    result.matchedCount = updatedJobLists.length
    result.modifiedCount = updatedJobLists.length

    return result
  }

  async findAll(): Promise<SaleOrderJobLists[]> {
    return this.saleorderJobListsModel.find().exec();
  }

  async createJob(jobData) {
    const newJob = new this.saleorderJobListsModel(jobData);
    return await newJob.save();
  }
}
