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

export interface Room {
  id: string;
  number: number;
  roomType: RoomType;
  roomsAmount: RoomAmount;
  hasSeeView: boolean;
}
