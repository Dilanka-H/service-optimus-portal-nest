import { Injectable } from '@nestjs/common';
import { UpdateJobListDto } from './dto/update-job-list.dto';
import * as moment from "moment";
import { SaleOrderJobListsService } from 'src/database/mongo/services/saleorderjoblists.service';
import { SaleOrderJobLists } from 'src/database/mongo/schema/saleorderjoblists.schema';
import { UpdateSaleOrderItemDto } from './dto/update-sale-order-item.dto';
import { SaleOrderItemsService } from 'src/database/mongo/services/saleorderitems.service';

@Injectable()
export class SaleOrderService {
    constructor(
        private saleOrderJobListsService: SaleOrderJobListsService,
        private saleOrderItemsService: SaleOrderItemsService
    ){}

    async updateJobList(updateJobListDto: UpdateJobListDto) {
        const { condition, updateData } = updateJobListDto;
        updateData["TIMESTAMP"] = moment().toISOString();

        const result = await this.saleOrderJobListsService.updateJobList(
            condition,
            updateData,
          );

        return result; 
    }

    async updateOrderItem(updateSaleOrderItemDto: UpdateSaleOrderItemDto) {
      const { condition, updateData } = updateSaleOrderItemDto;
      const result = await this.saleOrderItemsService.updateOrderItem(
          condition,
          updateData,
        );

      return result; 
  }

    async createOrder(createDto: any) {
      return this.saleOrderJobListsService.createJob(createDto);
    }

    async findAll(): Promise<SaleOrderJobLists[]> {
      return this.saleOrderJobListsService.findSaleOrderJobList({});
    }
}
