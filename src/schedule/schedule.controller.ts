import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';

@Controller('schedule')
export class ScheduleController {
    constructor(private readonly scheduleService: ScheduleService) { }

    @Post()
    async create(@Body() dto: CreateScheduleDto) {
        return this.scheduleService.create(dto);
    }

    @Delete()
    async delete(@Body() dto: CreateScheduleDto) {
        return this.scheduleService.delete(dto);
    }

    @Get()
    async getAll() {
        return this.scheduleService.getAllSchedules();
    }

    @Get('findByRoom/:number')
    async getByRoom(@Param('number') number: number) {
        return this.scheduleService.getRoomScheduleByNumber(number);
    }


}
