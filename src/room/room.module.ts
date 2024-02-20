import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { RoomModel, RoomModelSchema } from './repositories/mongo/room.model';
import { RoomMongoRepository } from './repositories/mongo/room.repository';
import {
  ScheduleModel,
  ScheduleModelSchema,
} from '../schedule/repositories/mongo/schedule.model';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RoomModel.name, schema: RoomModelSchema },
      { name: ScheduleModel.name, schema: ScheduleModelSchema },
    ]),
    UserModule,
  ],
  providers: [RoomService, RoomMongoRepository],
  controllers: [RoomController],
})
export class RoomModule {}
