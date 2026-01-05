# Docker Files Guide - Null-Pointers

This document explains how the Docker files work and how to use them to deploy the complete application.

## Container Architecture

The application uses three main containers:

1. **Frontend (Angular + Nginx)** - Web application container
2. **Backend (NestJS)** - REST API
3. **Database (PostgreSQL)** - Database

## 📁 Docker Files

### Frontend Dockerfile (`app/Dockerfile`)

```dockerfile
# Multi-stage build for Angular application
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build --configuration production

FROM nginx:alpine
COPY --from=build /app/dist/front-escuela /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**How it works:**
- **Stage 1 (build):** Compiles the Angular application in production mode
- **Stage 2 (nginx):** Lightweight web server that serves static files
- **Advantages:** Small final image (~20MB), fast and secure

### Backend Dockerfile (`api/Dockerfile`)

```dockerfile
# Multi-stage build for NestJS application
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:18-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001
RUN chown -R nestjs:nodejs /app
USER nestjs
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node dist/src/main || exit 1
CMD ["node", "dist/src/main"]
```

**How it works:**
- **Stage 1 (build):** Installs dev dependencies and compiles TypeScript
- **Stage 2 (production):** Only production dependencies + compiled code
- **Security:** Runs as non-root user (`nestjs`)
- **Prisma:** Includes generated client and schema files

### Nginx Configuration (`app/nginx.conf`)

```nginx
server {
    listen 80;
    server_name localhost;
    
    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;  # SPA routing
    }
    
    location /api/ {
        proxy_pass http://api:3000/;        # API proxy
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    gzip on;  # Compression
}
```

**How it works:**
- Serves static Angular files
- Proxy `/api/*` to NestJS backend
- SPA routing support (Angular Router)

## 🚀 Docker Compose

### `docker-compose.yml`

```yaml
version: '3.8'

services:
  database:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: ${DB_NAME:-escuela}
      POSTGRES_USER: ${DB_USER:-postgres}
      POSTGRES_PASSWORD: ${DB_PASSWORD:-password}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DB_USER:-postgres} -d ${DB_NAME:-escuela}"]

  api:
    build: ./api
    environment:
      DATABASE_URL: postgresql://${DB_USER:-postgres}:${DB_PASSWORD:-password}@database:5432/${DB_NAME:-escuela}
      JWT_SECRET: ${JWT_SECRET:-your-super-secret-jwt-key}
    depends_on:
      database:
        condition: service_healthy
    ports:
      - "3000:3000"

  app:
    build: ./app
    depends_on:
      api:
        condition: service_healthy
    ports:
      - "80:80"
```

**How it works:**
- **database:** PostgreSQL persistent with volumes
- **api:** Starts only when database is healthy
- **app:** Starts only when API is healthy
- **Health checks:** Ensure services are working

## 🛠️ Practical Usage

### 1. Initial Configuration

```bash
# Copy environment variables
cp .env.example .env

# Edit configuration
nano .env
```

**Important variables in `.env`:**
```env
DB_PASSWORD=your-secure-password
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
FRONTEND_URL=http://localhost:4200
```

### 2. Basic Commands

```bash
# Build and start everything
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f

# View logs of specific service
docker-compose logs -f api
docker-compose logs -f app

# Stop everything
docker-compose down
```

### 3. Development vs Production

#### For Development:
```bash
# Development mode with watch
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
```

#### For Production:
```bash
# Optimized production mode
docker-compose up -d --build
```

### 4. Maintenance

```bash
# Rebuild specific image
docker-compose build api
docker-compose build app

# Clean unused containers and images
docker system prune -a

# Update base images
docker-compose pull
docker-compose up -d
```

### 5. Troubleshooting

#### Check containers:
```bash
docker-compose ps
```

#### Inspect logs:
```bash
# Recent logs
docker-compose logs --tail=50 api

# Real-time logs
docker-compose logs -f app

# Logs with timestamps
docker-compose logs -t database
```

#### Enter containers:
```bash
# Enter API container
docker-compose exec api sh

# Enter app container
docker-compose exec app sh

# Enter database
docker-compose exec database psql -U postgres -d escuela
```

#### Health checks:
```bash
# Check health checks
docker inspect null-pointers-api | grep -A 10 Health
docker inspect null-pointers-app | grep -A 10 Health
```

## 🔧 Advanced Configuration

### Customize Images

#### Change frontend port:
```yaml
# In docker-compose.yml
app:
  ports:
    - "8080:80"  # Access at http://localhost:8080
```

#### Change API port:
```yaml
api:
  ports:
    - "8081:3000"  # Access at http://localhost:8081
```

### Persistent Volume

To persist database data:
```yaml
database:
  volumes:
    - ./postgres_data:/var/lib/postgresql/data  # Local to project
    # or
    - postgres_data:/var/lib/postgresql/data    # Docker managed
```

### Multi-environment

Create `docker-compose.override.yml` for local development:
```yaml
version: '3.8'
services:
  api:
    environment:
      NODE_ENV: development
    volumes:
      - ./api/src:/app/src  # Hot reload
```

## 📊 Optimization

### Reduce Image Size:

1. **Use `.dockerignore`** to exclude unnecessary files
2. **Multi-stage builds** to reduce final size
3. **Alpine images** lightweight and secure
4. **Cache cleanup** in npm

### Improve Security:

1. **Non-root user** in application containers
2. **Secrets management** for sensitive data
3. **Health checks** for monitoring
4. **Read-only filesystem** where possible

### Performance:

1. **Parallel builds** with `docker-compose build --parallel`
2. **Cache mounting** in local builds
3. **Resource limits** in production
4. **Load balancing** for high availability

## 🚨 Best Practices

1. **Never expose database** in production
2. **Use strong passwords** in environment variables
3. **Configure automatic backups** for database
4. **Monitor resources** with `docker stats`
5. **Update base images** regularly
6. **Document configuration** changes

## 🆘 Common Problems

### Error: "Database connection failed"
```bash
# Check if DB is running
docker-compose logs database

# Check environment variables
docker-compose exec api env | grep DATABASE
```

### Error: "Port already in use"
```bash
# See what's using the port
sudo lsof -i :80
sudo lsof -i :3000

# Change ports in docker-compose.yml
```

### Error: "Permission denied"
```bash
# Rebuild with correct permissions
docker-compose down
docker-compose up -d --build
```

### Error: "Out of memory"
```bash
# Check memory usage
docker stats

# Limit memory in docker-compose.yml
services:
  api:
    deploy:
      resources:
        limits:
          memory: 512M
```

## 📚 References

- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Nginx Configuration](https://nginx.org/en/docs/)
- [Multi-stage Builds](https://docs.docker.com/build/building/multi-stage/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)

---

💡 **Tip:** Use `docker-compose up --build` the first time to build all images, then `docker-compose up -d` for quick startup.