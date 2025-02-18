import { MongoConfiguration } from "src/config/mongo.config";
import { applyEncryption } from "../encryption.helper";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type SaleOrdersDocument = SaleOrders & Document;

@Schema()
export class ContractInfo {
  @Prop({ type: String })
  saleOrderNo: string;

  @Prop({ type: String })
  contractNo: string;

  @Prop({ type: String })
  groupOrderNo: string;

  @Prop({ type: String })
  company: string;

  @Prop({ type: String })
  accountName: string;

  @Prop({ type: String })
  accountNo: string;
}

export const ContractInfoSchema = SchemaFactory.createForClass(ContractInfo);

@Schema()
export class AddressInfo {
  @Prop({ type: Number })
  addressNo: number;

  @Prop({ type: String })
  address: string;

  @Prop({ type: String })
  deliveryDate: string;

  @Prop({ type: String })
  receiveName: string;

  @Prop({ type: String })
  contactPhone: string;

  @Prop({ type: String })
  province: string;
}

export const AddressInfoSchema = SchemaFactory.createForClass(AddressInfo);

@Schema()
export class SaleOrders {
  @Prop({ type: String })
  channel: string;

  @Prop({ type: String })
  transactionId: string;

  @Prop({ type: String })
  orderStatus: string;

  @Prop({ type: Number })
  totalItems: number;

  @Prop({ type: ContractInfoSchema })
  contractInfo: ContractInfo;

  @Prop({ type: AddressInfoSchema })
  addressInfo: AddressInfo;

  @Prop({ type: Object })
  moreInfo: object;

  @Prop({ type: String })
  updatedBy: string;

  @Prop({ type: Date, default: Date.now })
  TIMESTAMP: Date;
}

export const SaleOrdersSchema = SchemaFactory.createForClass(SaleOrders);

SaleOrdersSchema.index({ channel: 1, transactionId: 1, 'contractInfo.saleOrderNo': 1, 'contractInfo.contractNo': 1 })
SaleOrdersSchema.index({ channel: 1, transactionId: 1, 'contractInfo.saleOrderNo': 1, 'contractInfo.contractNo': 1, 'addressInfo.addressNo': 1 })
SaleOrdersSchema.index({ orderStatus: 1 })

export function encryptSaleOrdersSchema(mongoConfig: MongoConfiguration) {
  applyEncryption(ContractInfoSchema, mongoConfig, ["accountName"]);
  applyEncryption(AddressInfoSchema, mongoConfig, ["address", "contactPhone"]);
}
