# Docker Files Guide - Null-Pointers

Este documento explica cómo funcionan los Docker files y cómo usarlos para desplegar la aplicación completa.

## Arquitectura de Contenedores

La aplicación utiliza tres contenedores principales:

1. **Frontend (Angular + Nginx)** - Contenedor de la aplicación web
2. **Backend (NestJS)** - API REST
3. **Database (PostgreSQL)** - Base de datos

## 📁 Archivos Docker

### Frontend Dockerfile (`app/Dockerfile`)

```dockerfile
# Multi-stage build para Angular application
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

**¿Cómo funciona?**
- **Stage 1 (build):** Compila la aplicación Angular en modo producción
- **Stage 2 (nginx):** Servidor web ligero que sirve los archivos estáticos
- **Ventajas:** Imagen final pequeña (~20MB), rápida y segura

### Backend Dockerfile (`api/Dockerfile`)

```dockerfile
# Multi-stage build para NestJS application
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

**¿Cómo funciona?**
- **Stage 1 (build):** Instala dependencias de desarrollo y compila TypeScript
- **Stage 2 (production):** Solo dependencias de producción + código compilado
- **Seguridad:** Corre como usuario no-root (`nestjs`)
- **Prisma:** Incluye cliente generado y archivos de esquema

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

**¿Cómo funciona?**
- Sirve archivos estáticos de Angular
- Proxy de `/api/*` al backend NestJS
- Soporte para routing de SPA (Angular Router)

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

**¿Cómo funciona?**
- **database:** PostgreSQL persistente con volúmenes
- **api:** Se levanta solo cuando la base de datos está saludable
- **app:** Se levanta solo cuando el API está saludable
- **Health checks:** Aseguran que los servicios estén funcionando

## 🛠️ Uso Práctico

### 1. Configuración Inicial

```bash
# Copiar variables de entorno
cp .env.example .env

# Editar configuración
nano .env
```

**Variables importantes en `.env`:**
```env
DB_PASSWORD=your-secure-password
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
FRONTEND_URL=http://localhost:4200
```

### 2. Comandos Básicos

```bash
# Construir y levantar todo
docker-compose up -d

# Ver estado
docker-compose ps

# Ver logs
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f api
docker-compose logs -f app

# Detener todo
docker-compose down
```

### 3. Desarrollo vs Producción

#### Para Desarrollo:
```bash
# Modo desarrollo con watch
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
```

#### Para Producción:
```bash
# Modo producción optimizado
docker-compose up -d --build
```

### 4. Mantenimiento

```bash
# Reconstruir una imagen específica
docker-compose build api
docker-compose build app

# Limpiar contenedores e imágenes no usadas
docker system prune -a

# Actualizar imágenes base
docker-compose pull
docker-compose up -d
```

### 5. Troubleshooting

#### Verificar contenedores:
```bash
docker-compose ps
```

#### Inspeccionar logs:
```bash
# Logs recientes
docker-compose logs --tail=50 api

# Logs en tiempo real
docker-compose logs -f app

# Logs con timestamps
docker-compose logs -t database
```

#### Entrar a contenedores:
```bash
# Entrar al contenedor del API
docker-compose exec api sh

# Entrar al contenedor de la app
docker-compose exec app sh

# Entrar a la base de datos
docker-compose exec database psql -U postgres -d escuela
```

#### Health checks:
```bash
# Verificar health checks
docker inspect null-pointers-api | grep -A 10 Health
docker inspect null-pointers-app | grep -A 10 Health
```

## 🔧 Configuración Avanzada

### Personalizar Imágenes

#### Cambiar puerto del frontend:
```yaml
# En docker-compose.yml
app:
  ports:
    - "8080:80"  # Acceder en http://localhost:8080
```

#### Cambiar puerto del API:
```yaml
api:
  ports:
    - "8081:3000"  # Acceder en http://localhost:8081
```

### Volumen Persistente

Para persistir datos de la base de datos:
```yaml
database:
  volumes:
    - ./postgres_data:/var/lib/postgresql/data  # Local al proyecto
    # o
    - postgres_data:/var/lib/postgresql/data    # Docker managed
```

### Multi-ambiente

Crear archivo `docker-compose.override.yml` para desarrollo local:
```yaml
version: '3.8'
services:
  api:
    environment:
      NODE_ENV: development
    volumes:
      - ./api/src:/app/src  # Hot reload
```

## 📊 Optimización

### Reducir tamaño de imágenes:

1. **Usar `.dockerignore`** para excluir archivos innecesarios
2. **Multi-stage builds** para reducir tamaño final
3. **Imágenes Alpine** ligeras y seguras
4. **Limpieza de cache** en npm

### Mejorar seguridad:

1. **Usuario no-root** en contenedores de aplicación
2. **Secrets management** para datos sensibles
3. **Health checks** para monitoreo
4. **Read-only filesystem** donde sea posible

### Performance:

1. **Parallel builds** con `docker-compose build --parallel`
2. **Cache mounting** en builds locales
3. **Resource limits** en producción
4. **Load balancing** para alta disponibilidad

## 🚨 Buenas Prácticas

1. **Nunca exponer la base de datos** en producción
2. **Usar contraseñas robustas** en variables de entorno
3. **Configurar backups** automáticos de la base de datos
4. **Monitorear recursos** con `docker stats`
5. **Actualizar regularmente** imágenes base
6. **Documentar cambios** en la configuración

## 🆘 Problemas Comunes

### Error: "Database connection failed"
```bash
# Verificar si la DB está corriendo
docker-compose logs database

# Verificar variables de entorno
docker-compose exec api env | grep DATABASE
```

### Error: "Port already in use"
```bash
# Ver qué usa el puerto
sudo lsof -i :80
sudo lsof -i :3000

# Cambiar puertos en docker-compose.yml
```

### Error: "Permission denied"
```bash
# Reconstruir con permisos correctos
docker-compose down
docker-compose up -d --build
```

### Error: "Out of memory"
```bash
# Ver uso de memoria
docker stats

# Limitar memoria en docker-compose.yml
services:
  api:
    deploy:
      resources:
        limits:
          memory: 512M
```

## 📚 Referencias

- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Nginx Configuration](https://nginx.org/en/docs/)
- [Multi-stage Builds](https://docs.docker.com/build/building/multi-stage/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)

---

💡 **Tip:** Usa `docker-compose up --build` la primera vez para construir todas las imágenes, luego `docker-compose up -d` para iniciar rápidamente.