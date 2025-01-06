import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { tap } from 'rxjs/operators';
  import { LoggerService } from '../../logger/logger.service';
  import { Request, Response } from 'express';
  import { IInfoLog } from '../../logger/interface';
  import { normalizeHeader } from '../../logger/utils';
  
  @Injectable()
  export class LoggingInterceptor implements NestInterceptor {
    constructor(
      private readonly loggerService: LoggerService,
    ) {}
  
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {  
      const request: Request = context.switchToHttp().getRequest();
      const response: Response = context.switchToHttp().getResponse();

      if (request.url === '/metrics') {
        return next.handle();
      }

      const logMessage: IInfoLog = {
        timestamp: new Date().toISOString(),
        id: request.id || '', 
        ip: normalizeHeader(request.ip || request.connection.remoteAddress) || '',
        requestId: normalizeHeader(request.headers['x-request-id']) || '',
        sessionId: normalizeHeader(request.headers['x-session-id']) || '',
        requestMethod: request.method,
        requestUri: request.originalUrl,
        requestHeaders: request.headers as Record<string, string>,
        requestParams: request.params,
        requestBody: request.body,
        responseStatus: response.statusCode, 
        responseBody: null, 
        responseTime: null,
        clientModule: normalizeHeader(request.headers['x-client-module']) || '', 
        clientPageName: normalizeHeader(request.headers['x-client-page-name']) || '', 
        clientAction: normalizeHeader(request.headers['x-client-action']) || '', 
        clientPageUrl: normalizeHeader(request.headers['x-client-page-url']) || '',
      };
  
      return next
        .handle()
        .pipe(
          tap((data) => {
            const duration = Date.now() - request.startTime;

            logMessage.responseBody = data; 
            logMessage.responseTime = duration 
            this.loggerService.logInfo(logMessage);
          })
        );
    }
  }
  