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
  UseInterceptors,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { PaginationDto } from '../shared/pagination.dto';
import { ExceptionInterceptor } from 'src/exceptions/exception.interceptor';

@Controller('room')
@UseInterceptors(ExceptionInterceptor)
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
