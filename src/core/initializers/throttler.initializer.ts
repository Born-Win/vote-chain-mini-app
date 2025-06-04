import { DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

import throttlerConfig from '@core/configs/throttler.config';

export function InitThrottlerModule(): DynamicModule {
  return ThrottlerModule.forRootAsync({
    imports: [ConfigModule.forFeature(throttlerConfig)],
    inject: [throttlerConfig.KEY],
    useFactory: (configService: ConfigType<typeof throttlerConfig>) => [
      {
        ttl: configService.ttl,
        limit: configService.limit,
        blockDuration: configService.blockDuration,
      },
    ],
  });
}
