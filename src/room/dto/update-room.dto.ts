import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { RoomAmount, RoomType } from '../room.entity';

export class UpdateRoomDto {
  @IsString()
  id: string;

  @IsNumber()
  @IsPositive()
  number: number;

  @IsEnum(RoomType)
  roomType: RoomType;

  @IsEnum(RoomAmount)
  roomsAmount: RoomAmount;

  @IsBoolean()
  hasSeeView: boolean;
}
