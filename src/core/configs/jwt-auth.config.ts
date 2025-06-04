import { registerAs } from '@nestjs/config';

import { ConfigKey } from '@common/enums';

interface IJwtAuthConfig {
  secret: string;
  accessExpiresIn: string;
  refreshExpiresIn: string;
}

export default registerAs(
  ConfigKey.JwtAuth,
  (): IJwtAuthConfig => ({
    secret: process.env.JWT_SECRET as string,
    accessExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN as string,
    refreshExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN as string,
  }),
);
