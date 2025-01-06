import { MongoConfiguration } from "src/config/mongo.config";
import { applyEncryption } from "../encryption.helper";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

export type OptimusSimProfilesDocument = OptimusSimProfiles & Document;

@Schema()
export class OptimusSimProfiles {
@Prop({ type: String })
  createDate: string;

  @Prop({ type: String })
  createBy: string;

  @Prop({ type: String })
  action: string;

  @Prop({ type: Object })
  simProfile: Record<string, any>;  

  @Prop({ type: Date, default: Date.now })
  TIMESTAMP: Date;
  }
  
export const OptimusSimProfilesSchema = SchemaFactory.createForClass(OptimusSimProfiles);

