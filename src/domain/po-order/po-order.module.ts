import { Module } from '@nestjs/common';
import { PoOrderController } from './po-order.controller';
import { MongoModule } from 'src/database/mongo/mongo.module';
import { QueryPoListService } from './po-order.services/query-po-list/query-po-list.service';
import { ReservePoJobToProcessService } from './po-order.services/reserve-po-job-to-process/reserve-po-job-to-process.service';
import { UpdatePoJobListService } from './po-order.services/update-po-job-list/update-po-job-list.service';
import { QueryPoJobListService } from './po-order.services/query-po-job-list/query-po-job-list.service';
import { MongoService } from 'src/database/mongo/mongo.service';

@Module({
  imports: [MongoModule],
  providers: [QueryPoListService, QueryPoJobListService, ReservePoJobToProcessService, UpdatePoJobListService, MongoService],
  controllers: [PoOrderController]
})
export class PoOrderModule {}
