import { IsInt, Max, Min } from 'class-validator';

export class BookingStatisticDto {
  @IsInt()
  @Min(1)
  @Max(12)
  month: number;

  @IsInt()
  year: number;
}
