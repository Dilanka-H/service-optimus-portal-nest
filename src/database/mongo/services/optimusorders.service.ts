import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OptimusOrders } from '../schema/optimusorders.schema';

@Injectable()
export class OptimusOrdersService {
  constructor(
    @InjectModel(OptimusOrders.name) private OptimusOrdersModel: Model<OptimusOrders>,
  ) {}
}
