import { Body, Controller, Post } from '@nestjs/common';
import { NuOrderService } from './nu-order.service';

@Controller('nu-order')
export class NuOrderController {
constructor(
    private nuOrderService: NuOrderService
){}

@Post('insertJob')
  async insertJob(@Body() record: any) {
      return await this.nuOrderService.createOrder(record);
  }

  @Post('getJob')
  getJob() {
    return this.nuOrderService.findAll();
  }
}
