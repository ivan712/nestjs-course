import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { ROOM_NOT_FOUND } from './room.constants';


@Controller('room')
export class RoomController {
    constructor(private readonly roomService: RoomService) { }

    @Post()
    async create(@Body() dto: CreateRoomDto) {
        return this.roomService.create(dto);
    }

    @Delete(':number')
    async deleteByNumber(@Param('number') number: number) {
        return this.roomService.delete(number);
    }

    @Get(':number')
    async getRoom(@Param('number') number: number) {
        return this.roomService.getByNumber(number)
    }

    @Get('')
    async getAllRooms() {
        return this.roomService.getAllRooms();
    }

    @Put('')
    async updateRoom(@Body() dto: CreateRoomDto) {
        const updatedDoc = await this.roomService.update(dto);
        if (!updatedDoc) {
            throw new HttpException(ROOM_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
        return updatedDoc;
    }
}
