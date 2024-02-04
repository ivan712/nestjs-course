import { IsDate, IsDateString, IsInt, Min } from 'class-validator';

export class CreateScheduleDto {
  @IsInt()
  @Min(1)
  room: number;

  @IsDate()
  date: Date;
}
