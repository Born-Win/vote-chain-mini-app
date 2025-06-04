import { DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import jwtAuthConfig from '@core/configs/jwt-auth.config';

export function InitJwtModule(): DynamicModule {
  return JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [jwtAuthConfig.KEY],
    global: true,
    useFactory: (config: ConfigType<typeof jwtAuthConfig>) => ({
      secret: config.secret,
      signOptions: { expiresIn: config.accessExpiresIn },
    }),
  });
}
