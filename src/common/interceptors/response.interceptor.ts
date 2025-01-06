import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  import { StandardResponse } from '../interfaces/response.interface';
  import * as constants from "../constants"
import { populateMetricLabels } from '../utils';
import { MetricsService } from '../metrics/metrics.service';
import { Request } from 'express';
  
  @Injectable()
export class StandardResponseInterceptor implements NestInterceptor {
  constructor(
    private readonly metricsService: MetricsService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();

    if (request.url === '/metrics') {
      return next.handle();
    }

    return next.handle().pipe(
      map((data) => {
        const duration = Date.now() - request.startTime;
        const formattedResponse: StandardResponse = {
          resultCode: constants.RESULT_SUCCESS_CODE,
          resultDescription: constants.RESULT_SUCCESS_MESSAGE,
          developerMessage: constants.RESULT_SUCCESS_DEV_MESSAGE,
          data: data,
        };

        const labels = populateMetricLabels(null, "optimus-be", "INBOUND", request, formattedResponse)
        const labelsTime = populateMetricLabels(duration.toString(), "optimus-be", "INBOUND", request, formattedResponse)

        this.metricsService.incrementInboundRequests(labels);
        this.metricsService.observeRequestDuration(labels, duration);
        this.metricsService.incrementInboundRequestTime(labelsTime)
        this.metricsService.observeInboundRequestTimeDuration(labelsTime, duration);
        return formattedResponse;
      })
    );
  }
}
  