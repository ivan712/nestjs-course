import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from '../core/user.entity';
import { HydratedDocument } from 'mongoose';

export type UserModelDocument = HydratedDocument<UserModel>;

@Schema()
export class UserModel {
  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ type: String, enum: Role, required: true })
  role: Role;

  @Prop({ required: true })
  password: string;
}

export const UserModelSchema = SchemaFactory.createForClass(UserModel);
