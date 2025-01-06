import { Module } from '@nestjs/common';
import { SaleOrderService } from './sale-order.service';
import { SaleOrderController } from './sale-order.controller';
import { MongoModule } from 'src/database/mongo/mongo.module'; // Import MongoModule
import { OptimusJobListsService } from 'src/database/mongo/services/optimusjoblists.service';
import { SaleOrderJobListsService } from 'src/database/mongo/services/saleorderjoblists.service';
import { SaleOrderItemsService } from 'src/database/mongo/services/saleorderitems.service';

@Module({
  imports: [MongoModule], 
  providers: [SaleOrderService, OptimusJobListsService, SaleOrderJobListsService, SaleOrderItemsService],
  controllers: [SaleOrderController],
})
export class SaleOrderModule {}
