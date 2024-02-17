import { InjectModel } from '@nestjs/mongoose';
import { RoomRepository } from '../room.repository.interface';
import { RoomModel, RoomModelDocument } from './room.model';
import { Model, Types } from 'mongoose';
import { Room } from '../../room.entity';
import { Injectable } from '@nestjs/common';
import { MongoRepository, SortDirection } from '../../../mongo/repository';

@Injectable()
export class RoomMongoRepository
  extends MongoRepository<RoomModel>
  implements RoomRepository
{
  constructor(
    @InjectModel(RoomModel.name) private roomModel: Model<RoomModelDocument>,
  ) {
    super(roomModel);
  }

  async create(createData: Omit<Room, 'id'>): Promise<Room> {
    return new Room({ mongoDoc: await this.model.create(createData) });
  }

  async update(updateData: Room): Promise<Room> {
    const updatedDoc = await this.model
      .findByIdAndUpdate(updateData.id, updateData, { new: true })
      .exec();

    return new Room({ mongoDoc: updatedDoc });
  }

  async getByNumber(number: number): Promise<Room | null> {
    const room = await this.model.findOne({ number, deleted: false }).exec();
    return room ? new Room({ mongoDoc: room }) : null;
  }

  async getById(id: string): Promise<Room | null> {
    const roomId = new Types.ObjectId(id);
    const room = await this.model.findById(roomId);
    return room ? new Room({ mongoDoc: room }) : null;
  }

  async delete(number: number): Promise<Room | null> {
    const query = this.model.findOneAndUpdate(
      { number, deleted: false },
      { deleted: true },
    );

    const room = await query.exec();
    if (!room) return null;

    return new Room({ mongoDoc: room });
  }

  async getRooms(page: number, pageSize: number, sortDirection: SortDirection) {
    const dataQuery = this.model.find().where({ deleted: false });
    const { data, totalPages } = await this.pagination({
      dataQuery,
      page,
      pageSize,
      sortBy: 'number',
      sortDirection,
    });

    const rooms = data.map((room) => new Room({ mongoDoc: room }));

    return {
      rooms,
      page,
      totalPages,
    };
  }
}
