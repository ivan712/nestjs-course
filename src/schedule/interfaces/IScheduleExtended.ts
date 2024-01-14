import { Room } from 'src/room/core/room.entity';
import { Schedule } from '../core/schedule.entity';

export interface IScheduleExtended extends Omit<Schedule, 'roomId'> {
  room: Room;
}
