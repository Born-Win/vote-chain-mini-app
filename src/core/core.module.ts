import { join } from 'path';

import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ThrottlerGuard } from '@nestjs/throttler';

import { PrismaModule } from '@core/prisma/prisma.module';

import { AllExceptionsFilter, HttpExceptionFilter } from '@common/filters';
import {
  LoggingInterceptor,
  ResponseTransformationInterceptor,
} from '@common/interceptors/';

import {
  InitConfigModule,
  InitJwtModule,
  InitThrottlerModule,
  InitWinstonModule,
} from './initializers';

@Module({
  imports: [
    PrismaModule,
    ScheduleModule.forRoot(),
    InitWinstonModule(),
    InitConfigModule(),
    InitJwtModule(),
    InitThrottlerModule(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'public'),
      serveRoot: '/',
      exclude: ['/api*'],
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },

    // LoggingInterceptor must be before ResponseTransformationInterceptor
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseTransformationInterceptor,
    },
  ],
})
export class CoreModule {}
