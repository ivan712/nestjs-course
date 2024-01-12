import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RoomModel, RoomModelDocument } from './room.model';
import { Model } from 'mongoose';
import { CreateRoomDto } from './dto/create-room.dto';
import { ROOM_ALREADY_EXIST, ROOM_NOT_FOUND } from './room.constants';

@Injectable()
export class RoomService {
    constructor(
        @InjectModel(RoomModel.name) private roomModel: Model<RoomModelDocument>) { }

    async create(dto: CreateRoomDto): Promise<RoomModelDocument> {
        const room = await this.getByNumber(dto.number);
        if (room) {
            throw new HttpException(ROOM_ALREADY_EXIST, HttpStatus.BAD_REQUEST);
        }
        return this.roomModel.create(dto);
    }

    async delete(number: number) {
        const deletedDoc = await this.roomModel.findOneAndDelete({ number }).exec();
        if (!deletedDoc) {
            throw new HttpException(ROOM_NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        return deletedDoc;
    }

    async getByNumber(number: number) {
        return this.roomModel.findOne({ number }).exec();
    }

    async getAllRooms() {
        return this.roomModel.find();
    }

    async update(dto: CreateRoomDto): Promise<RoomModelDocument> {
        return this.roomModel.findOneAndUpdate({ number: dto.number }, dto).exec();
    }
}
