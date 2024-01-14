import { Type } from 'class-transformer';
import { IsDate, IsInt, Min } from 'class-validator';

export class CreateScheduleDto {
  @IsInt()
  @Min(1)
  room: number;

  @Type(() => Date)
  @IsDate()
  date: Date;
}
