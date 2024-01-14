import { MapperRoom } from 'src/room/mongo/mapper';
import { Schedule } from '../core/schedule.entity';
import { IScheduleExtended } from '../interfaces/IScheduleExtended';
import { ScheduleModelDocument } from './schedule.model';
import { RoomModelDocument } from 'src/room/mongo/room.model';

export class MapperSchedule {
  static fromModelToEntity(scheduleModel: ScheduleModelDocument): Schedule {
    const result = {} as Schedule;
    ['roomId', 'date'].forEach((key) => {
      result[key] = scheduleModel[key];
    });
    result.id = String(scheduleModel._id);

    return result;
  }

  static fromModelToExtendedEntity(
    scheduleExtendedModel: ScheduleModelDocument,
  ): IScheduleExtended {
    const result = {} as IScheduleExtended;
    result.id = String(scheduleExtendedModel._id);
    result.date = scheduleExtendedModel.date;
    result.room = MapperRoom.fromModelToEntityMapper(
      scheduleExtendedModel.roomId as RoomModelDocument,
    );

    return result;
  }
}
