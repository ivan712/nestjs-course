import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { RoomType } from "./dto/create-room.dto";
import { RoomAmount } from "./dto/create-room.dto";


export type RoomModelDocument = HydratedDocument<RoomModel>;

@Schema()
export class RoomModel {
    @Prop({ unique: true })
    number: number;

    @Prop({ type: String, enum: RoomType, required: true })
    roomType: RoomType;

    @Prop({ type: Number, enum: RoomAmount, required: true })
    roomsAmount: RoomAmount;

    @Prop({ required: true })
    hasSeeView: boolean;
}

export const RoomModelSchema = SchemaFactory.createForClass(RoomModel);