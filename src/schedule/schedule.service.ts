import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateScheduleDto } from './mongo/dto/create-schedule.dto';
import { RoomService } from 'src/room/room.service';
import { SCHEDULE_ALREDY_EXIST, SCHEDULE_NOT_FOUND } from './schedule.constant';
import { ScheduleMongoRepository } from './mongo/schedule.mongoRepository';
import { ScheduleRepository } from './core/schedule.repository';
import { Schedule } from './core/schedule.entity';
import { IScheduleExtended } from './interfaces/IScheduleExtended';

@Injectable()
export class ScheduleService {
  constructor(
    @Inject(RoomService) private roomService: RoomService,
    @Inject(ScheduleMongoRepository)
    private scheduleRepository: ScheduleRepository,
  ) {}

  async get(dto: CreateScheduleDto): Promise<IScheduleExtended | null> {
    const room = await this.roomService.isRoomExist(dto.room);
    return this.scheduleRepository.get({ roomId: room.id, date: dto.date });
  }

  async create(dto: CreateScheduleDto): Promise<Schedule> {
    const room = await this.roomService.isRoomExist(dto.room);
    const schedule = await this.scheduleRepository.get({
      roomId: room.id,
      date: dto.date,
    });
    if (schedule) {
      throw new BadRequestException(SCHEDULE_ALREDY_EXIST);
    }

    return this.scheduleRepository.create({ roomId: room.id, date: dto.date });
  }

  async delete(dto: CreateScheduleDto): Promise<Schedule> {
    const room = await this.roomService.isRoomExist(dto.room);
    const deletedDoc = await this.scheduleRepository.delete({
      roomId: room.id,
      date: dto.date,
    });
    if (!deletedDoc) throw new NotFoundException(SCHEDULE_NOT_FOUND);

    return deletedDoc;
  }

  async getRoomScheduleByNumber(number: number): Promise<Schedule[]> {
    const room = await this.roomService.isRoomExist(number);

    return this.scheduleRepository.getRoomScheduleById(room.id);
  }

  async getAllSchedules(): Promise<IScheduleExtended[]> {
    return this.scheduleRepository.getAllSchedules();
  }
}
