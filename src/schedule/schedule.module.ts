import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomModel, RoomModelSchema } from 'src/room/room.model';
import { ScheduleModel, ScheduleModelSchema } from './schedule.model';
import { RoomService } from 'src/room/room.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RoomModel.name, schema: RoomModelSchema },
      { name: ScheduleModel.name, schema: ScheduleModelSchema }
    ])
  ],
  providers: [ScheduleService, RoomService],
  controllers: [ScheduleController]
})
export class ScheduleModule { }
