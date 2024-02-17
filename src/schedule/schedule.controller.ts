import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './create-schedule.dto';
import { PaginationDto } from '../shared/pagination.dto';
import { IdValidationPipe } from '../mongo/id-validation.pipe';
import { Roles } from '../auth/guards/roles.decorator';
import { Role } from '../user/user.entity';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { ExceptionInterceptor } from 'src/exceptions/exception.interceptor';

@Controller('schedule')
@UseInterceptors(ExceptionInterceptor)
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Roles(Role.admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateScheduleDto) {
    return this.scheduleService.create(dto);
  }

  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
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
