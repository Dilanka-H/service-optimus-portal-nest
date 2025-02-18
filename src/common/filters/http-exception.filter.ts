import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { IInfoLog } from '../../logger/interface';
import { LoggerService } from '../../logger/logger.service';
import { normalizeHeader } from '../../logger/utils';
import { StandardResponse } from '../interfaces/response.interface';
import { MetricsService } from '../metrics/metrics.service';
import { populateMetricLabels } from '../utils';
  
  @Catch(HttpException)
  @Injectable()
  export class HttpExceptionFilter implements ExceptionFilter {  
    constructor(
      private readonly loggerService: LoggerService,
      private readonly metricsService: MetricsService
    ) {}
  
    catch(exception: HttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const request = ctx.getRequest<Request>();
      const response = ctx.getResponse<Response>();
      const status = exception.getStatus();
      const message = exception.message || 'Unexpected error';

      const logMessage: IInfoLog = {
        timestamp: new Date().toISOString(),
        id: request.id || '',
        ip: request.ip || request.connection.remoteAddress || '',
        requestId: normalizeHeader(request.headers['x-request-id']) || '',
        sessionId: normalizeHeader(request.headers['x-session-id']) || '',
        requestMethod: request.method,
        requestUri: request.originalUrl,
        requestHeaders: request.headers as Record<string, string>,
        requestParams: request.params,
        requestBody: request.body,
        responseStatus: status,
        responseBody: {},
        responseTime: null,
        clientModule: normalizeHeader(request.headers['x-client-module']) || '', 
        clientPageName: normalizeHeader(request.headers['x-client-page-name']) || '', 
        clientAction: normalizeHeader(request.headers['x-client-action']) || '', 
        clientPageUrl: normalizeHeader(request.headers['x-client-page-url']) || '',
      };
    
      const errorMessage = exception.getResponse() as any;
      const duration = Date.now() - request.startTime;
      const formattedErrorResponse: StandardResponse = {
        resultCode: status.toString(),
        resultDescription: errorMessage.message,
        developerMessage: message,
        errors: errorMessage.errors
      };
      
      logMessage.responseBody = formattedErrorResponse
      logMessage.responseTime = duration

      this.loggerService.logInfo(logMessage);

      const labels = populateMetricLabels(null, "optimus-be", "INBOUND", request, formattedErrorResponse)
      const labelsTime = populateMetricLabels(duration.toString(), "optimus-be", "INBOUND", request, formattedErrorResponse)

      this.metricsService.incrementInboundRequests(labels);
      this.metricsService.observeRequestDuration(labels, duration);
      this.metricsService.incrementInboundRequestTime(labelsTime)
      this.metricsService.observeInboundRequestTimeDuration(labelsTime, duration);

      response.status(status).json(
        formattedErrorResponse
      );
    }
  }
  