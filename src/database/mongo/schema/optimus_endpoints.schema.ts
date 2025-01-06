import { MongoConfiguration } from "src/config/mongo.config";
import { applyEncryption } from "../encryption.helper";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

export type OptimusEndpointsDocument = OptimusEndpoints & Document;

@Schema()
export class OptimusEndpoints {
    @Prop({ type: String })
    channel: string;
  
    @Prop({ type: String })
    data: string;
  
    @Prop({ type: Object })
    info: object;
  
    @Prop({ type: String, default: 'enable' })
    status: string;
  }
  
export const OptimusEndpointsSchema = SchemaFactory.createForClass(OptimusEndpoints);

