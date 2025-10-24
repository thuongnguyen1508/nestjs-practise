import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  env: `${process.env.NODE_ENV || 'development'}`,
  tcpHost: `${process.env.TCP_HOST || 'localhost'}`,
  tcpPort: parseInt(process.env.TCP_PORT || '3088', 10),
  appKey: `${process.env.APP_KEY || ''}`,
}));
