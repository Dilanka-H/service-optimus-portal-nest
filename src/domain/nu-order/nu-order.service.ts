import { Injectable } from '@nestjs/common';
import { SaleOrderJobListsRepository } from 'src/database/mongo/repositories/saleorderjoblists/saleorderjoblists.repository';
import { SaleOrderJobLists } from 'src/database/mongo/schema/saleorderjoblists.schema';

@Injectable()
export class NuOrderService {
  constructor(private saleorderjoblistsRepository: SaleOrderJobListsRepository) {}

  async createOrder(createDto: any) {
    return this.saleorderjoblistsRepository.createJob(createDto);
  }

  async findAll(): Promise<SaleOrderJobLists[]> {
    return this.saleorderjoblistsRepository.findSaleOrderJobList({});
  }
}
