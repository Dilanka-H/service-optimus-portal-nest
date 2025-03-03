import { Injectable } from '@nestjs/common';
import { SaleOrderJobListsService } from 'src/database/mongo/repositories/saleorderjoblists.service';
import { SaleOrderJobLists } from 'src/database/mongo/schema/saleorderjoblists.schema';

@Injectable()
export class NuOrderService {
  constructor(private saleorderjoblistsService: SaleOrderJobListsService) {}

  async createOrder(createDto: any) {
    return this.saleorderjoblistsService.createJob(createDto);
  }

  async findAll(): Promise<SaleOrderJobLists[]> {
    return this.saleorderjoblistsService.findSaleOrderJobList({});
  }
}
