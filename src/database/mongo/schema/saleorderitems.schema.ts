import { MongoConfiguration } from "src/config/mongo.config";
import { applyEncryption } from "../encryption.helper";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

export type SaleOrderItemsDocument = SaleOrderItems & Document;

@Schema()
export class DeviceInfo {
    @Prop({ type: String })
    mobileNo: string;
  
    @Prop({ type: String })
    companyDevice: string;
  
    @Prop({ type: String })
    phoneType: string;
  
    @Prop({ type: String })
    materialCode: string;
  
    @Prop({ type: String })
    brand: string;
  
    @Prop({ type: String })
    model: string;
  
    @Prop({ type: String })
    color: string;
  
    @Prop({ type: String })
    imeiSerialNo: string;
  
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
}

export const DeviceInfoSchema = SchemaFactory.createForClass(DeviceInfo);

@Schema()
export class SimInfo {
    @Prop({ type: String })
    mobileNo: string;
  
    @Prop({ type: String })
    chargeType: string;
  
    @Prop({ type: String })
    simType: string;
  
    @Prop({ type: String })
    simService: string;
  
    @Prop({ type: String })
    simSerial: string;
  
    @Prop({ type: String })
    simProductType: string;
  
    @Prop({ type: String })
    flagPersoSim: string;
  
    @Prop({ type: String })
    product: string;
  
    @Prop({ type: String })
    billingSystem: string;
  
    @Prop({ type: String })
    locationCode: string;
  
    @Prop({ type: String })
    imsi: string;
  
    @Prop({ type: String })
    networkCode: string;
  
    @Prop({ type: String })
    matCode: string;
  
    @Prop({ type: Object })
    prepInfo: object;
  
    @Prop({ type: Object })
    moreInfo: object;
}

export const SimInfoSchema = SchemaFactory.createForClass(SimInfo);
  
@Schema()
export class ContractInfo {
    @Prop({ type: Number })
    itemNo: number;
  
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
    doNo: string;
  
    @Prop({ type: String })
    doDate: string;
}  

export const AddressInfoSchema = SchemaFactory.createForClass(AddressInfo);

@Schema()
export class SaleOrderItems {
  @Prop({ required: true })
  channel: string;

  @Prop({ required: true })
  transactionId: string;

  @Prop({ required: true })
  itemStatus: string;

  @Prop({ required: true })
  itemRefId: string;

  @Prop({ required: true })
  jobId: string;

  @Prop({ required: true })
  jobDate: string;

  @Prop({ type: DeviceInfoSchema })
  deviceInfo: DeviceInfo;

  @Prop({ type: SimInfoSchema })
  simInfo: SimInfo;

  @Prop({ type: ContractInfoSchema })
  contractInfo: ContractInfo;

  @Prop({ type: AddressInfoSchema })
  addressInfo: AddressInfo;

  @Prop({ type: Object })
  moreInfo: object;

  @Prop({ required: true })
  updateBy: string;

  @Prop({ required: true, default: Date.now })
  TIMESTAMP: Date;
}

export const SaleOrderItemsSchema = SchemaFactory.createForClass(SaleOrderItems);

SaleOrderItemsSchema.index({ itemRefId: 1 });
SaleOrderItemsSchema.index({ channel: 1, transactionId: 1, 'contractInfo.contractNo': 1, 'contractInfo.saleOrderNo': 1, 'addressInfo.addressNo': 1, itemStatus: 1 });
SaleOrderItemsSchema.index({ channel: 1, 'contractInfo.contractNo': 1, 'contractInfo.saleOrderNo': 1, itemStatus: 1 });
SaleOrderItemsSchema.index({ channel: 1, 'contractInfo.contractNo': 1, 'contractInfo.saleOrderNo': 1, 'contractInfo.itemNo': 1, 'addressInfo.addressNo': 1, simInfo: 1 });

export function encryptSaleOrderItemsSchema(mongoConfig: MongoConfiguration) {
    applyEncryption(AddressInfoSchema, mongoConfig, ["address", "contactPhone"]);
    applyEncryption(ContractInfoSchema, mongoConfig, ["accountName"]);
    applyEncryption(DeviceInfoSchema, mongoConfig, ["mobileNo"]);
    applyEncryption(SimInfoSchema, mongoConfig, ["mobileNo"]);
}
