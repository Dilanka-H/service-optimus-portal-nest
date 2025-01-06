import { MongoConfiguration } from "src/config/mongo.config";
import { applyEncryption } from "../encryption.helper";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

export type OptimusRepairJobListsDocument = OptimusRepairJobLists & Document;

@Schema()
export class OptimusRepairJobLists {
@Prop({ type: String })
  jobId: string;

  @Prop({ type: String })
  jobStatus: string;

  @Prop({ type: String })
  jobDate: string;

  @Prop({ type: String })
  jobType: string;

  @Prop({ type: String })
  jobZone: string;

  @Prop({ type: String })
  forwarderName: string;

  @Prop({ type: String })
  createBy: string;

  @Prop({ type: String })
  updateBy: string;

  @Prop({ type: Array })
  itemsList: Array<any>;

  @Prop({ type: Date, default: Date.now })
  TIMESTAMP: Date;
  }
  
export const OptimusRepairJobListsSchema = SchemaFactory.createForClass(OptimusRepairJobLists);

