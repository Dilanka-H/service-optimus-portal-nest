import { Module } from '@nestjs/common';
import { MongoModule } from 'src/database/mongo/mongo.module';
import { SaleOrderJobListsRepository } from 'src/database/mongo/repositories/saleorderjoblists/saleorderjoblists.repository';
import { NuOrderController } from './nu-order.controller';
import { NuOrderService } from './nu-order.service';

@Module({
  imports: [MongoModule],
  providers: [NuOrderService, SaleOrderJobListsRepository],
  controllers: [NuOrderController],
})
export class NuOrderModule {}
