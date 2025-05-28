import pino from 'pino';
import { config } from '@/config/environment.js';

export const logger = pino(
  config.NODE_ENV === 'development'
    ? {
        level: config.LOG_LEVEL,
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'HH:MM:ss Z',
            ignore: 'pid,hostname',
          },
        },
      }
    : {
        level: config.LOG_LEVEL,
      }
);

export const createLogger = (context: string) => {
  return logger.child({ context });
};
