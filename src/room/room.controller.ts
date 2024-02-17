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
  UseGuards,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { HttpExceptionFilter } from '../exceptions/http-exception.filter';
import { PaginationDto } from '../shared/pagination.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/guards/roles.decorator';
import { Role } from '../user/user.entity';

@Controller('room')
@UseFilters(new HttpExceptionFilter())
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Roles(Role.admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateRoomDto) {
    return this.roomService.create(dto);
  }

  @Roles(Role.admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':number')
  async deleteByNumber(@Param('number', ParseIntPipe) number: number) {
    return this.roomService.delete(number);
  }

  @Roles(Role.admin, Role.user)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get(':number')
  async getRoom(@Param('number', ParseIntPipe) number: number) {
    return this.roomService.getByNumber(number);
  }

  @Roles(Role.admin, Role.user)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get('')
  async getRooms(@Query() query: PaginationDto) {
    return this.roomService.getRooms({ ...query });
  }

  @Roles(Role.admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Put('')
  async updateRoom(@Body() dto: UpdateRoomDto) {
    return this.roomService.update(dto);
  }
}
