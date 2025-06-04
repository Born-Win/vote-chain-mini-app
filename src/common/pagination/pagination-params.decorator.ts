import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const PaginationParams = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const { query } = request;

    return { page: query.page, limit: query.limit };
  },
);
