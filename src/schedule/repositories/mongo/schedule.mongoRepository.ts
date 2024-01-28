import { Injectable } from '@nestjs/common';
import { ScheduleRepository } from '../schedule-repository.interface';
import { Schedule } from '../../schedule.entity';
import { Model, Types } from 'mongoose';
import { ScheduleModel, ScheduleModelDocument } from './schedule.model';
import { InjectModel } from '@nestjs/mongoose';
import { MongoRepository, SortDirection } from '../../../mongo/repository';

@Injectable()
export class ScheduleMongoRepository
  extends MongoRepository<ScheduleModel>
  implements ScheduleRepository
{
  constructor(
    @InjectModel(ScheduleModel.name)
    private scheduleModel: Model<ScheduleModelDocument>,
  ) {
    super(scheduleModel);
  }

  async create(sheduleData: { room: string; date: Date }): Promise<Schedule> {
    const room = new Types.ObjectId(sheduleData.room);
    let schedule = await this.model.create({
      room,
      date: sheduleData.date,
    });
    schedule = await schedule.populate('room');

    return new Schedule({
      mongoDoc: schedule,
    });
  }

  async get(sheduleData: { room: string; date: Date }): Promise<Schedule> {
    const room = new Types.ObjectId(sheduleData.room);
    const schedule = await this.model
      .findOne({ room, date: sheduleData.date, deleted: false })
      .populate('room')
      .exec();

    if (!schedule) return null;

    return new Schedule({ mongoDoc: schedule });
  }

  async delete(id: string): Promise<Schedule | null> {
    const deletedDoc = await this.model
      .findOneAndUpdate({ _id: id, deleted: false }, { deleted: true })
      .populate('room')
      .exec();

    if (!deletedDoc) return null;

    return new Schedule({
      mongoDoc: deletedDoc as unknown as ScheduleModelDocument,
    });
  }

  async getRoomSchedule(room: string): Promise<Schedule[]> {
    const id = new Types.ObjectId(room);
    const schedules = await this.model
      .find({ room: id, deleted: false })
      .populate('room')
      .exec();

    return schedules.map((schedule) => new Schedule({ mongoDoc: schedule }));
  }

  async getSchedules(
    page: number,
    pageSize: number,
    sortDirection: SortDirection,
  ): Promise<{ schedules: Schedule[]; page: number; totalPages: number }> {
    const dataQuery = this.model
      .find()
      .where({ deleted: false })
      .populate('room');
    const { data, totalPages } = await this.pagination({
      dataQuery,
      page,
      pageSize,
      sortBy: 'date',
      sortDirection,
    });

    const schedules = data.map(
      (schedule) => new Schedule({ mongoDoc: schedule }),
    );

    return { schedules, page, totalPages };
  }
}
