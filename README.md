# FastAPI + TypeScript API Boilerplate

A modern, production-ready FastAPI + TypeScript API boilerplate with comprehensive tooling and best practices for rapid development.

## 🚀 Features

- **FastAPI** - High-performance web framework
- **TypeScript** - Type-safe development
- **Zod** - Runtime type validation
- **Pino** - High-performance logging
- **Vitest** - Modern testing framework
- **ESLint + Prettier** - Code quality and formatting
- **Swagger/OpenAPI** - API documentation
- **Security** - Helmet, CORS, Rate limiting
- **Health Checks** - Kubernetes-ready endpoints
- **Docker** - Production-ready containerization
- **Setup Script** - Quick project customization

## 📋 Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- Docker (optional, for containerization)

## 🛠️ Quick Start

### Option 1: Using Setup Script (Recommended)

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Run the setup script to customize for your project:
   ```bash
   pnpm setup
   ```
4. Start development:
   ```bash
   pnpm dev
   ```

### Option 2: Manual Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Start development:
   ```bash
   pnpm dev
   ```

The API will be available at `http://localhost:3000`

## 🚀 Development

Start the development server with hot reload:

```bash
pnpm dev
```

### Available Scripts

- `pnpm setup` - Interactive project setup and customization
- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm test` - Run tests
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:coverage` - Run tests with coverage report
- `pnpm lint` - Lint code
- `pnpm lint:fix` - Lint and auto-fix issues
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting
- `pnpm typecheck` - Check TypeScript types

## 📊 API Documentation

Once the server is running, you can access:

- **Swagger UI**: `http://localhost:3000/docs`
- **OpenAPI JSON**: `http://localhost:3000/docs/json`

## 🏥 Health Checks

The API provides health check endpoints suitable for Kubernetes:

- `GET /api/v1/health` - General health status
- `GET /api/v1/health/ready` - Readiness probe
- `GET /api/v1/health/live` - Liveness probe

## 🔧 Configuration

Configuration is handled through environment variables:

| Variable | Default | Description |
|----------|---------|-------------|
| `NODE_ENV` | `development` | Environment (development/production/test) |
| `PORT` | `3000` | Server port |
| `HOST` | `localhost` | Server host |
| `LOG_LEVEL` | `info` | Log level (fatal/error/warn/info/debug/trace) |
| `API_PREFIX` | `/api/v1` | API route prefix |
| `CORS_ORIGIN` | `*` | CORS allowed origins (comma-separated) |
| `RATE_LIMIT_MAX` | `100` | Rate limit max requests |
| `RATE_LIMIT_WINDOW` | `1 minute` | Rate limit time window |

## 📁 Project Structure

```
src/
├── config/           # Configuration files
│   └── environment.ts
├── plugins/          # FastAPI plugins
│   └── index.ts
├── routes/           # API routes
│   ├── index.ts
│   ├── health.ts
│   └── example.ts    # Example CRUD routes
├── types/            # TypeScript type definitions
│   └── index.ts
├── utils/            # Utility functions
│   ├── logger.ts
│   └── validation.ts
├── __tests__/        # Test files
│   └── health.test.ts
└── index.ts          # Application entry point
```

## 🧪 Testing

Run tests:

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

## 🐳 Docker Deployment

### Build and run with Docker:

```bash
# Build the image
docker build -t my-api .

# Run the container
docker run -p 3000:3000 my-api
```

### Using Docker Compose:

```bash
# Start the application
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the application
docker-compose down
```

## 🚢 Production Deployment

1. Build the application:
   ```bash
   pnpm build
   ```

2. Start the production server:
   ```bash
   pnpm start
   ```

Or use the Docker setup for containerized deployment.

## 🛡️ Security Features

- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - Request rate limiting
- **Input Validation** - Zod schema validation

## 📝 Code Quality

The project includes comprehensive tooling for code quality:

- **ESLint** - Code linting with TypeScript support
- **Prettier** - Code formatting
- **TypeScript** - Static type checking
- **Husky** - Git hooks (if configured)

## 🚀 Getting Started

This boilerplate provides a solid foundation for building APIs. To customize for your project:

1. **Use the setup script**: Run `pnpm setup` for interactive customization
2. **Add your routes**: Create new route files in `src/routes/` (see `example.ts` for reference)
3. **Define your data models**: Add types and schemas in `src/types/`
4. **Add business logic**: Create utilities and services as needed
5. **Update configuration**: Modify environment variables as required
6. **Customize documentation**: Update Swagger schemas in your route definitions

### Example: Adding New Routes

1. Create a new route file in `src/routes/`:
   ```typescript
   // src/routes/users.ts
   export async function userRoutes(server: FastifyInstance) {
     server.get('/users', async () => {
       // Your logic here
     });
   }
   ```

2. Register the routes in `src/routes/index.ts`:
   ```typescript
   import { userRoutes } from './users.js';
   
   // Inside registerRoutes function:
   await fastify.register(userRoutes);
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Run linting and formatting
7. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details 