import { Transform } from 'class-transformer';
import { IsInt, Min, Max } from 'class-validator';

import {
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
  MAX_LIMIT,
  MIN_PAGE,
} from './pagination.constants';

export class PaginationDto {
  @IsInt()
  @Min(MIN_PAGE)
  @Transform(({ value }) => value ?? DEFAULT_PAGE)
  page: number;

  @IsInt()
  @Min(1)
  @Max(MAX_LIMIT)
  @Transform(({ value }) => value ?? DEFAULT_LIMIT)
  limit: number;

  offset: number;

  constructor(partial?: Partial<PaginationDto>) {
    if (partial) {
      Object.assign(this, partial);
    }

    this.offset = (this.page - 1) * this.limit;
  }
}
