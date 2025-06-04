import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';

import { ErrorResponseDto } from '@common/dto/error-response.dto';

export const ApiErrorResponseCustom = ({
  status,
  description,
}: {
  status: number;
  description?: string;
}): any => {
  const extraModels: any[] = [ErrorResponseDto];

  return applyDecorators(
    ApiExtraModels(...extraModels),
    ApiResponse({
      description,
      status,
      schema: {
        allOf: [{ $ref: getSchemaPath(ErrorResponseDto) }],
      },
    }),
  );
};
