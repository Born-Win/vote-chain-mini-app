import { DynamicModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { configValidationSchema } from '@core/configs/config-validation.schema';
import jwtAuthConfig from '@core/configs/jwt-auth.config';

export function InitConfigModule(): Promise<DynamicModule> {
  return ConfigModule.forRoot({
    validationSchema: configValidationSchema,
    load: [jwtAuthConfig],
    isGlobal: true,
  });
}
