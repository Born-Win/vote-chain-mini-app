import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';

import { OkResponseDto } from '@common/dto/ok-response.dto';
import { PageMetaDto } from '@common/pagination/page-meta.dto';

export const ApiOkResponseCustom = <ResponseData extends Type<unknown>>(
  responseData: ResponseData,
  {
    status,
    description,
  }: {
    status: number;
    description?: string;
  },
): any => {
  const data = { $ref: getSchemaPath(responseData) };
  const pagination = { $ref: getSchemaPath(PageMetaDto) };
  const extraModels: any[] = [OkResponseDto, PageMetaDto, responseData];

  return applyDecorators(
    ApiExtraModels(...extraModels),
    ApiResponse({
      description,
      status,
      schema: {
        allOf: [
          { $ref: getSchemaPath(OkResponseDto) },
          { properties: { data, pagination } },
        ],
      },
    }),
  );
};
