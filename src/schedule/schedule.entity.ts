import { Room } from '../room/room.entity';
import { ScheduleModelDocument } from './repositories/mongo/schedule.model';
import { RoomModelDocument } from '../room/repositories/mongo/room.model';

export class Schedule {
  constructor({ mongoDoc }: { mongoDoc?: ScheduleModelDocument }) {
    this.id = String(mongoDoc._id);
    this.date = mongoDoc.date;
    this.room = new Room({ mongoDoc: mongoDoc.room as RoomModelDocument });
  }

  id: string;
  room: Room;
  date: Date;
}
