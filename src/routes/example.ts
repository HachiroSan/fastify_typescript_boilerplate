import type { FastifyInstance } from 'fastify';
import { z } from 'zod';

// Example schemas
const itemSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  description: z.string().optional(),
  createdAt: z.string().datetime(),
});

const createItemSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
});

type Item = z.infer<typeof itemSchema>;
type CreateItem = z.infer<typeof createItemSchema>;

// Mock data for example
const items: Item[] = [];

export async function exampleRoutes(server: FastifyInstance): Promise<void> {
  // GET /items - List all items
  server.get(
    '/items',
    {
      schema: {
        tags: ['api'],
        summary: 'List all items',
        description: 'Retrieve a list of all items',
        response: {
          200: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string', format: 'uuid' },
                name: { type: 'string' },
                description: { type: 'string' },
                createdAt: { type: 'string', format: 'date-time' },
              },
            },
          },
        },
      },
    },
    async () => {
      return items;
    }
  );

  // POST /items - Create a new item
  server.post<{ Body: CreateItem; Reply: Item }>(
    '/items',
    {
      schema: {
        tags: ['api'],
        summary: 'Create a new item',
        description: 'Create a new item with the provided data',
        body: {
          type: 'object',
          required: ['name'],
          properties: {
            name: { type: 'string', minLength: 1 },
            description: { type: 'string' },
          },
        },
        response: {
          201: {
            type: 'object',
            properties: {
              id: { type: 'string', format: 'uuid' },
              name: { type: 'string' },
              description: { type: 'string' },
              createdAt: { type: 'string', format: 'date-time' },
            },
          },
        },
      },
    },
    async (request, reply) => {
      const createData = createItemSchema.parse(request.body);

      const newItem: Item = {
        id: crypto.randomUUID(),
        name: createData.name,
        description: createData.description,
        createdAt: new Date().toISOString(),
      };

      items.push(newItem);

      reply.status(201);
      return newItem;
    }
  );

  // GET /items/:id - Get item by ID
  server.get<{ Params: { id: string } }>(
    '/items/:id',
    {
      schema: {
        tags: ['api'],
        summary: 'Get item by ID',
        description: 'Retrieve a specific item by its ID',
        params: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
          },
          required: ['id'],
        },
        response: {
          200: {
            type: 'object',
            properties: {
              id: { type: 'string', format: 'uuid' },
              name: { type: 'string' },
              description: { type: 'string' },
              createdAt: { type: 'string', format: 'date-time' },
            },
          },
          404: {
            type: 'object',
            properties: {
              error: { type: 'string' },
              message: { type: 'string' },
            },
          },
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const item = items.find(item => item.id === id);

      if (!item) {
        reply.status(404);
        return { error: 'Not Found', message: 'Item not found' };
      }

      return item;
    }
  );

  // DELETE /items/:id - Delete item by ID
  server.delete<{ Params: { id: string } }>(
    '/items/:id',
    {
      schema: {
        tags: ['api'],
        summary: 'Delete item by ID',
        description: 'Delete a specific item by its ID',
        params: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
          },
          required: ['id'],
        },
        response: {
          204: {
            type: 'null',
          },
          404: {
            type: 'object',
            properties: {
              error: { type: 'string' },
              message: { type: 'string' },
            },
          },
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const itemIndex = items.findIndex(item => item.id === id);

      if (itemIndex === -1) {
        reply.status(404);
        return { error: 'Not Found', message: 'Item not found' };
      }

      items.splice(itemIndex, 1);
      reply.status(204);
      return;
    }
  );
}
