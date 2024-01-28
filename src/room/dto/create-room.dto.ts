import { IsBoolean, IsEnum, IsNumber, IsPositive } from 'class-validator';
import { RoomAmount, RoomType } from '../room.entity';

export class CreateRoomDto {
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
