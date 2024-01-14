import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModel, ScheduleModelSchema } from './mongo/schedule.model';
import { RoomService } from 'src/room/room.service';
import { RoomModel, RoomModelSchema } from 'src/room/mongo/room.model';
import { RoomMongoRepository } from 'src/room/mongo/room.mongoRepository';
import { ScheduleMongoRepository } from './mongo/schedule.mongoRepository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RoomModel.name, schema: RoomModelSchema },
      { name: ScheduleModel.name, schema: ScheduleModelSchema },
    ]),
  ],
  providers: [
    ScheduleService,
    RoomService,
    RoomMongoRepository,
    ScheduleMongoRepository,
  ],
  controllers: [ScheduleController],
})
export class ScheduleModule {}
