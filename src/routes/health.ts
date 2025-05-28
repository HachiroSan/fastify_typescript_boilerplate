import type { FastifyInstance } from 'fastify';
import { z } from 'zod';

const healthResponseSchema = z.object({
  status: z.string(),
  timestamp: z.string(),
  uptime: z.number(),
  version: z.string(),
});

type HealthResponse = z.infer<typeof healthResponseSchema>;

export async function healthRoutes(server: FastifyInstance): Promise<void> {
  server.get<{ Reply: HealthResponse }>(
    '/health',
    {
      schema: {
        tags: ['health'],
        summary: 'Health check endpoint',
        description: 'Returns the current health status of the API',
        response: {
          200: {
            type: 'object',
            properties: {
              status: { type: 'string', example: 'ok' },
              timestamp: { type: 'string', format: 'date-time' },
              uptime: { type: 'number', example: 123.456 },
              version: { type: 'string', example: '1.0.0' },
            },
          },
        },
      },
    },
    async () => {
      return {
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        version: '1.0.0',
      };
    }
  );

  server.get(
    '/health/ready',
    {
      schema: {
        tags: ['health'],
        summary: 'Readiness check',
        description: 'Returns 200 when the service is ready to accept requests',
        response: {
          200: {
            type: 'object',
            properties: {
              ready: { type: 'boolean', example: true },
            },
          },
        },
      },
    },
    async () => {
      // Add any readiness checks here (database connections, external services, etc.)
      return { ready: true };
    }
  );

  server.get(
    '/health/live',
    {
      schema: {
        tags: ['health'],
        summary: 'Liveness check',
        description: 'Returns 200 when the service is alive',
        response: {
          200: {
            type: 'object',
            properties: {
              alive: { type: 'boolean', example: true },
            },
          },
        },
      },
    },
    async () => {
      return { alive: true };
    }
  );
}
