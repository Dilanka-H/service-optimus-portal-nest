import { Body, Controller, Post } from '@nestjs/common';
import {SaleOrderService} from "./sale-order.service"
import { UpdateJobListDto } from './dto/update-job-list.dto';
import { UpdateSaleOrderItemDto } from './dto/update-sale-order-item.dto';

@Controller('sale-order')
export class SaleOrderController {
    constructor(
        private saleOrderService: SaleOrderService
    ){}
    @Post('updateJobList')
    async updateJobList(@Body() updateJobListDto: UpdateJobListDto) {
        return this.saleOrderService.updateJobList(updateJobListDto);
    } 
    
    @Post('updateOrderItem')
    async updateOrderItem(@Body() updateSaleOrderItemDto: UpdateSaleOrderItemDto) {
        return this.saleOrderService.updateOrderItem(updateSaleOrderItemDto);
    }

  @Post('getJob')
  getJob() {
    return this.saleOrderService.findAll();
  }

  @Post('insertJob')
  async insertJob(@Body() record: any) {
      return await this.saleOrderService.createOrder(record);
  }
}
