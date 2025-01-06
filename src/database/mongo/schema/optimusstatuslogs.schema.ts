import { MongoConfiguration } from "src/config/mongo.config";
import { applyEncryption } from "../encryption.helper";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

export type OptimusStatusLogsDocument = OptimusStatusLogs & Document;

@Schema()
export class OptimusStatusLogs {
    @Prop({ type: String })
    logName: string;
  
    @Prop({ type: String })
    status: string;
  
    @Prop({ type: Object })
    data: Object
  
    @Prop({ type: Date, default: Date.now })
    TIMESTAMP: Date;
  }
  
export const OptimusStatusLogsSchema = SchemaFactory.createForClass(OptimusStatusLogs);

OptimusStatusLogsSchema.index({ logName: 1, status: 1 });

