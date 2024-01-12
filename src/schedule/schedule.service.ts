import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ScheduleModel, ScheduleModelDocument } from './schedule.model';
import { Model, Types } from 'mongoose';
import { RoomModel, RoomModelDocument } from 'src/room/room.model';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { RoomService } from 'src/room/room.service';
import { ROOM_NOT_FOUND } from 'src/room/room.constants';
import { SCHEDULE_ALREDY_EXIST, SCHEDULE_NOT_FOUND } from './schedule.constant';

@Injectable()
export class ScheduleService {
    constructor(
        @InjectModel(ScheduleModel.name) private scheduleModel: Model<ScheduleModelDocument>,
        @Inject(RoomService) private roomService: RoomService
    ) { }

    private async isRoomExist(number: number) {
        const room = await this.roomService.getByNumber(number);
        if (!room) {
            throw new HttpException(ROOM_NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        return room;
    }


    private async isScheduleExist(room: Types.ObjectId, date: Date): Promise<void> {
        const isScheduleExist = await this.scheduleModel.findOne({ room, date });

        if (isScheduleExist) {
            throw new HttpException(SCHEDULE_ALREDY_EXIST, HttpStatus.BAD_REQUEST);
        }
    }


    async create(dto: CreateScheduleDto): Promise<ScheduleModelDocument> {
        const room = await this.isRoomExist(dto.room);

        await this.isScheduleExist(room._id, dto.date);

        return this.scheduleModel.create({ room: room._id, date: dto.date });
    }


    async delete(dto: CreateScheduleDto): Promise<ScheduleModelDocument> {
        const room = await this.isRoomExist(dto.room);

        const deletedDoc = await this.scheduleModel.findOneAndDelete({ room: room._id, date: dto.date }).exec();
        if (!deletedDoc)
            throw new HttpException(SCHEDULE_NOT_FOUND, HttpStatus.NOT_FOUND);

        return deletedDoc;
    }


    async getRoomScheduleByNumber(number: number): Promise<ScheduleModelDocument[]> {
        const room = await this.roomService.getByNumber(number);
        if (!room) {
            throw new HttpException(ROOM_NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        return this.scheduleModel.find({ room: room._id });
    }

    async getAllSchedules(): Promise<ScheduleModelDocument[]> {
        return this.scheduleModel.find();
    }
}
