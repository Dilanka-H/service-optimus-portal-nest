import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { RequestMiddleware } from './reqeust.middleware'; 
import { MultipartMiddleware } from './multipart.middleware';

@Module({})
export class MiddlewareModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MultipartMiddleware, RequestMiddleware)
      .forRoutes('*'); 
  }
}
