import { ApiProperty } from '@nestjs/swagger';

import { PageMetaDtoParameters } from '@common/pagination/page-meta-dto-parameters.interface';

export class PageMetaDto {
  @ApiProperty({
    description: 'Maximum number of items per page',
    example: 10,
  })
  readonly limit: number;

  @ApiProperty({
    description: 'Current page number',
    example: 1,
  })
  readonly page: number;

  @ApiProperty({
    description: 'Total number of items matching the filter/search',
    example: 100,
  })
  readonly totalCount: number;

  @ApiProperty({
    description: 'Calculated total pages based on totalCount and limit',
    example: 10,
  })
  readonly totalPages: number;

  constructor({ paginationDto, totalCount }: PageMetaDtoParameters) {
    this.limit = paginationDto.limit;
    this.page = paginationDto.page;
    this.totalCount = totalCount;
    this.totalPages = Math.ceil(this.totalCount / this.limit);
  }
}
