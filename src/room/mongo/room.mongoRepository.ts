import { InjectModel } from '@nestjs/mongoose';
import { RoomRepository } from '../core/room.repository';
import { RoomModel, RoomModelDocument } from './room.model';
import { Model } from 'mongoose';
import { CreateRoomDto } from './dto/create-room.dto';
import { Room } from '../core/room.entity';
import { MapperRoom } from './mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoomMongoRepository implements RoomRepository {
  constructor(
    @InjectModel(RoomModel.name) private roomModel: Model<RoomModelDocument>,
  ) {}

  async create(dto: CreateRoomDto): Promise<Room> {
    return MapperRoom.fromModelToEntityMapper(await this.roomModel.create(dto));
  }

  async update(dto: CreateRoomDto): Promise<Room> {
    return MapperRoom.fromModelToEntityMapper(
      await this.roomModel.findOneAndUpdate({ number: dto.number }, dto).exec(),
    );
  }

  async getByNumber(number: number): Promise<Room | null> {
    const room = await this.roomModel.findOne({ number }).exec();

    if (!room) return null;

    return MapperRoom.fromModelToEntityMapper(room);
  }

  async delete(number: number): Promise<Room | null> {
    const room = await this.roomModel.findOneAndDelete({ number }).exec();

    if (!room) return null;

    return MapperRoom.fromModelToEntityMapper(room);
  }

  async getAllRooms() {
    const rooms = await this.roomModel.find();
    return rooms.map((room) => MapperRoom.fromModelToEntityMapper(room));
  }
}
