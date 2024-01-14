import { Injectable } from '@nestjs/common';
import { ScheduleRepository } from '../core/schedule.repository';
import { Schedule } from '../core/schedule.entity';
import { Model, Types } from 'mongoose';
import { ScheduleModel, ScheduleModelDocument } from './schedule.model';
import { MapperSchedule } from './mapper';
import { InjectModel } from '@nestjs/mongoose';
import { ScheduleEntityDto } from '../core/dto/entity.dto';
import { IScheduleExtended } from '../interfaces/IScheduleExtended';

@Injectable()
export class ScheduleMongoRepository implements ScheduleRepository {
  constructor(
    @InjectModel(ScheduleModel.name)
    private scheduleModel: Model<ScheduleModelDocument>,
  ) {}

  async create(dto: ScheduleEntityDto): Promise<Schedule> {
    const roomId = new Types.ObjectId(dto.roomId);

    return MapperSchedule.fromModelToEntity(
      await this.scheduleModel.create({ roomId, date: dto.date }),
    );
  }

  async get(dto: ScheduleEntityDto): Promise<IScheduleExtended> {
    const roomId = new Types.ObjectId(dto.roomId);
    const shedule = await this.scheduleModel
      .findOne({ roomId, date: dto.date })
      .populate('roomId')
      .exec();

    if (!shedule) return null;

    return MapperSchedule.fromModelToExtendedEntity(shedule);
  }

  async delete(dto: ScheduleEntityDto): Promise<Schedule | null> {
    const roomId = new Types.ObjectId(dto.roomId);
    const deletedDoc = await this.scheduleModel.findOneAndDelete({
      roomId,
      date: dto.date,
    });

    if (!deletedDoc) return null;

    return MapperSchedule.fromModelToEntity(deletedDoc);
  }

  async getRoomScheduleById(roomId: string): Promise<Schedule[]> {
    const id = new Types.ObjectId(roomId);
    const schedules = await this.scheduleModel.find({ roomId: id });

    return schedules.map((schedule) => {
      return MapperSchedule.fromModelToEntity(schedule);
    });
  }

  async getAllSchedules(): Promise<IScheduleExtended[]> {
    const schedules = await this.scheduleModel.find().populate('roomId').exec();
    return schedules.map((schedule) => {
      return MapperSchedule.fromModelToExtendedEntity(schedule);
    });
  }
}
