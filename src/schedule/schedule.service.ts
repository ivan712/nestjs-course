import { Inject, Injectable } from '@nestjs/common';
import { RoomService } from '../room/room.service';
import { ScheduleMongoRepository } from './repositories/mongo/schedule.mongoRepository';
import { ScheduleRepository } from './repositories/schedule-repository.interface';
import { Schedule } from './schedule.entity';
import Exception from '../exceptions/Exception';
import { ExceptionCodes } from '../exceptions/codes';
import { ExceptionMessages } from '../exceptions/messages';

@Injectable()
export class ScheduleService {
  constructor(
    @Inject(RoomService) private roomService: RoomService,
    @Inject(ScheduleMongoRepository)
    private scheduleRepository: ScheduleRepository,
  ) {}

  async get(scheduleData: {
    room: number;
    date: Date;
  }): Promise<Schedule | null> {
    const room = await this.roomService.isRoomExist({
      number: scheduleData.room,
    });
    return this.scheduleRepository.get({
      room: room.id,
      date: scheduleData.date,
    });
  }

  async create(scheduleData: { room: number; date: Date }): Promise<Schedule> {
    const room = await this.roomService.isRoomExist({
      number: scheduleData.room,
    });
    const schedule = await this.scheduleRepository.get({
      room: room.id,
      date: scheduleData.date,
    });
    if (schedule) {
      throw new Exception(
        ExceptionCodes.BAD_REQUEST,
        ExceptionMessages.SCHEDULE_ALREDY_EXIST,
      );
    }

    return this.scheduleRepository.create({
      room: room.id,
      date: scheduleData.date,
    });
  }

  async delete(id: string): Promise<Schedule> {
    const deletedDoc = await this.scheduleRepository.delete(id);
    if (!deletedDoc)
      throw new Exception(
        ExceptionCodes.NOT_FOUND,
        ExceptionMessages.SCHEDULE_NOT_FOUND,
      );

    return deletedDoc;
  }

  async getRoomSchedule(number: number): Promise<Schedule[]> {
    const room = await this.roomService.isRoomExist({ number });

    return this.scheduleRepository.getRoomSchedule(room.id);
  }

  async getSchedules({
    page,
    pageSize,
    sortDirection,
  }): Promise<{ schedules: Schedule[]; page: number; totalPages: number }> {
    return this.scheduleRepository.getSchedules(page, pageSize, sortDirection);
  }

  async getStatisticByMonth(
    month: number,
    year: number,
  ): Promise<{ roomNumber: number; books: number }> {
    return this.scheduleRepository.getBookingStatisticByMonth(month, year);
  }
}
