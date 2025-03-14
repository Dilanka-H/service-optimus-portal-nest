import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PoJobs } from '../../schema/po_jobs.schema';
import { PoHeaderCondition } from '../po_headers/po_headers.interface';
import { PoJobCondition, PoJobSetParams, QueryPoJobListResponse } from './po_jobs.interface';

@Injectable()
export class PoJobsRepository {
  constructor(@InjectModel(PoJobs.name) private PoJobsModel: Model<PoJobs>) {}

  async reservePoJobToProcess(condition: PoJobCondition, setParams: PoJobSetParams): Promise<PoJobs> {
    return this.PoJobsModel.findOneAndUpdate(
      {
        jobId: condition.jobId,
        $or: [{ 'lockInfo.lockedBy': '' }, { 'lockInfo.lockedBy': condition.username }],
      },
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
    searchIns: string,
    flagPrintPO: boolean,
  ): Promise<QueryPoJobListResponse[]> {
    return this.PoJobsModel.aggregate([
      ...(searchIns != ''
        ? [
            {
              $match: {
                $or: [{ jobId: searchIns }, { PONumber: searchIns }],
              },
            },
          ]
        : [
            {
              $match: conditionPoJob,
            },
          ]),
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
          ...(conditionPoHeader.SalesOrder ? { 'poHeader.SalesOrder': conditionPoHeader.SalesOrder } : ''),
        },
      },
      ...(flagPrintPO
        ? [
            {
              $lookup: {
                from: 'po_serials',
                localField: 'jobId',
                foreignField: 'jobId',
                as: 'poSerial',
              },
            },
            {
              $unwind: {
                path: '$poSerial',
                preserveNullAndEmptyArrays: true,
              },
            },
          ]
        : []),
      {
        $lookup: {
          from: 'master_customers',
          let: { bpCustomer: '$poHeader.BPCustomer' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ['$SAPCode', '$$bpCustomer'] }, { $ne: ['$SAPCode', ''] }, { $ne: ['$SAPCode', null] }],
                },
              },
            },
          ],
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
          POItem: '$poHeader.POItem',
          PODate: '$poHeader.PODate',
          POStatus: '$poHeader.status',
          POStatusDate: '$poHeader.lastUpdate',
          PRNumber: '$poHeader.PRNumber',
          PRItem: '$poHeader.PRItem',
          jobId: 1,
          jobStatus: 1,
          jobStatusDate: '$lastUpdate',
          PRtotalQty: '$poHeader.PRQty',
          totalQty: '$totalQuantity',
          quantityInfo: 1,
          DeliveryDate: '$poHeader.DeliveryDate',
          materialPO: '$poHeader.Material',
          descriptionPO: '$poHeader.Description',
          eanCodePO: '$poHeader.EAN_UPC_PC',
          eanCarton: '$poHeader.EAN_UPC_CAR',
          Plant: '$poHeader.Plant',
          Storagelocation: '$poHeader.Storagelocation',
          SalesOrder: '$poHeader.SalesOrder',
          SalesOrderItem: '$poHeader.SalesOrderItem',
          SIMGroup: '$poHeader.SIMGroup',
          customerName: { $ifNull: ['$masterCustomer.customerName', ''] },
          BPCustomer: '$poHeader.BPCustomer',
          Remark: '$poHeader.Remark',
          numberInfo: {
            NumberStatus: '$poHeader.NumberStatus',
            NumberStatus_K: '$poHeader.NumberStatus_K',
            NumberType: '$poHeader.NumberType',
            NumberType_K: '$poHeader.NumberType_K',
            Classify: '$poHeader.Classify',
            Classify_K: '$poHeader.Classify_K',
            Pattern: '$poHeader.Pattern',
            Pattern_K: '$poHeader.Pattern_K',
            LuckyName: '$poHeader.LuckyName',
            LuckyName_K: '$poHeader.LuckyName_K',
            LuckyType: '$poHeader.LuckyType',
            LuckyType_K: '$poHeader.LuckyType_K',
            Pack: '$poHeader.Pack',
            Pack_K: '$poHeader.Pack_K',
            SIMType: '$poHeader.SIMType',
            SIMType_K: '$poHeader.SIMType_K',
            Network: '$poHeader.Network',
            Network_K: '$poHeader.Network_K',
            ExpireDate: '$poHeader.ExpireDate',
            LocationName: '$poHeader.LocationName',
          },
          inspectInfo: 1,
          GIGRInfo: 1,
          PrematchOption: '$poHeader.PrematchOption',
          PrematchDate: '$poHeader.PrematchDate',
          prematchEndTime: 1,
          BOMCode: 1,
          BOMDesc: 1,
          machineNo: 1,
          serialList: flagPrintPO
            ? {
                $cond: {
                  if: { $gt: [{ $size: '$poSerial.prematchInfoList' }, 0] },
                  then: {
                    $map: {
                      input: '$poSerial.prematchInfoList',
                      as: 'item',
                      in: '$$item.simSerialNo',
                    },
                  },
                  else: {
                    $map: {
                      input: '$poSerial.DSAInfoList',
                      as: 'item',
                      in: '$$item.simSerialNo',
                    },
                  },
                },
              }
            : [],
          unitofMeasure: '$poHeader.UnitofMeasure',
          simProject: '$poHeader.SIMProject',
          lastUpdate: '$lastUpdate',
          updatedBy: '$updatedBy',
        },
      },
    ]).exec();
  }
}
