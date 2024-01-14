import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateRoomDto } from './mongo/dto/create-room.dto';
import { ROOM_ALREADY_EXIST, ROOM_NOT_FOUND } from './room.constants';
import { RoomMongoRepository } from './mongo/room.mongoRepository';
import { RoomRepository } from './core/room.repository';
import { Room } from './core/room.entity';

@Injectable()
export class RoomService {
  constructor(
    @Inject(RoomMongoRepository) private roomMongoRepository: RoomRepository,
  ) {}

  async isRoomExist(number: number) {
    const room = await this.getByNumber(number);
    if (!room) {
      throw new NotFoundException(ROOM_NOT_FOUND);
    }

    return room;
  }

  async create(dto: CreateRoomDto): Promise<Room> {
    const room = await this.getByNumber(dto.number);
    if (room) {
      throw new HttpException(ROOM_ALREADY_EXIST, HttpStatus.BAD_REQUEST);
    }
    return this.roomMongoRepository.create(dto);
  }

  async delete(number: number): Promise<Room> {
    const deletedDoc = await this.roomMongoRepository.delete(number);
    if (!deletedDoc)
      throw new HttpException(ROOM_NOT_FOUND, HttpStatus.NOT_FOUND);

    return deletedDoc;
  }

  async getByNumber(number: number): Promise<Room> {
    return this.roomMongoRepository.getByNumber(number);
  }

  async getAllRooms(): Promise<Room[]> {
    return this.roomMongoRepository.getAllRooms();
  }

  async update(dto: CreateRoomDto): Promise<Room> {
    await this.isRoomExist(dto.number);
    return this.roomMongoRepository.update(dto);
  }
}
