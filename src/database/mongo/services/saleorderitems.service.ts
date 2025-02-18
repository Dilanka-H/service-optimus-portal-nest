import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SaleOrderItems, SaleOrderItemsDocument } from '../schema/SaleOrderItems.schema';
import { MongoUpdateResponse } from 'src/common/interfaces/database_domain.interface';

@Injectable()
export class SaleOrderItemsService {
  constructor(
    @InjectModel(SaleOrderItems.name) private SaleOrderItemsModel: Model<SaleOrderItems>,
  ) {}

  async updateOrderItem(condition: object, updateData: object): Promise<MongoUpdateResponse> {
    const result: MongoUpdateResponse = {
      acknowledged: true,
      upsertedId: null, 
      upsertedCount: 0, 
      matchedCount: 1, 
      modifiedCount: 1
    };
    const items: SaleOrderItemsDocument[] = await this.findSaleOrderItem(condition);

    if (!items) {
      result.acknowledged = true
      result.matchedCount = 0
      result.modifiedCount = 0
      result.upsertedCount = 0
      result.upsertedId = null
      return result
    }

    const updatePromises = items.map(async (jobList) => {
      Object.assign(jobList, updateData);
      await jobList.save();
      return jobList;
    });

    const updatedJobLists = await Promise.all(updatePromises);

    result.matchedCount = updatedJobLists.length
    result.modifiedCount = updatedJobLists.length

    return result
  }

  async findSaleOrderItem(condition): Promise<SaleOrderItemsDocument[]> {
    return this.SaleOrderItemsModel.find(condition).exec();
  }

  async createJob(jobData) {
    const newJob = new this.SaleOrderItemsModel(jobData);
    return await newJob.save();
  }
}
