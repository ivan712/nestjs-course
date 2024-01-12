import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MSchema } from "mongoose";
import { RoomModel } from "src/room/room.model";

export type ScheduleModelDocument = HydratedDocument<ScheduleModel>;

@Schema()
export class ScheduleModel {
    @Prop({ required: true, type: MSchema.Types.ObjectId, ref: RoomModel.name })
    room: RoomModel;

    @Prop({ required: true, type: MSchema.Types.Date })
    date: Date;
}

export const ScheduleModelSchema = SchemaFactory.createForClass(ScheduleModel);