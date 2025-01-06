import { MongoConfiguration } from "src/config/mongo.config";
import { applyEncryption } from "../encryption.helper";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

export type SaleOrderTransactionsDocument = SaleOrderTransactions & Document;

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
export class SaleOrderTransactions {
    @Prop({ type: String })
    option: string;
  
    @Prop({ type: String })
    channel: string;
  
    @Prop({ type: String })
    transactionId: string;
  
    @Prop({ type: String })
    saleOrderNo: string;
  
    @Prop({ type: String })
    contractNo: string;
  
    @Prop({ type: String })
    groupOrderNo: string;
  
    @Prop({ type: String })
    company: string;
  
    @Prop({ type: String })
    accountNo: string;
  
    @Prop({ type: String })
    accountName: string;
  
    @Prop({ type: Number })
    totalItems: number;

    @Prop({ type: AddressInfoSchema })
    addressInfo: AddressInfo;

    @Prop({ type: Array })
    itemsList: Array<Object>;

    @Prop({ type: Object })
    result: Object;

    @Prop({ type: Date, default: Date.now })
    TIMESTAMP: Date;
}

export const SaleOrderTransactionsSchema = SchemaFactory.createForClass(SaleOrderTransactions);

SaleOrderTransactionsSchema.index({ option: 1, channel: 1, transactionId: 1, saleOrderNo: 1, contractNo: 1, accountNo: 1 })
SaleOrderTransactionsSchema.index({ channel: 1, transactionId: 1, saleOrderNo: 1, contractNo: 1 })

export function encryptSaleOrderTransactionsSchema(mongoConfig: MongoConfiguration) {
  applyEncryption(AddressInfoSchema, mongoConfig, ["address", "contactPhone"]);
}
