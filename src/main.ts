import basicAuth from 'express-basic-auth';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import {
  ValidationPipe,
  ValidationPipeOptions,
  VersioningType,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { Environment } from '@common/enums';
import { Logger } from '@common/logger';

import { AppModule } from './app.module';

const logger = new Logger('Main');

function setupSwagger(
  app: NestExpressApplication,
  configService: ConfigService,
): void {
  const nodeEnv = configService.getOrThrow<Environment>('NODE_ENV');

  if (nodeEnv === Environment.Production) {
    return;
  }

  const username = configService.getOrThrow<string>('SWAGGER_USERNAME');
  const password = configService.getOrThrow<string>('SWAGGER_PASSWORD');

  const path = '/docs';

  app.use(
    path,
    basicAuth({
      challenge: true,
      users: {
        [username]: password,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Auth API Docs')
    .setDescription('The Auth API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(path, app, document, {
    jsonDocumentUrl: `${path}/json`,
    useGlobalPrefix: true,
  });
}

function setupVersioning(app: NestExpressApplication): void {
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
}

function setupWinstonLogger(app: NestExpressApplication): void {
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
}

function setupGlobalPipes(app: NestExpressApplication): void {
  const settings: ValidationPipeOptions = {
    transform: true,
    whitelist: true,
    validateCustomDecorators: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  };

  const validator = new ValidationPipe(settings);

  app.useGlobalPipes(validator);
}

async function bootstrap(): Promise<void> {
  process.on('unhandledRejection', (error: Error) => {
    logger.error('unhandledRejection', error);
  });

  process.on('uncaughtException', (error: Error) => {
    logger.error('uncaughtException', error);

    // Research in which cases we should close process
    process.exit(1);
  });

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  const configService = app.get(ConfigService);

  setupWinstonLogger(app);

  app.setGlobalPrefix('api');
  setupVersioning(app);

  setupSwagger(app, configService);
  setupGlobalPipes(app);

  const appPort = configService.getOrThrow<number>('PORT');

  await app.listen(appPort);

  logger.log(`The application has successfully started on port ${appPort}`);
}

bootstrap().catch(error => logger.error(error));
