import { ApiProperty } from '@nestjs/swagger';

export class BaseResponseDto {
  @ApiProperty()
  path: string;

  @ApiProperty()
  timestamp: string;

  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  statusMessage: string;
}
