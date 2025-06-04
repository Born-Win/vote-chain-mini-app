import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const SortingParams = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const { query } = request;

    return { sortBy: query.sortBy, sortOrder: query.sortOrder };
  },
);
