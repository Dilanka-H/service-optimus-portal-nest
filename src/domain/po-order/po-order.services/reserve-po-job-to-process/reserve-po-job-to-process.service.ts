import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as dayjs from 'dayjs';
import * as timezone from 'dayjs/plugin/timezone';
import * as utc from 'dayjs/plugin/utc';
import { Model } from 'mongoose';
import {
  RESULT_FAIL_MESSAGE,
  RESULT_NOT_FOUND_MESSAGE,
  RESULT_SUCCESS_MESSAGE,
  STATUS_CANCELED,
  STATUS_ON_PROCESS,
  TIMEZONE_THAI,
} from 'src/common/constants';
import {
  IPoHeaderCondition,
  IPoHeaderSetParams,
  IPoJobCondition,
  IPoJobSetParams,
} from 'src/common/interfaces/database_domain.interface';
import { MongoService } from 'src/database/mongo/mongo.service';
import { PoHeaders, PoHeadersDocument } from 'src/database/mongo/schema/po_headers.schema';
import { PoJobs, PoJobsDocument } from 'src/database/mongo/schema/po_jobs.schema';
import { PoJobsService } from 'src/database/mongo/services/po_jobs.service';
import { ReservePoJobToProcessDto } from 'src/domain/po-order/dto/reserve-po-job-to-process.dto';
import { IReservePoJobToProcessResponse } from 'src/domain/po-order/po-order.services/reserve-po-job-to-process/interfaces';

dayjs.extend(utc);
dayjs.extend(timezone);

@Injectable()
export class ReservePoJobToProcessService {
  constructor(
    @InjectModel(PoJobs.name) private PoJobsModel: Model<PoJobsDocument>,
    @InjectModel(PoHeaders.name) private PoHeadersModel: Model<PoHeadersDocument>,
    private poJobsService: PoJobsService,
    private mongoService: MongoService,
  ) {}

  async reservePoJobToProcess(reservePoJobToProcessDto: ReservePoJobToProcessDto) {
    const condition: IPoJobCondition = {} as IPoJobCondition;
    const setParams: IPoJobSetParams = {} as IPoJobSetParams;
    const response: IReservePoJobToProcessResponse[] = [];

    for (const jobId of reservePoJobToProcessDto.jobId) {
      condition.jobId = jobId;
      condition['lockInfo.lockedBy'] = '';
      if (reservePoJobToProcessDto.reserveFlag) {
        setParams.lockedBy = reservePoJobToProcessDto.tokenUser;
        setParams.lockedDateTime = dayjs.tz(Date.now(), TIMEZONE_THAI).utc().toISOString();
      } else {
        setParams.lockedBy = '';
        setParams.lockedDateTime = '';
      }
      const result = await this.poJobsService.reservePoJobToProcess(condition, setParams);
      if (result) {
        try {
          const lastUpdate = dayjs.tz(Date.now(), TIMEZONE_THAI).utc().toISOString();
          const conditionPOHeader: IPoHeaderCondition = { PONumber: result.PONumber };
          const conditionPOJob: IPoJobCondition = { jobId: jobId };
          const setParamsPoHeader: IPoHeaderSetParams = { lastUpdate: lastUpdate };
          const setParamsPoJob: IPoJobSetParams = { lastUpdate: lastUpdate };

          if (!reservePoJobToProcessDto.SIMGroup) {
            const result = await this.mongoService.findDocuments(this.PoHeadersModel, conditionPOHeader);
            if (result && result.length > 0) {
              reservePoJobToProcessDto.SIMGroup = result[0].SIMGroup;
            }
          }
          switch (reservePoJobToProcessDto.action) {
            case 'inspect1':
              setParamsPoJob['inspectInfo.inspectStatus1'] = STATUS_ON_PROCESS;
              break;
            case 'inspect2':
              setParamsPoJob['inspectInfo.inspectStatus2'] = STATUS_ON_PROCESS;
              break;
            case 'process':
              setParamsPoJob.jobStatus = STATUS_ON_PROCESS;
              if (reservePoJobToProcessDto.SIMGroup != 'PSIM') {
                setParamsPoHeader.status = STATUS_ON_PROCESS;
              }
              break;
            case 'cancel':
              setParamsPoJob.jobStatus = STATUS_CANCELED;
              if (reservePoJobToProcessDto.SIMGroup != 'PSIM') {
                setParamsPoHeader.status = STATUS_CANCELED;
              }
              break;
            default:
              break;
          }

          if (Object.keys(setParamsPoJob) && Object.keys(setParamsPoJob).length != 0) {
            await this.mongoService.updateManyDocuments(this.PoJobsModel, conditionPOJob, setParamsPoJob);
          }
          if (setParamsPoHeader.status) {
            await this.mongoService.updateManyDocuments(this.PoHeadersModel, conditionPOHeader, setParamsPoHeader);
          }
          response.push({ jobId: jobId, lockedBy: reservePoJobToProcessDto.tokenUser, result: RESULT_SUCCESS_MESSAGE });
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
          response.push({ jobId: jobId, lockedBy: reservePoJobToProcessDto.tokenUser, result: RESULT_FAIL_MESSAGE });
        }
      } else {
        const findCondition: IPoJobCondition = { jobId: jobId };
        const existingDocument = await this.mongoService.findDocuments(
          this.PoJobsModel,
          findCondition,
          'jobId lockInfo',
        );

        if (existingDocument && existingDocument.length > 0) {
          response.push({
            jobId: existingDocument[0].jobId,
            lockedBy: existingDocument[0].lockInfo.lockedBy,
            result: RESULT_FAIL_MESSAGE,
          });
        } else {
          response.push({ jobId: jobId, lockedBy: '', result: RESULT_NOT_FOUND_MESSAGE });
        }
      }
    }

    return response;
  }
}
