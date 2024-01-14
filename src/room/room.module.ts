import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { RoomModel, RoomModelSchema } from './mongo/room.model';
import { RoomMongoRepository } from './mongo/room.mongoRepository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RoomModel.name, schema: RoomModelSchema },
    ]),
  ],
  providers: [RoomService, RoomMongoRepository],
  controllers: [RoomController],
})
export class RoomModule {}
