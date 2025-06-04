import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { PageMetaDto } from '@common/pagination/page-meta.dto';

import { BaseResponseDto } from './base-response.dto';

export class OkResponseDto extends BaseResponseDto {
  @ApiProperty()
  data: any;

  error: null;

  @ApiPropertyOptional({ nullable: true })
  pagination: PageMetaDto | null;
}
