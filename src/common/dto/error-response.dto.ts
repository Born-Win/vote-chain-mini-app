import { ApiProperty } from '@nestjs/swagger';

import { BaseResponseDto } from './base-response.dto';
import { ErrorDetailsResponseDto } from './error-details-response.dto';

export class ErrorResponseDto extends BaseResponseDto {
  data: null;

  pagination: null;

  @ApiProperty({ type: ErrorDetailsResponseDto })
  error: ErrorDetailsResponseDto;
}
