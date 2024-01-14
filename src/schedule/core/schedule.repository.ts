import { IScheduleExtended } from '../interfaces/IScheduleExtended';
import { ScheduleEntityDto } from './dto/entity.dto';
import { Schedule } from './schedule.entity';

export interface ScheduleRepository {
  get(dto: ScheduleEntityDto): Promise<IScheduleExtended>;
  create(dto: ScheduleEntityDto): Promise<Schedule>;
  delete(dto: ScheduleEntityDto): Promise<Schedule | null>;
  getRoomScheduleById(id: string): Promise<Schedule[] | null>;
  getAllSchedules(): Promise<IScheduleExtended[]>;
}
