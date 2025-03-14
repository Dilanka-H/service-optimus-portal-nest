import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PoHeaders } from '../../schema/po_headers.schema';
import { PoHeaderCondition, QueryPoListResponse } from './po_headers.interface';

@Injectable()
export class PoHeadersRepository {
  constructor(@InjectModel(PoHeaders.name) private PoHeadersModel: Model<PoHeaders>) {}

  async queryPoList(condition: PoHeaderCondition): Promise<QueryPoListResponse[]> {
    return this.PoHeadersModel.aggregate([
      { $match: condition },
      {
        $lookup: {
          from: 'po_jobs',
          localField: 'PONumber',
          foreignField: 'PONumber',
          as: 'jobs',
        },
      },
      {
        $addFields: {
          totalGIGRQty: {
            $sum: {
              $map: {
                input: {
                  $filter: {
                    input: '$jobs',
                    as: 'job',
                    cond: { $eq: ['$$job.jobStatus', 'gigr-complete'] },
                  },
                },
                as: 'job',
                in: '$$job.quantityInfo.quantity',
              },
            },
          },
          customerName: { $arrayElemAt: ['$jobs.customerName', 0] },
          outputFile1Info: { $arrayElemAt: ['$jobs.outputFile1Info', 0] },
          outputFile2Info: { $arrayElemAt: ['$jobs.outputFile2Info', 0] },
        },
      },
      {
        $group: {
          _id: '$PONumber',
          totalJobId: { $sum: { $size: '$jobs' } },
          totalQty: {
            $sum: {
              $reduce: {
                input: {
                  $filter: {
                    input: '$jobs',
                    as: 'job',
                    cond: { $ne: ['$$job.jobStatus', 'canceled'] },
                  },
                },
                initialValue: 0,
                in: { $add: ['$$value', '$$this.totalQuantity'] },
              },
            },
          },
          totalWaiting: {
            $sum: {
              $size: {
                $filter: { input: '$jobs', as: 'job', cond: { $eq: ['$$job.jobStatus', 'waiting'] } },
              },
            },
          },
          totalOnProcess: {
            $sum: {
              $size: {
                $filter: { input: '$jobs', as: 'job', cond: { $eq: ['$$job.jobStatus', 'on-process'] } },
              },
            },
          },
          totalMatchSuccess: {
            $sum: {
              $size: {
                $filter: { input: '$jobs', as: 'job', cond: { $eq: ['$$job.jobStatus', 'match-success'] } },
              },
            },
          },
          totalRepair: {
            $sum: {
              $size: {
                $filter: { input: '$jobs', as: 'job', cond: { $eq: ['$$job.jobStatus', 'waiting-repair'] } },
              },
            },
          },
          totalGIGRComplete: {
            $sum: {
              $size: {
                $filter: { input: '$jobs', as: 'job', cond: { $eq: ['$$job.jobStatus', 'gigr-complete'] } },
              },
            },
          },
          totalCanceled: {
            $sum: {
              $size: {
                $filter: { input: '$jobs', as: 'job', cond: { $eq: ['$$job.jobStatus', 'canceled'] } },
              },
            },
          },
          docs: { $push: '$$ROOT' },
        },
      },
      {
        $project: {
          _id: 0,
          SIMGroup: { $first: '$docs.SIMGroup' },
          PODate: { $first: '$docs.PODate' },
          PONumber: { $first: '$docs.PONumber' },
          PRNumber: { $first: '$docs.PRNumber' },
          Material: { $first: '$docs.Material' },
          Description: { $first: '$docs.Description' },
          totalQty: '$totalQty',
          totalGIGRQty: { $first: '$docs.totalGIGRQty' },
          SalesOrder: { $first: '$docs.SalesOrder' },
          SIMType: { $first: '$docs.SIMType' },
          jobsInfo: {
            totalJobId: '$totalJobId',
            totalWaiting: '$totalWaiting',
            totalOnProcess: '$totalOnProcess',
            totalMatchSuccess: '$totalMatchSuccess',
            totalRepair: '$totalRepair',
            totalGIGRComplete: '$totalGIGRComplete',
            totalCancel: '$totalCanceled',
          },
          POStatus: {
            $switch: {
              branches: [
                {
                  case: { $eq: ['$totalCanceled', '$totalJobId'] },
                  then: 'canceled',
                },
                {
                  case: { $eq: ['$totalWaiting', { $subtract: ['$totalJobId', '$totalCanceled'] }] },
                  then: 'waiting',
                },
                {
                  case: { $eq: ['$totalGIGRComplete', { $subtract: ['$totalJobId', '$totalCanceled'] }] },
                  then: 'gigr-complete',
                },
              ],
              default: 'on-process',
            },
          },
          customerName: {
            $cond: {
              if: { $ne: [{ $first: '$docs.SIMGroup' }, 'PSIM'] },
              then: { $first: '$docs.customerName' },
              else: '$$REMOVE',
            },
          },
          outputFile1Info: {
            $cond: {
              if: { $ne: [{ $first: '$docs.SIMGroup' }, 'PSIM'] },
              then: { $first: '$docs.outputFile1Info' },
              else: '$$REMOVE',
            },
          },
          outputFile2Info: {
            $cond: {
              if: { $ne: [{ $first: '$docs.SIMGroup' }, 'PSIM'] },
              then: { $first: '$docs.outputFile2Info' },
              else: '$$REMOVE',
            },
          },
        },
      },
    ]).exec();
  }
}
