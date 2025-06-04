import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Environment } from '@common/enums';
import { Logger } from '@common/logger';
import { getStatusMessage } from '@common/utils/http-status-messages';

function maskSensitiveFields<T>(obj: T, fields: string[]): T {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }
  const clone = { ...obj } as Record<string, any>;
  fields.forEach(field => {
    if (clone[field]) {
      clone[field] = '****';
    }
  });
  return clone as T;
}

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  constructor(private readonly configService: ConfigService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<Request>();
    const response = httpContext.getResponse<Response>();

    const startTime = Date.now();

    const isProduction =
      this.configService.get('NODE_ENV') === Environment.Production;

    const { method, originalUrl, headers, query, params, body } = request;

    // Mask sensitive fields in body
    const sensitiveFields = ['password', 'token', 'secret'];
    const safeBody = maskSensitiveFields(body, sensitiveFields);

    if (!isProduction) {
      this.logger.debug(
        `[Request] [${method}] [${originalUrl}] | [Params] ${JSON.stringify(params)} | ` +
          `[Query] ${JSON.stringify(query)} | [Headers] ${JSON.stringify(headers)} | ` +
          `[Body] ${JSON.stringify(safeBody)}`,
      );
    }

    return next.handle().pipe(
      tap(data => {
        const { statusCode } = response;
        const statusMessage =
          response.statusMessage || getStatusMessage(statusCode);
        const duration = Date.now() - startTime;

        if (!isProduction) {
          this.logger.debug(
            `[Response] [${method}] [${originalUrl}] | ` +
              `[Body] ${JSON.stringify(data)} | ` +
              `[Headers] ${JSON.stringify(response.getHeaders())} | ` +
              `[Time] ${duration}ms`,
          );
        }

        // Standard log message
        const logMessage = `[${method}] [${originalUrl}] ${statusCode} ${statusMessage} - [${duration}ms]`;
        this.logger.log(logMessage);
      }),
    );
  }
}
