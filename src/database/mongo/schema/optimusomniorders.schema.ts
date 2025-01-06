import { MongoConfiguration } from "src/config/mongo.config";
import { applyEncryption } from "../encryption.helper";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

export type OptimusOmniOrdersDocument = OptimusOmniOrders & Document;

@Schema()
export class Letter {
@Prop({ type: String })
  forwarderName: string;

  @Prop({ type: String })
  shippingMethod: string;

  @Prop({ type: String })
  trackingNo: string;

  @Prop({ type: String })
  shipToNo: string;

  @Prop({ type: String })
  customerName: string;

  @Prop({ type: String })
  contactPhoneNo: string;

  @Prop({ type: String })
  address: string;

  @Prop({ type: String })
  zipCode: string;

  @Prop({ type: String })
  deliveryProvince: string
}

export const LetterSchema = SchemaFactory.createForClass(Letter);

@Schema()
export class Other {
    @Prop({ type: String })
    company: string;
  
    @Prop({ type: String })
    receiptNo: string;
  
    @Prop({ type: String })
    subStock: string;
}

export const OtherSchema = SchemaFactory.createForClass(Other);
  
@Schema()
export class MobileItem {
  @Prop({ type: String })
  newMobileNo: string;

  @Prop({ type: String })
  simType: string;

  @Prop({ type: String })
  orderCode: string;

  @Prop({ type: String })
  chargeType: string;

  @Prop({ type: String })
  simMatcode: string;

  @Prop({ type: String })
  jacketMatcode: string;

  @Prop({ type: String })
  displayJacketName: string;

  @Prop({ type: String })
  promotionName: string;

  @Prop({ type: String })
  invSeq: string;

  @Prop({ type: String })
  billingSystem: string;

  @Prop({ type: String })
  simService: string;

  @Prop({ type: String })
  product: string;

  @Prop({ type: String })
  networkType: string;

  @Prop({ type: String })
  productType: string;

  @Prop({ type: String })
  packageType: string;

  @Prop({ type: String })
  subPackageType: string;

  @Prop({ type: String })
  remark: string;

  @Prop({ type: String })
  persoOnlyFlag: string;

  @Prop({ type: String })
  activateSimWithIn: string;

  @Prop({ type: String })
  mobileStatus: string;
}

export const MobileItemSchema = SchemaFactory.createForClass(MobileItem);

@Schema()
export class OptimusOmniOrders {
    @Prop({ type: String })
    option: string;
  
    @Prop({ type: String })
    transactionId: string;
  
    @Prop({ type: String })
    processType: string;
  
    @Prop({ type: String })
    channel: string;
  
    @Prop({ type: String })
    orderNo: string;
  
    @Prop({ type: String })
    orderDateTime: string;
  
    @Prop({ type: String })
    createDateTime: string;
  
    @Prop({ type: String })
    modifyDateTime: string;
  
    @Prop({ type: String })
    orderStatus: string;

    @Prop({ type: LetterSchema })
    letter: Letter;
  
    @Prop({ type: OtherSchema })
    other: Other;

    @Prop({ type: String })
    packageFee: string;
  
    @Prop({ type: String })
    logisticCost: string;
  
    @Prop({ type: String })
    locationCode: string;
  
    @Prop({ type: String })
    postTest: string;
  
    @Prop({ type: Boolean })
    isRepair: boolean;
  
    @Prop({ type: String })
    cancelReason: string;
  
    @Prop({ type: Object })
    moreInfo: object;
  
    @Prop({ type: String })
    cancelBy: string;
  
    @Prop({ type: String })
    updateBy: string;
  
    @Prop({ type: String })
    cancelDateTime: string;

    @Prop({ type: [MobileItemSchema], default: [] })
    mobileList: MobileItem[];
  
    @Prop({ type: Number })
    itemSize: number;
  
    @Prop({ type: Date, default: Date.now })
    TIMESTAMP: Date;
}

export const OptimusOmniOrdersSchema = SchemaFactory.createForClass(OptimusOmniOrders);

OptimusOmniOrdersSchema.index({'letter.trackingNo': 1, 'letter.deliveryProvince': 1});
OptimusOmniOrdersSchema.index({ orderNo: 1});

export function encryptOptimusOmniOrdersSchema(mongoConfig: MongoConfiguration) {
    applyEncryption(LetterSchema, mongoConfig, ["customerName", "contactPhoneNo", "address"])
    applyEncryption(MobileItemSchema, mongoConfig, ["newMobileNo"]);
}
