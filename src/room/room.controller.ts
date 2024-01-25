import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseFilters,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { HttpExceptionFilter } from '../exceptions/http-exception.filter';
import { PaginationDto } from '../shared/pagination.dto';

@Controller('room')
@UseFilters(new HttpExceptionFilter())
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
  async getRooms(@Query() query: PaginationDto) {
    return this.roomService.getRooms({ ...query });
  }

  @Put('')
  async updateRoom(@Body() dto: UpdateRoomDto) {
    return this.roomService.update(dto);
  }
}
