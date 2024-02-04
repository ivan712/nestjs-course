import { Room } from '../room.entity';

export interface RoomRepository {
  create(createData: Omit<Room, 'id'>): Promise<Room>;
  delete(number: number): Promise<Room | null>;
  update(updateData: Room): Promise<Room | null>;
  getByNumber(number: number): Promise<Room | null>;
  getById(id: string): Promise<Room | null>;
  getRooms(
    page: number,
    pageSize: number,
    sortDirection: string,
  ): Promise<{ rooms: Room[]; page: number; totalPages: number }>;
}
