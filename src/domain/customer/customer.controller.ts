import { Body, Controller, Post } from '@nestjs/common';
import { QueryMasterCustomerService } from './customer.services/query-master-customer/query-master-customer.service';
import { QueryMasterCustomerDto } from './dto/query-master-customer.dto';

@Controller('customer')
export class CustomerController {
    constructor(
        private queryMasterCustomerService: QueryMasterCustomerService
    ){}
    @Post('queryCustomer')
    async queryMasterCustomer(@Body() queryMasterCustomerDto: QueryMasterCustomerDto) {
        return this.queryMasterCustomerService.queryMasterCustomer(queryMasterCustomerDto);
    }
}
