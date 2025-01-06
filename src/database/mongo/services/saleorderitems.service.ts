import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Response } from '../interfaces';
import { SaleOrderItems } from '../schema/SaleOrderItems.schema';

@Injectable()
export class SaleOrderItemsService {
  constructor(
    @InjectModel(SaleOrderItems.name) private SaleOrderItemsModel: Model<SaleOrderItems>,
  ) {}

  async updateOrderItem(condition: Object, updateData: Object): Promise<Response> {
    const result: Response = {
      acknowledged: true,
      upsertedId: null, 
      upsertedCount: 0, 
      matchedCount: 1, 
      modifiedCount: 1
    };
    const jobList = await this.SaleOrderItemsModel.find(condition).exec();

    if (!jobList) {
      result.acknowledged = true
      result.matchedCount = 0
      result.modifiedCount = 0
      result.upsertedCount = 0
      result.upsertedId = null
      return result
    }

    const updatePromises = jobList.map(async (jobList) => {
      Object.assign(jobList, updateData);
      await jobList.save();
      return jobList;
    });

    const updatedJobLists = await Promise.all(updatePromises);

    result.matchedCount = updatedJobLists.length
    result.modifiedCount = updatedJobLists.length

    return result
  }

  async findAll(): Promise<SaleOrderItems[]> {
    return this.SaleOrderItemsModel.find().exec();
  }

  async createJob(jobData) {
    const newJob = new this.SaleOrderItemsModel(jobData);
    return await newJob.save();
  }
}
