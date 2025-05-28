import Fastify from 'fastify';
import { config } from '@/config/environment.js';
import { registerPlugins } from '@/plugins/index.js';
import { registerRoutes } from '@/routes/index.js';

const server = Fastify({
  logger:
    config.NODE_ENV === 'development'
      ? {
          transport: {
            target: 'pino-pretty',
            options: {
              colorize: true,
              translateTime: 'HH:MM:ss Z',
              ignore: 'pid,hostname',
            },
          },
        }
      : true,
});

const start = async (): Promise<void> => {
  try {
    // Register plugins
    await registerPlugins(server);

    // Register routes
    await registerRoutes(server);

    // Start server
    await server.listen({
      port: config.PORT,
      host: config.HOST,
    });

    server.log.info(`Server listening on http://${config.HOST}:${config.PORT}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

// Handle graceful shutdown
const gracefulShutdown = async (signal: string): Promise<void> => {
  server.log.info(`Received ${signal}, shutting down gracefully...`);
  try {
    await server.close();
    process.exit(0);
  } catch (err) {
    server.log.error('Error during graceful shutdown:', err);
    process.exit(1);
  }
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

start();
