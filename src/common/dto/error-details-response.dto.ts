import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ErrorDetailsResponseDto {
  @ApiProperty()
  message: string;

  @ApiProperty()
  details: string;

  @ApiPropertyOptional()
  status: number;

  @ApiPropertyOptional()
  code: number;

  @ApiPropertyOptional()
  type: string;
}
