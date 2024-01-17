import { registerAs } from '@nestjs/config';

export default registerAs('database', () => {
  return {
    database: {
      database: process.env.POSTGRES_DB,
      port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
      host: process.env.POSTGRES_HOST,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
    },
  };
});
