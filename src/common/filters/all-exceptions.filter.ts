import { Request } from 'express';

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

import { Logger } from '@common/logger';
import { getStatusMessage } from '@common/utils/http-status-messages';

type ErrorResponse = {
  data: null;
  error: {
    message: string;
    [key: string]: any;
  };
  pagination: null;
  statusMessage: string;
  statusCode: number;
  timestamp: string;
  path: string;
};

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch<T extends Error>(exception: T, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

    this.logException(exception, request.url);

    const errorResponse = this.buildErrorResponse(
      request.url,
      statusCode,
      exception,
    );

    httpAdapter.reply(response, errorResponse, statusCode);
  }

  private formatExceptionMessage(message?: unknown): string {
    if (Array.isArray(message)) {
      return message.join(',\n');
    }

    if (typeof message === 'string') {
      return message;
    }

    if (typeof message === 'object' && message !== null) {
      return JSON.stringify(message);
    }

    return 'Internal server error';
  }

  private buildErrorResponse<T extends Error>(
    path: string,
    httpStatus: number,
    exception: T,
  ): ErrorResponse {
    const { message, ...rest } = exception;

    const formattedMessage = this.formatExceptionMessage(message);

    return {
      data: null,
      error: {
        message: formattedMessage,
        ...rest,
      },
      pagination: null,
      statusCode: httpStatus,
      statusMessage: getStatusMessage(httpStatus),
      timestamp: new Date().toISOString(),
      path,
    };
  }

  private logException<T extends Error>(exception: T, path: string): void {
    this.logger.debug(`Unhandled exception at ${path}`, { error: exception });
  }
}
