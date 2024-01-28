import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { RoomAmount, RoomType } from '../../room.entity';

export type RoomModelDocument = HydratedDocument<RoomModel>;

@Schema({ timestamps: true })
export class RoomModel {
  @Prop({ unique: true, partialFilterExpression: { deleted: false } })
  number: number;

  @Prop({ type: String, enum: RoomType, required: true })
  roomType: RoomType;

  @Prop({ type: Number, enum: RoomAmount, required: true })
  roomsAmount: RoomAmount;

  @Prop({ required: true })
  hasSeeView: boolean;

  @Prop({ required: true, default: false })
  deleted: boolean;
}

export const RoomModelSchema = SchemaFactory.createForClass(RoomModel);
