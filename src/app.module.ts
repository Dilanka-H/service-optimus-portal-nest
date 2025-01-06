import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from './logger/logger.module';
import loggerConfig from './config/logger.config';
import { LoggingInterceptor } from './common/interceptors/logger.interceptor'
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { MiddlewareModule } from './middleware/middleware.module';
import { TypesModule } from './types/types.module';
import { UserModule } from './domain/user/user.module';
import { AuthModule } from './auth/auth.module';
// import jwtConfig from './config/jwt.config';
import { ConfigifyModule } from '@itgorillaz/configify';
// import { SaleOrderModule } from './domain/sale-order/sale-order.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoConfiguration } from './config/mongo.config';
import { SaleOrderModule } from './domain/sale-order/sale-order.module';
import { MongoModule } from './database/mongo/mongo.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { StandardResponseInterceptor } from './common/interceptors/response.interceptor';
import { NuOrderModule } from './domain/nu-order/nu-order.module';
import { AppConfiguration } from './config/app.config';
import { SeedService } from './database/mongo/seeds/optimus-cloud.seed.service';
import { MetricsModule } from './common/metrics/metrics.module';
import { WebsocketModule } from './websocket/websocket.module';
import { PoOrderModule } from './domain/po-order/po-order.module';
// import { KafkaModule } from './jobs/kafka/kafka.module';

@Module({
  imports: [ ConfigModule.forRoot({
    envFilePath: [
      `.env.${process.env.NODE_ENV || 'dev'}`,  
    ],
    load: [loggerConfig],
    isGlobal: true, 
  }), 
  LoggerModule, MiddlewareModule, TypesModule, UserModule, SaleOrderModule, NuOrderModule, PoOrderModule, MongoModule, AuthModule, MetricsModule, ConfigifyModule.forRootAsync({configFilePath: `.env.${process.env.NODE_ENV}`}), WebsocketModule],
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
    useValue: new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  },
  AppService, AppConfiguration, SeedService],
  exports: [AppConfiguration]
})
export class AppModule {}
