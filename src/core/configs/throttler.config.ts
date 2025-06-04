import { registerAs } from '@nestjs/config';

import { ConfigKey } from '@common/enums';

interface IThrottlerConfig {
  limit: number;
  ttl: number;
  blockDuration: number;
}

export default registerAs(
  ConfigKey.Throttler,
  (): IThrottlerConfig => ({
    limit: parseInt(process.env.THROTTLE_LIMIT as string, 10),
    ttl: parseInt(process.env.THROTTLE_TTL as string, 10),
    blockDuration: parseInt(process.env.THROTTLE_BLOCK_DURATION as string, 10),
  }),
);
