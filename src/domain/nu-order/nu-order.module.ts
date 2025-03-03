import { Module } from '@nestjs/common';
import { MongoModule } from 'src/database/mongo/mongo.module';
import { SaleOrderJobListsService } from 'src/database/mongo/repositories/saleorderjoblists.service';
import { NuOrderController } from './nu-order.controller';
import { NuOrderService } from './nu-order.service';

@Module({
  imports: [MongoModule],
  providers: [NuOrderService, SaleOrderJobListsService],
  controllers: [NuOrderController],
})
export class NuOrderModule {}
