import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Logger from './logger';
import { IInfoLog, IAccessLog, IRootLog, IServiceLog } from './interface';

@Injectable()
export class LoggerService {
  private readonly logger: Logger;

  constructor(private readonly configService: ConfigService) {
    const logOptions = {
      stdout: this.configService.get<boolean>('logger.stdout', true),
      path: this.configService.get<string>('logger.path', 'logs/app.log'),
      rotateTime: this.configService.get<number>('logger.rotateTime', 86400000), // 1 day
      serviceNames: this.configService.get<string[]>('logger.serviceNames') || [],
    };
    this.logger = new Logger(logOptions);
  }

  logApp(message: IInfoLog): void {
    this.logger.appLog(message);
  }

  logAccess(message: IAccessLog): void {
    this.logger.accessLog(message);
  }

  logInfo(message: IInfoLog): void {
    this.logger.infoLog(message);
  }

  logRoot(message: IRootLog): void {
    this.logger.rootLog(message);
  }

  logService(message: IServiceLog): void {
    this.logger.serviceLog(message);
  }
}
