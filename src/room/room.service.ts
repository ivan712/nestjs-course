import { Inject, Injectable } from '@nestjs/common';

import { RoomMongoRepository } from './repositories/mongo/room.repository';
import { RoomRepository } from './repositories/room.repository.interface';
import { Room } from './room.entity';
import Exception from '../exceptions/exception';
import { ExceptionCodes } from '../exceptions/codes';
import { ExceptionMessages } from '../exceptions/messages';

@Injectable()
export class RoomService {
  constructor(
    @Inject(RoomMongoRepository) private roomMongoRepository: RoomRepository,
  ) {}

  async isRoomExist({ id, number }: { id?: string; number?: number }) {
    let room;
    if (id) {
      room = this.roomMongoRepository.getById(id);
    } else if (number) {
      room = await this.getByNumber(number);
    }
    if (!room) {
      throw new Exception(
        ExceptionCodes.BAD_REQUEST,
        ExceptionMessages.ROOM_NOT_FOUND,
      );
    }

    return room;
  }

  async create(createData: Omit<Room, 'id'>): Promise<Room> {
    const room = await this.getByNumber(createData.number);
    if (room) {
      throw new Exception(
        ExceptionCodes.BAD_REQUEST,
        ExceptionMessages.ROOM_ALREADY_EXIST,
      );
    }
    return this.roomMongoRepository.create(createData);
  }

  async delete(number: number): Promise<Room> {
    const deletedRoom = await this.roomMongoRepository.delete(number);
    if (!deletedRoom) {
      const exc = new Exception(
        ExceptionCodes.NOT_FOUND,
        ExceptionMessages.ROOM_NOT_FOUND,
      );
      console.log('inst of extt', exc instanceof Exception);
      throw exc;
    }

    return deletedRoom;
  }

  async getByNumber(number: number): Promise<Room> {
    return this.roomMongoRepository.getByNumber(number);
  }

  async getRooms({
    page,
    pageSize,
    sortDirection,
  }: {
    page: number;
    pageSize: number;
    sortDirection?: string;
  }) {
    return this.roomMongoRepository.getRooms(page, pageSize, sortDirection);
  }

  async update(updateData: Room): Promise<Room> {
    const updatedRoom = await this.isRoomExist({ id: updateData.id });
    if (updatedRoom.number !== updateData.number) {
      if (await this.getByNumber(updateData.number))
        throw new Exception(
          ExceptionCodes.BAD_REQUEST,
          ExceptionMessages.ROOM_ALREADY_EXIST,
        );
    }
    return this.roomMongoRepository.update(updateData);
  }
}
