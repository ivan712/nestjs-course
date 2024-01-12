import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomModel, RoomModelSchema } from './room.model';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: RoomModel.name, schema: RoomModelSchema }
        ])
    ],
    providers: [RoomService],
    controllers: [RoomController]
})
export class RoomModule { }
