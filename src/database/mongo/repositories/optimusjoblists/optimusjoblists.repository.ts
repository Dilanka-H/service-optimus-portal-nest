import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { STATUS_INIT } from 'src/common/constants';
import { generateTransactionId } from 'src/common/utils';
import { OptimusJobLists, OptimusJobListsDocument } from '../../schema/optimusjoblists.shema';

@Injectable()
export class OptimusJobListsRepository {
  constructor(@InjectModel(OptimusJobLists.name) private OptimusJobListModel: Model<OptimusJobLists>) {}

  async createOptimusJobList(data: Partial<OptimusJobLists>): Promise<OptimusJobListsDocument> {
    const document: Partial<OptimusJobListsDocument> = {
      jobStatus: STATUS_INIT,
      jobId: data.orderType + '_' + data.orderDate + '_' + generateTransactionId(),
      jobName: data.orderType + '_' + data.orderDate + '_' + generateTransactionId(),
      jobDate: data.orderDate,
      jobZone: data.jobZone,
      jobType: data.orderType,
      itemsSize: data.itemsSize,
      createBy: data.createBy,
      updateBy: data.createBy,
      itemsList: data.itemsList,
    } as Partial<OptimusJobListsDocument>;

    return this.OptimusJobListModel.create(document);
  }
}
