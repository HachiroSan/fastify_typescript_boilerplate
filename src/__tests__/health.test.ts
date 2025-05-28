import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import Fastify from 'fastify';
import type { FastifyInstance } from 'fastify';
import { healthRoutes } from '../routes/health.js';

describe('Health Routes', () => {
  let server: FastifyInstance;

  beforeAll(async () => {
    server = Fastify({ logger: false });
    await server.register(healthRoutes);
    await server.ready();
  });

  afterAll(async () => {
    await server.close();
  });

  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/health',
      });

      expect(response.statusCode).toBe(200);

      const payload = JSON.parse(response.payload);
      expect(payload).toHaveProperty('status', 'ok');
      expect(payload).toHaveProperty('timestamp');
      expect(payload).toHaveProperty('uptime');
      expect(payload).toHaveProperty('version');
      expect(typeof payload.uptime).toBe('number');
    });
  });

  describe('GET /health/ready', () => {
    it('should return readiness status', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/health/ready',
      });

      expect(response.statusCode).toBe(200);

      const payload = JSON.parse(response.payload);
      expect(payload).toHaveProperty('ready', true);
    });
  });

  describe('GET /health/live', () => {
    it('should return liveness status', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/health/live',
      });

      expect(response.statusCode).toBe(200);

      const payload = JSON.parse(response.payload);
      expect(payload).toHaveProperty('alive', true);
    });
  });
});
