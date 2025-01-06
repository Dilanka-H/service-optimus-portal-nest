import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

export type OptimusCancelJobsDocument = OptimusCancelJobs & Document;

@Schema()
export class OptimusCancelJobs {
  @Prop({ type: String })
  cancelBy: string;

  @Prop({ type: String })
  cancelDate: string;

  @Prop({ type: String })
  jobDate: string;

  @Prop({ type: String })
  jobId: string;

  @Prop({ type: String })
  jobZone: string;

  @Prop({ type: String })
  jobType: string;

  @Prop({ type: Number })
  numOrders: number;

  @Prop({ type: String })
  reason: string;

  @Prop({ type: Date, default: Date.now })
  TIMESTAMP: Date;
}
  
export const OptimusCancelJobsSchema = SchemaFactory.createForClass(OptimusCancelJobs);