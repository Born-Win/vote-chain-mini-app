import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

/**
 * Reusable Swagger documentation for pagination params:
 * ?page={number}, ?limit={number}, ?sortBy={string}, ?sortOrder={'asc'|'desc'}
 */
export function ApiPagination(
  sortBy: any,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
): <TFunction extends Function, Y>(
  target: object | TFunction,
  propertyKey?: string | symbol,
  descriptor?: TypedPropertyDescriptor<Y>,
) => void {
  return applyDecorators(
    ApiQuery({
      name: 'page',
      required: false,
      type: Number,
      description: 'Current page (1-based index)',
    }),
    ApiQuery({
      name: 'limit',
      required: false,
      type: Number,
      description: 'Number of items per page',
    }),
    ApiQuery({
      name: 'sortBy',
      required: false,
      enum: sortBy,
      description: 'Field to sort by',
    }),
    ApiQuery({
      name: 'sortOrder',
      required: false,
      enum: ['asc', 'desc'],
      description: 'Sorting order',
    }),
  );
}
