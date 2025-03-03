import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import * as timezone from 'dayjs/plugin/timezone';
import * as utc from 'dayjs/plugin/utc';
import { TIMEZONE_THAI } from 'src/common/constants';
import { IPoHeaderCondition, IPoJobCondition } from 'src/common/interfaces/database_domain.interface';
import { PoJobsRepository } from 'src/database/mongo/repositories/po_jobs.service';
import { QueryPoJobListDto } from 'src/domain/po-order/dto/query-po-job-list.dto';

dayjs.extend(utc);
dayjs.extend(timezone);

@Injectable()
export class QueryPoJobListService {
  constructor(private poJobsService: PoJobsRepository) {}

  async queryPoJobList(queryPoJobListDto: QueryPoJobListDto) {
    const conditionPoJob: IPoJobCondition = {};
    const conditionPoHeader: IPoHeaderCondition = {};

    if (queryPoJobListDto.PONumber) {
      conditionPoJob.PONumber = queryPoJobListDto.PONumber;
    }
    if (queryPoJobListDto.PRNumber) {
      conditionPoHeader.PRNumber = queryPoJobListDto.PRNumber;
    }
    if (queryPoJobListDto.POStatus) {
      conditionPoHeader.status = queryPoJobListDto.POStatus;
    }
    if (queryPoJobListDto.SalesOrder) {
      conditionPoJob.SalesOrder = queryPoJobListDto.SalesOrder;
    }
    if (queryPoJobListDto.jobId) {
      conditionPoJob.jobId = queryPoJobListDto.jobId;
    }
    if (queryPoJobListDto.excludeStatus) {
      conditionPoJob.jobStatus = { $nin: queryPoJobListDto.excludeStatus };
    }
    if (queryPoJobListDto.jobStatus) {
      conditionPoJob.jobStatus = { $in: queryPoJobListDto.jobStatus };
    }
    if (queryPoJobListDto.Inspect1?.Inspect1status) {
      conditionPoJob['inspectInfo.inspectStatus1'] = queryPoJobListDto.Inspect1.Inspect1status;
    }
    if (queryPoJobListDto.Inspect2?.Inspect2status) {
      conditionPoJob['inspectInfo.inspectStatus2'] = queryPoJobListDto.Inspect2?.Inspect2status;
    }
    if (queryPoJobListDto.POstartDate && queryPoJobListDto.POendDate) {
      conditionPoHeader.PODate = {
        $gte: dayjs.tz(queryPoJobListDto.POstartDate, TIMEZONE_THAI).startOf('day').utc().toDate(),
        $lte: dayjs.tz(queryPoJobListDto.POendDate, TIMEZONE_THAI).endOf('day').utc().toDate(),
      };
    }
    if (queryPoJobListDto.Inspect1?.Inspect1startDate && queryPoJobListDto.Inspect1?.Inspect1endDate) {
      conditionPoJob['inspectInfo.inspectDate1'] = {
        $gte: dayjs.tz(queryPoJobListDto.Inspect1.Inspect1startDate, TIMEZONE_THAI).startOf('day').utc().toISOString(),
        $lte: dayjs.tz(queryPoJobListDto.Inspect1.Inspect1endDate, TIMEZONE_THAI).endOf('day').utc().toISOString(),
      };
    }
    if (queryPoJobListDto.Inspect2?.Inspect2startDate && queryPoJobListDto.Inspect2?.Inspect2endDate) {
      conditionPoJob['inspectInfo.inspectDate2'] = {
        $gte: dayjs.tz(queryPoJobListDto.Inspect2.Inspect2startDate, TIMEZONE_THAI).startOf('day').utc().toISOString(),
        $lte: dayjs.tz(queryPoJobListDto.Inspect2.Inspect2endDate, TIMEZONE_THAI).endOf('day').utc().toISOString(),
      };
    }
    if (queryPoJobListDto.GIGR?.GIGRstartDate && queryPoJobListDto.GIGR?.GIGRendDate) {
      conditionPoJob['GIGRInfo.GIGRDate'] = {
        $gte: dayjs.tz(queryPoJobListDto.GIGR.GIGRstartDate, TIMEZONE_THAI).startOf('day').utc().toISOString(),
        $lte: dayjs.tz(queryPoJobListDto.GIGR.GIGRendDate, TIMEZONE_THAI).endOf('day').utc().toISOString(),
      };
    }
    if (queryPoJobListDto.SIMGroup) {
      conditionPoHeader.SIMGroup = { $in: queryPoJobListDto.SIMGroup };
    }
    if (queryPoJobListDto.material) {
      conditionPoHeader.Material = queryPoJobListDto.material;
    }
    if (queryPoJobListDto.description) {
      conditionPoHeader.Description = queryPoJobListDto.description;
    }

    return await this.poJobsService.queryPoJobList(conditionPoJob, conditionPoHeader);
  }
}
