import { Response, Request } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { OkResponseDto } from '@common/dto';
import { PageDto } from '@common/pagination/page.dto';
import { getStatusMessage } from '@common/utils/http-status-messages';

@Injectable()
export class ResponseTransformationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const { statusCode } = response;

    return next
      .handle()
      .pipe(
        map(
          (data: any): OkResponseDto =>
            this.transformResponse(data, statusCode, request.url),
        ),
      );
  }

  private transformResponse(
    data: any,
    statusCode: number,
    url: string,
  ): OkResponseDto {
    const isPaginated = data instanceof PageDto;

    return {
      data: isPaginated ? data.items : data,
      error: null,
      pagination: isPaginated ? data.meta : null,
      statusCode,
      statusMessage: getStatusMessage(statusCode),
      timestamp: new Date().toISOString(),
      path: url,
    };
  }
}
