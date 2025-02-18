import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type OptimusMaterialsDocument = OptimusMaterials & Document;

@Schema()
export class OptimusMaterials {
    @Prop({ type: String })
    materialCode: string;
  
    @Prop({ type: String })
    materialType: string;
  
    @Prop({ type: String })
    channel: string;
  
    @Prop({ type: String })
    simType: string;
  
    @Prop({ type: String, required: false })
    subChannel?: string;
  
    @Prop({ type: String })
    status: string;
  
    @Prop({ type: String })
    updateBy: string;
  
    @Prop({ type: Date, default: Date.now })
    TIMESTAMP: Date;
}
  
export const OptimusMaterialsSchema = SchemaFactory.createForClass(OptimusMaterials);