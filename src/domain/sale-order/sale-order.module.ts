import { Module } from '@nestjs/common';
import { MongoModule } from 'src/database/mongo/mongo.module'; // Import MongoModule
import { OptimusJobListsService } from 'src/database/mongo/repositories/optimusjoblists.service';
import { SaleOrderItemsService } from 'src/database/mongo/repositories/saleorderitems.service';
import { SaleOrderJobListsService } from 'src/database/mongo/repositories/saleorderjoblists.service';
import { SaleOrderController } from './sale-order.controller';
import { SaleOrderService } from './sale-order.service';

@Module({
  imports: [MongoModule],
  providers: [SaleOrderService, OptimusJobListsService, SaleOrderJobListsService, SaleOrderItemsService],
  controllers: [SaleOrderController],
})
export class SaleOrderModule {}
