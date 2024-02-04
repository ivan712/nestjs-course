import { RoomModelDocument } from './repositories/mongo/room.model';

export enum RoomType {
  BUDGET = 'BUDGET',
  MIDDLE = 'MIDDLE',
  LUKS = 'LUKS',
}

export enum RoomAmount {
  ONE = 1,
  TWO,
  THREE,
  FOUR,
}

export class Room {
  id: string;
  number: number;
  roomType: RoomType;
  roomsAmount: RoomAmount;
  hasSeeView: boolean;

  constructor({ mongoDoc }: { mongoDoc?: RoomModelDocument }) {
    this.id = String(mongoDoc._id);
    this.number = mongoDoc.number;
    this.roomType = mongoDoc.roomType;
    this.roomsAmount = mongoDoc.roomsAmount;
    this.hasSeeView = mongoDoc.hasSeeView;
  }
}
