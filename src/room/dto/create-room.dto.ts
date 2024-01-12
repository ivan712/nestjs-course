export enum RoomType {
    BUDGET,
    MIDDLE,
    LUKS
}

export enum RoomAmount {
    ONE = 1,
    TWO,
    THREE,
    FOUR
}

export class CreateRoomDto {
    number: number;
    roomType: RoomType;
    roomsAmount: RoomAmount;
    hasSeeView: boolean;
}