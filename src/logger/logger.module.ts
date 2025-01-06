import { Global, Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { ConfigModule } from '@nestjs/config';
import loggerConfig from '../config/logger.config';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
import { MetricsService } from 'src/common/metrics/metrics.service';

@Global()
@Module({
    imports: [
        ConfigModule.forFeature(loggerConfig),
    ],
    providers: [LoggerService, HttpExceptionFilter, MetricsService],
    exports: [LoggerService, HttpExceptionFilter],
})
export class LoggerModule {}
