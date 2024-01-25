import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsPositive } from 'class-validator';
import { SortDirection } from '../mongo/repository';

export class PaginationDto {
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  page: number;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  pageSize: number;

  @IsEnum(SortDirection)
  sortDirection: SortDirection;
}
