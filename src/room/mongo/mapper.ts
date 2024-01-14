import { Room } from 'src/room/core/room.entity';
import { RoomModelDocument } from './room.model';

export class MapperRoom {
  static fromModelToEntityMapper(roomModel: RoomModelDocument): Room {
    const result = {} as Room;
    ['number', 'roomType', 'roomsAmount', 'hasSeeView'].forEach((key) => {
      result[key] = roomModel[key];
    });
    result.id = String(roomModel._id);

    return result as Room;
  }
}
