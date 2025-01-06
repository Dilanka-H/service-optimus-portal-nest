import { Module } from '@nestjs/common';
import { NuOrderService } from './nu-order.service';
import { NuOrderController } from './nu-order.controller';
import { MongoModule } from 'src/database/mongo/mongo.module';
import { SaleOrderJobListsService } from 'src/database/mongo/services/saleorderjoblists.service';

@Module({
  imports: [MongoModule],
  providers: [NuOrderService, SaleOrderJobListsService],
  controllers: [NuOrderController]
})
export class NuOrderModule {}
