import { Response, Request } from 'express';

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';

import { Logger } from '@common/logger';
import { getStatusMessage } from '@common/utils/http-status-messages';

type ExceptionResponse = {
  statusCode?: number;
  message?: unknown;
  error?: string;
  [key: string]: any;
};

type ErrorResponse = {
  data: null;
  error: {
    message: string;
    details: string;
    [key: string]: any;
  };
  pagination: null;
  statusMessage: string;
  statusCode: number;
  timestamp: string;
  path: string;
};

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const statusCode = exception.getStatus();
    const exceptionResponse = this.getExceptionResponse(exception);

    this.logException(exceptionResponse, request.url);

    const errorResponse = this.buildErrorResponse(
      request.url,
      statusCode,
      exceptionResponse,
    );

    response.status(statusCode).json(errorResponse);
  }

  private getExceptionResponse(exception: HttpException): ExceptionResponse {
    const response = exception.getResponse();

    if (typeof response === 'string') {
      return { message: response };
    }

    return response as ExceptionResponse;
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

    return 'An unexpected error occurred';
  }

  private buildErrorResponse(
    path: string,
    httpStatus: number,
    exceptionResponse: ExceptionResponse,
  ): ErrorResponse {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { statusCode, message, error, ...rest } = exceptionResponse;

    const formattedMessage = this.formatExceptionMessage(message);

    return {
      data: null,
      error: {
        message: formattedMessage,
        details: error || 'No error details provided',
        ...rest,
      },
      pagination: null,
      statusCode: httpStatus,
      statusMessage: getStatusMessage(httpStatus),
      timestamp: new Date().toISOString(),
      path,
    };
  }

  private logException(
    exceptionResponse: ExceptionResponse,
    path: string,
  ): void {
    this.logger.debug(`Error occurred at ${path}`, exceptionResponse);
  }
}
