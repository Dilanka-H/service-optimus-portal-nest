import { MongoConfiguration } from "src/config/mongo.config";
import { applyEncryption } from "../encryption.helper";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

export type SaleOrderJobListsDocument = SaleOrderJobLists & Document;

@Schema()
export class SaleOrderItemsList {
  @Prop({ type: String })
  itemRefId: string;

  @Prop({ type: String })
  mobileNo: string;

  @Prop({ type: String })
  companyDevice: string;

  @Prop({ type: String })
  phoneType: string;

  @Prop({ type: String })
  materialCode: string;

  @Prop({ type: String })
  imeiSerialNo: string;

  @Prop({ type: String })
  brand: string;

  @Prop({ type: String })
  model: string;

  @Prop({ type: String })
  color: string;

  @Prop({ type: String })
  flagScanImei: string;

  @Prop({ type: String })
  flagPrintSticker: string;

  @Prop({ type: String })
  customerName: string;

  @Prop({ type: String })
  province: string;

  @Prop({ type: String })
  layoutSticker: string;

  @Prop({ type: String })
  flagPersoSim: string;

  @Prop({ type: Number })
  itemNo: number;
}

export const SaleOrderItemsListSchema = SchemaFactory.createForClass(SaleOrderItemsList);

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
export class MoreInfo {
  @Prop({ type: String })
  lastPrint: string;

  @Prop({ type: Number })
  printCounter: number;
}

export const MoreInfoSchema = SchemaFactory.createForClass(MoreInfo);

@Schema()
export class DOInfo {
  @Prop({ type: String })
  DONumber0: string;

  @Prop({ type: String })
  DODate: string;

  @Prop({ type: String })
  errorDetail: string;
}

export const DOInfoSchema = SchemaFactory.createForClass(DOInfo);

@Schema({ timestamps: true })
export class SaleOrderJobLists {
  @Prop({ type: [SaleOrderItemsList], default: [] })
  saleOrderItemsList: SaleOrderItemsList[];

  @Prop({ type: String, required: false })
  channel: string;

  @Prop({ type: String, required: false })
  jobId: string;

  @Prop({ type: String, required: false })
  jobStatus: string;

  @Prop({ type: String, required: false })
  jobDate: string;

  @Prop({ type: String, required: false })
  transactionId: string;

  @Prop({ type: ContractInfoSchema, required: false })
  contractInfo: ContractInfo;

  @Prop({ type: AddressInfoSchema, required: false })
  addressInfo: AddressInfo;

  @Prop({ type: String, required: false })
  updatedBy: string;

  @Prop({ type: MoreInfoSchema })
  moreInfo: MoreInfo;

  @Prop({ type: DOInfoSchema })
  DOInfo: DOInfo;

  @Prop({ required: false, default: Date.now })
  TIMESTAMP: Date;
}

export const SaleOrderJobListsSchema = SchemaFactory.createForClass(SaleOrderJobLists);

SaleOrderJobListsSchema.index({ channel:1, transactionId: 1, 'contractInfo.saleOrderNo': 1, 'contractInfo.contractNo':1, 'addressInfo.addressNo': 1 })

export function encryptSaleOrderJobListsSchema(mongoConfig: MongoConfiguration) {
  applyEncryption(ContractInfoSchema, mongoConfig, ["accountName"]);
  applyEncryption(AddressInfoSchema, mongoConfig, ["address", "contactPhone"]);
}
