import { CreateRoomDto } from '../mongo/dto/create-room.dto';
import { Room } from './room.entity';

export interface RoomRepository {
  create(dto: CreateRoomDto): Promise<Room>;
  delete(number: number): Promise<Room | null>;
  update(dto: CreateRoomDto): Promise<Room>;
  getByNumber(number: number): Promise<Room | null>;
  getAllRooms(): Promise<Room[]>;
}
