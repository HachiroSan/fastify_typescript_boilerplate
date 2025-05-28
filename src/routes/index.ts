import type { FastifyInstance } from 'fastify';
import { config } from '@/config/environment.js';
import { healthRoutes } from './health.js';
// import { exampleRoutes } from './example.js';

export async function registerRoutes(server: FastifyInstance): Promise<void> {
  // Register routes with API prefix
  await server.register(
    async fastify => {
      await fastify.register(healthRoutes);

      // Example: Add your custom routes here
      // await fastify.register(exampleRoutes);
    },
    { prefix: config.API_PREFIX }
  );

  // Root route
  server.get('/', async () => ({
    message: 'FastAPI TypeScript API Boilerplate',
    version: '1.0.0',
    docs: '/docs',
    health: `${config.API_PREFIX}/health`,
  }));
}
