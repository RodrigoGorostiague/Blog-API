import * as Joi from 'joi';

const configSchema = Joi.object({
  DATABASE_NAME: Joi.string().required(),
  DATABASE_PORT: Joi.number().required(),
  POSTGRES_DB: Joi.string().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_PORT: Joi.number().required(),
  POSTGRES_HOST: Joi.string().hostname().required(),

  API_KEY: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
});

export default configSchema;
