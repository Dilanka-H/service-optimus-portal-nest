import { MongoConfiguration } from "src/config/mongo.config";
import { applyEncryption } from "../encryption.helper";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

export type OptimusOrdersDocument = OptimusOrders & Document;

@Schema({_id: false})
export class NuMobileData {
  @Prop({ type: String })
  chargeType: string;

  @Prop({ type: String })
  networkType: string;

  @Prop({ type: String })
  newMobileNo: string;

  @Prop({ type: String })
  packageType: string;

  @Prop({ type: String })
  ppSimMaterialCode: string;

  @Prop({ type: String })
  productType: string;

  @Prop({ type: String })
  simService: string;

  @Prop({ type: String })
  sourceSystem: string;

  @Prop({ type: String })
  subPackageType: string;
}

export const NuMobileDataSchema = SchemaFactory.createForClass(NuMobileData);

@Schema({_id: false})
export class MoreInfo {
    @Prop({ type: Date })
    endTime: Date;
  
    @Prop({ type: String })
    jobDate: string;
  
    @Prop({ type: String })
    prepTransactionNo: string;
  
    @Prop({ type: String })
    nuNotifyFlag: string;
  
    @Prop({ type: String })
    imsi: string;
  
    @Prop({ type: String })
    serialNo: string;
  
    @Prop({ type: String })
    service: string;
  
    @Prop({ type: Date })
    shippingDate: Date;
  
    @Prop({ type: String })
    simRelease: string;
  
    @Prop({ type: Date })
    startTime: Date;
  
    @Prop({ type: NuMobileDataSchema })
    nuMobileData: NuMobileData;
}

export const MoreInfoSchema = SchemaFactory.createForClass(MoreInfo);

@Schema()
export class OptimusOrders {
  @Prop({ type: String })
  orderNo: string;

  @Prop({ type: String })
  transactionId: string;

  @Prop({ type: String })
  orderDateTime: string;

  @Prop({ type: String })
  createDateTime: string;

  @Prop({ type: String })
  modifyDateTime: string;

  @Prop({ type: String })
  orderStatus: string;

  @Prop({ type: String })
  orderType: string;

  @Prop({ type: String })
  jobListId: string;

  @Prop({ type: String })
  trackingNo: string;

  @Prop({ type: String })
  trackingNoOld: string;

  @Prop({ type: String })
  customerName: string;

  @Prop({ type: String })
  contactPhoneNo: string;

  @Prop({ type: String })
  address: string;

  @Prop({ type: String })
  zipCode: string;

  @Prop({ type: String })
  deliveryProvince: string;

  @Prop({ type: String })
  packageFee: string;

  @Prop({ type: String })
  logisticCost: string;

  @Prop({ type: String })
  forwarderName: string;

  @Prop({ type: String })
  effectiveDate: string;

  @Prop({ type: String })
  locationCode: string;

  @Prop({ type: String })
  newMobileNo: string;

  @Prop({ type: String })
  receiptNo: string;

  @Prop({ type: String })
  refDocNo: string;

  @Prop({ type: String })
  chargeType: string;

  @Prop({ type: String })
  sourceSystem: string;

  @Prop({ type: MoreInfoSchema })
  moreInfo: MoreInfo;

  @Prop({ type: String })
  createBy: string;

  @Prop({ type: String })
  updateBy: string;

  @Prop({ default: Date.now })
  TIMESTAMP: Date;
}

export const OptimusOrdersSchema = SchemaFactory.createForClass(OptimusOrders);

OptimusOrdersSchema.index({ orderNo: 1});

export function encryptOptimusOrdersSchema(mongoConfig: MongoConfiguration) {
    applyEncryption(NuMobileDataSchema, mongoConfig, ["newMobileNo"])
    applyEncryption(OptimusOrdersSchema, mongoConfig, ["customerName", "address", "contactPhoneNo", "newMobileNo"]);
}
