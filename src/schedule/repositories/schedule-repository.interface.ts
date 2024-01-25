import { Schedule } from '../schedule.entity';

export interface ScheduleRepository {
  get(sheduleData: { room: string; date: Date }): Promise<Schedule>;

  create(sheduleData: { room: string; date: Date }): Promise<Schedule>;

  delete(id: string): Promise<Schedule | null>;

  getRoomSchedule(id: string): Promise<Schedule[] | null>;

  getSchedules(
    page: number,
    pageSize: number,
    sortDirection: string,
  ): Promise<{ schedules: Schedule[]; page: number; totalPages: number }>;
}
