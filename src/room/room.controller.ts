import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './mongo/dto/create-room.dto';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  async create(@Body() dto: CreateRoomDto) {
    return this.roomService.create(dto);
  }

  @Delete(':number')
  async deleteByNumber(@Param('number', ParseIntPipe) number: number) {
    return this.roomService.delete(number);
  }

  @Get(':number')
  async getRoom(@Param('number', ParseIntPipe) number: number) {
    return this.roomService.getByNumber(number);
  }

  @Get('')
  async getAllRooms() {
    return this.roomService.getAllRooms();
  }

  @Put('')
  async updateRoom(@Body() dto: CreateRoomDto) {
    return this.roomService.update(dto);
  }
}
