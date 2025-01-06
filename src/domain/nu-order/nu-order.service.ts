import { Injectable } from '@nestjs/common';
import { SaleOrderJobLists } from 'src/database/mongo/schema/saleorderjoblists.schema';
import { SaleOrderJobListsService } from 'src/database/mongo/services/saleorderjoblists.service';

@Injectable()
export class NuOrderService {
    constructor(
        private saleorderjoblistsService: SaleOrderJobListsService
    ){}

    async createOrder(createDto: any) {
        return this.saleorderjoblistsService.createJob(createDto);
    }

    async findAll(): Promise<SaleOrderJobLists[]> {
        return this.saleorderjoblistsService.findAll();
    }
}
