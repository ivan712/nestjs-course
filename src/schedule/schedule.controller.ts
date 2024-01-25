import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseFilters,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './create-schedule.dto';
import { HttpExceptionFilter } from '../exceptions/http-exception.filter';
import { PaginationDto } from '../shared/pagination.dto';

@Controller('schedule')
@UseFilters(new HttpExceptionFilter())
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  async create(@Body() dto: CreateScheduleDto) {
    return this.scheduleService.create(dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.scheduleService.delete(id);
  }

  @Get()
  async getSchedules(@Query() query: PaginationDto) {
    return this.scheduleService.getSchedules(query);
  }

  @Get('findByRoom/:number')
  async getByRoom(@Param('number', ParseIntPipe) number: number) {
    return this.scheduleService.getRoomSchedule(number);
  }
}
