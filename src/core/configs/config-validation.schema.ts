import Joi from 'joi';

import { Environment } from '@common/enums';

export const configValidationSchema = Joi.object({
  APP_NAME: Joi.string().required(),
  PORT: Joi.number().required(),

  NODE_ENV: Joi.string()
    .valid(...Object.values(Environment))
    .required(),

  NO_COLOR: Joi.boolean().optional(),
  LOG_LEVEL: Joi.string()
    .valid('error', 'warn', 'info', 'verbose', 'debug')
    .required(),

  DATABASE_URL: Joi.string().required(),

  SWAGGER_USERNAME: Joi.string().required(),
  SWAGGER_PASSWORD: Joi.string().required(),

  JWT_SECRET: Joi.string().required(),
  ACCESS_TOKEN_EXPIRES_IN: Joi.string().required(),
  REFRESH_TOKEN_EXPIRES_IN: Joi.string().required(),

  LIMIT: Joi.number().required(),
  THROTTLE_LIMIT: Joi.number().required(),
  THROTTLE_TTL: Joi.number().required(),
});
