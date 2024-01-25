import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { RoomModel, RoomModelSchema } from './repositories/mongo/room.model';
import { RoomMongoRepository } from './repositories/mongo/room.mongoRepository';
import {
  ScheduleModel,
  ScheduleModelSchema,
} from '../schedule/repositories/mongo/schedule.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RoomModel.name, schema: RoomModelSchema },
      { name: ScheduleModel.name, schema: ScheduleModelSchema },
    ]),
  ],
  providers: [RoomService, RoomMongoRepository],
  controllers: [RoomController],
})
export class RoomModule {}
