import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QueryPoJobListResponse } from '../../interfaces';
import { PoJobs } from '../../schema/po_jobs.schema';
import { PoHeaderCondition } from '../po_headers/po_headers.interface';
import { PoJobCondition, PoJobSetParams } from './po_jobs.interface';

@Injectable()
export class PoJobsRepository {
  constructor(@InjectModel(PoJobs.name) private PoJobsModel: Model<PoJobs>) {}

  async reservePoJobToProcess(condition: PoJobCondition, setParams: PoJobSetParams): Promise<PoJobs> {
    return this.PoJobsModel.findOneAndUpdate(
      condition,
      {
        $set: {
          'lockInfo.lockedBy': setParams.lockedBy,
          'lockInfo.lockedDateTime': setParams.lockedDateTime,
        },
      },
      {
        returnOriginal: false,
      },
    )
      .lean()
      .exec();
  }

  async queryPoJobList(
    conditionPoJob: PoJobCondition,
    conditionPoHeader: PoHeaderCondition,
  ): Promise<QueryPoJobListResponse[]> {
    return this.PoJobsModel.aggregate([
      {
        $match: conditionPoJob,
      },
      {
        $lookup: {
          from: 'po_headers',
          localField: 'PONumber',
          foreignField: 'PONumber',
          as: 'poHeader',
        },
      },
      {
        $unwind: '$poHeader',
      },
      {
        $match: {
          ...(conditionPoHeader.PODate ? { 'poHeader.PODate': conditionPoHeader.PODate } : ''),
          ...(conditionPoHeader.PRNumber ? { 'poHeader.PRNumber': conditionPoHeader.PRNumber } : ''),
          ...(conditionPoHeader.SIMGroup ? { 'poHeader.SIMGroup': conditionPoHeader.SIMGroup } : ''),
          ...(conditionPoHeader.status ? { 'poHeader.status': conditionPoHeader.status } : ''),
          ...(conditionPoHeader.Material ? { 'poHeader.Material': conditionPoHeader.Material } : ''),
          ...(conditionPoHeader.Description ? { 'poHeader.Description': conditionPoHeader.Description } : ''),
        },
      },
      {
        $lookup: {
          from: 'master_customers',
          localField: 'poHeader.BPCustomer',
          foreignField: 'SAPCode',
          as: 'masterCustomer',
        },
      },
      {
        $unwind: {
          path: '$masterCustomer',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          PONumber: 1,
          PODate: '$poHeader.PODate',
          POStatus: '$poHeader.POStatus',
          PRNumber: '$poHeader.PRNumber',
          jobId: 1,
          jobStatus: 1,
          totalQty: '$poHeader.POQtyPlanUsageQty',
          quantityInfo: 1,
          DeliveryDate: '$poHeader.DeliveryDate',
          PrematchOption: '$poHeader.PrematchOption',
          PrematchDate: '$poHeader.PrematchDate',
          Material: '$poHeader.Material',
          Description: '$poHeader.Description',
          Plant: '$poHeader.Plant',
          SIMGroup: '$poHeader.SIMGroup',
          Network: '$poHeader.Network',
          SIMType: '$poHeader.SIMType',
          Pack: '$poHeader.Pack',
          customerName: { $ifNull: ['$masterCustomer.customerName', ''] },
          BPCustomer: '$poHeader.BPCustomer',
          SalesOrder: '$poHeader.SalesOrder',
          Remark: '$poHeader.Remark',
          numberInfo: {
            NumberStatus: '$poHeader.NumberStatus',
            Classify: '$poHeader.Classify',
            Pattern: '$poHeader.Pattern',
            LocationName: '$poHeader.LocationName',
            LuckyName: '$poHeader.LuckyName',
            LuckyType: '$poHeader.LuckyType',
            NumberType: '$poHeader.NumberType',
            ExpireDate: '$poHeader.ExpireDate',
          },
          inspectInfo: 1,
          GIGRInfo: 1,
          prematchEndTime: 1,
          BOMCode: 1,
          BOMDesc: 1,
          machineNo: 1,
          Pattern_K: '$poHeader.Pattern_K',
          NumberStatus: '$poHeader.NumberStatus',
          eanCode: '$poHeader.EAN_UPC_PC',
        },
      },
    ]).exec();
  }
}
