import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MSchema } from 'mongoose';
import { RoomModel } from '../../../room/repositories/mongo/room.model';

export type ScheduleModelDocument = HydratedDocument<ScheduleModel>;

@Schema({ timestamps: true })
export class ScheduleModel {
  @Prop({ required: true, type: MSchema.Types.ObjectId, ref: RoomModel.name })
  room: RoomModel;

  @Prop({ required: true, type: MSchema.Types.Date })
  date: Date;

  @Prop({ required: true, default: false })
  deleted: boolean;
}

export const ScheduleModelSchema = SchemaFactory.createForClass(ScheduleModel);
