import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as dayjs from 'dayjs';
import * as timezone from 'dayjs/plugin/timezone';
import { Model } from 'mongoose';
import { STATUS_INACTIVE, TIMEZONE_THAI } from 'src/common/constants';
import { MongoService } from 'src/database/mongo/mongo.service';
import { MasterCustomerCondition } from 'src/database/mongo/repositories/mastercustomers/mastercustomers.interface';
import { MasterCustomers, MasterCustomersDocument } from 'src/database/mongo/schema/master_customers.schema';
import { QueryMasterCustomerDto } from '../../dto/query-master-customer.dto';

dayjs.extend(timezone);

@Injectable()
export class QueryMasterCustomerService {
  constructor(
    @InjectModel(MasterCustomers.name) private MasterCustomersModel: Model<MasterCustomersDocument>,
    private mongoService: MongoService,
  ) {}

  async queryMasterCustomer(queryMasterCustomerDto: QueryMasterCustomerDto) {
    const condition: MasterCustomerCondition = {};
    let response: Partial<MasterCustomersDocument[]> = [];
    const status = queryMasterCustomerDto.status === 'all' ? undefined : queryMasterCustomerDto.status;
    if (queryMasterCustomerDto.SAPCode) {
      condition.SAPCode = queryMasterCustomerDto.SAPCode;
    } else if (queryMasterCustomerDto.customerName) {
      condition.customerName = queryMasterCustomerDto.customerName;
    }

    if (queryMasterCustomerDto.PGPExpireDateFrom && queryMasterCustomerDto.PGPExpireDateTo) {
      condition['eSim.expireDate'] = {
        $gte: dayjs.tz(queryMasterCustomerDto.PGPExpireDateFrom, TIMEZONE_THAI).startOf('day').utc().toISOString(),
        $lte: dayjs.tz(queryMasterCustomerDto.PGPExpireDateTo, TIMEZONE_THAI).endOf('day').utc().toISOString(),
      };
    }
    if (queryMasterCustomerDto.flagValidate) {
      condition.status = STATUS_INACTIVE;
    }
    if (queryMasterCustomerDto.products) {
      condition.products = queryMasterCustomerDto.products;
    }

    const result = await this.mongoService.findDocuments(this.MasterCustomersModel, condition);
    const mapSapCode: Partial<MasterCustomersDocument> = {};
    if (status) {
      result.forEach((res: MasterCustomersDocument) => {
        if (!mapSapCode[res.SAPCode]) {
          mapSapCode[res.SAPCode] = [];
        }
        if (!status || res.status === status) {
          mapSapCode[res.SAPCode].push(res);
        }
      });
      response = Object.values(mapSapCode).flatMap((arr) => arr);
    } else {
      response = result;
    }
    return response;
  }
}
