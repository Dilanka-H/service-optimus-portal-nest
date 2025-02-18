import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type OptimusConfigChannelsDocument = OptimusConfigChannels & Document;

@Schema()
export class OptimusConfigChannels {
    @Prop({ type: String })
    channel: string;

    @Prop({ type: String })
    status: string;

    @Prop({ type: Date, default: Date.now })
    TIMESTAMP: Date;
}
  
export const OptimusConfigChannelsSchema = SchemaFactory.createForClass(OptimusConfigChannels);