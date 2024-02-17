import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ScheduleModel,
  ScheduleModelSchema,
} from './repositories/mongo/schedule.model';
import { RoomService } from '../room/room.service';
import {
  RoomModel,
  RoomModelSchema,
} from '../room/repositories/mongo/room.model';
import { RoomMongoRepository } from '../room/repositories/mongo/room.repository';
import { ScheduleMongoRepository } from './repositories/mongo/schedule.mongoRepository';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    UserModule,
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
    RolesGuard,
    JwtAuthGuard,
  ],
  controllers: [ScheduleController],
})
export class ScheduleModule {}
