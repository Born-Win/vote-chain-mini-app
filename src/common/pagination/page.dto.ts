import { ApiProperty } from '@nestjs/swagger';

import { PageMetaDto } from './page-meta.dto';

export class PageDto<T> {
  @ApiProperty({
    description: 'Array of items for the current page.',
    isArray: true,
  })
  readonly items: T[];

  @ApiProperty({
    description:
      'Pagination metadata, including total count, limit page, total pages.',
    type: () => PageMetaDto,
  })
  readonly meta: PageMetaDto;

  constructor(items: T[], meta: PageMetaDto) {
    this.items = items;
    this.meta = meta;
  }
}
