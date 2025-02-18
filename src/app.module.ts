import { ConfigifyModule } from '@itgorillaz/configify';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logger.interceptor';
import { StandardResponseInterceptor } from './common/interceptors/response.interceptor';
import { MetricsModule } from './common/metrics/metrics.module';
import { DtoValidationPipe } from './common/pipes/validation.pipe';
import { AppConfiguration } from './config/app.config';
import loggerConfig from './config/logger.config';
import { MongoModule } from './database/mongo/mongo.module';
import { SeedService } from './database/mongo/seeds/optimus-cloud.seed.service';
import { KafkaApiModule } from './domain/kafka-api/kafka-api.module';
import { MachineNoModule } from './domain/machine-no/machine-no.module';
import { NuOrderModule } from './domain/nu-order/nu-order.module';
import { PoOrderModule } from './domain/po-order/po-order.module';
import { SaleOrderModule } from './domain/sale-order/sale-order.module';
import { UserModule } from './domain/user/user.module';
import { LoggerModule } from './logger/logger.module';
import { MiddlewareModule } from './middleware/middleware.module';
import { WebsocketModule } from './websocket/websocket.module';

@Module({
  imports: [ ConfigModule.forRoot({
    envFilePath: [
      `.env.${process.env.NODE_ENV || 'dev'}`,  
    ],
    load: [loggerConfig],
    isGlobal: true, 
  }), 
  LoggerModule, MiddlewareModule, UserModule, SaleOrderModule, MachineNoModule, NuOrderModule, PoOrderModule, MongoModule, AuthModule, MetricsModule, KafkaApiModule, ConfigifyModule.forRootAsync({configFilePath: `.env.${process.env.NODE_ENV}`}), WebsocketModule],
  controllers: [AppController],
  providers: [
  {
    provide: APP_INTERCEPTOR,
    useClass: StandardResponseInterceptor,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: LoggingInterceptor,
  },
  {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter,
  },
  {
    provide: APP_PIPE,
    useClass: DtoValidationPipe,
  },
  AppService, AppConfiguration, SeedService],
  exports: [AppConfiguration]
})
export class AppModule {}
