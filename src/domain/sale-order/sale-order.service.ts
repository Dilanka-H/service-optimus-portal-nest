import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { SaleOrderItemsRepository } from 'src/database/mongo/repositories/saleorderitems/saleorderitems.repository';
import { SaleOrderJobListsRepository } from 'src/database/mongo/repositories/saleorderjoblists/saleorderjoblists.repository';
import { SaleOrderJobLists } from 'src/database/mongo/schema/saleorderjoblists.schema';
import { UpdateJobListDto } from './dto/update-job-list.dto';
import { UpdateSaleOrderItemDto } from './dto/update-sale-order-item.dto';

@Injectable()
export class SaleOrderService {
  constructor(
    private saleOrderJobListsRepository: SaleOrderJobListsRepository,
    private saleOrderItemsRepository: SaleOrderItemsRepository,
  ) {}

  async updateJobList(updateJobListDto: UpdateJobListDto) {
    const { condition, updateData } = updateJobListDto;
    updateData['TIMESTAMP'] = moment().toISOString();

    const result = await this.saleOrderJobListsRepository.updateJobList(condition, updateData);

    return result;
  }

  async updateOrderItem(updateSaleOrderItemDto: UpdateSaleOrderItemDto) {
    const { condition, updateData } = updateSaleOrderItemDto;
    const result = await this.saleOrderItemsRepository.updateOrderItem(condition, updateData);

    return result;
  }

  async createOrder(createDto: any) {
    return this.saleOrderJobListsRepository.createJob(createDto);
  }

  async findAll(): Promise<SaleOrderJobLists[]> {
    return this.saleOrderJobListsRepository.findSaleOrderJobList({});
  }
}
