import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule as NestWinstonModule,
} from 'nest-winston';
import { WinstonModuleOptions } from 'nest-winston/dist/winston.interfaces';
import { format, transport, transports } from 'winston';

import { DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { LogLevel } from '@common/types';
import { capitalizeFirstLetter } from '@common/utils';

function initWinstonConfig(configService: ConfigService): WinstonModuleOptions {
  const logLevel = configService.get<LogLevel>('LOG_LEVEL');
  const appName = configService.getOrThrow<string>('APP_NAME');
  const noColor = configService.get<boolean>('NO_COLOR');

  const logsFormat = format.combine(
    format.ms(),
    format.timestamp({ format: 'isoDateTime' }),
    nestWinstonModuleUtilities.format.nestLike(capitalizeFirstLetter(appName), {
      colors: noColor !== false,
      prettyPrint: true,
      processId: true,
    }),
  );

  const consoleTransport = new transports.Console({
    format: logsFormat,
  });

  const winstonTransports: transport[] = [consoleTransport];

  return {
    level: logLevel,
    // format: logsFormat,
    transports: winstonTransports,
  };
}

export function InitWinstonModule(): DynamicModule {
  return NestWinstonModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService): WinstonModuleOptions =>
      initWinstonConfig(configService),
    inject: [ConfigService],
  });
}
