import { Module } from '@nestjs/common';
import { MongoModule } from 'src/database/mongo/mongo.module'; // Import MongoModule
import { OptimusJobListsRepository } from 'src/database/mongo/repositories/optimusjoblists/optimusjoblists.repository';
import { SaleOrderItemsRepository } from 'src/database/mongo/repositories/saleorderitems/saleorderitems.repository';
import { SaleOrderJobListsRepository } from 'src/database/mongo/repositories/saleorderjoblists/saleorderjoblists.repository';
import { SaleOrderController } from './sale-order.controller';
import { SaleOrderService } from './sale-order.service';

@Module({
  imports: [MongoModule],
  providers: [SaleOrderService, OptimusJobListsRepository, SaleOrderJobListsRepository, SaleOrderItemsRepository],
  controllers: [SaleOrderController],
})
export class SaleOrderModule {}
