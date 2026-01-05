# Docker para Null-Pointers

Esta guía explica cómo construir y ejecutar la aplicación completa usando Docker y Docker Compose.

## Estructura del Proyecto

```
Null-Pointers/
├── app/                    # Aplicación Angular (Frontend)
│   ├── Dockerfile
│   └── nginx.conf
├── api/                    # API NestJS (Backend)
│   └── Dockerfile
├── docker-compose.yml      # Orquestación de contenedores
├── .env.example           # Variables de entorno de ejemplo
└── .dockerignore          # Archivos ignorados por Docker
```

## Prerrequisitos

- Docker y Docker Compose instalados
- Node.js 18+ (para desarrollo local)

## Configuración

1. Copiar el archivo de variables de entorno:
```bash
cp .env.example .env
```

2. Editar `.env` con tus configuraciones específicas:
   - Cambiar `DB_PASSWORD` por una contraseña segura
   - Cambiar `JWT_SECRET` por una clave secreta robusta
   - Configurar variables de email si es necesario

## Construcción y Ejecución

### Para Producción

```bash
# Construir y levantar todos los servicios
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down
```

### Para Desarrollo

```bash
# Construir imágenes en modo desarrollo
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
```

## Servicios

La aplicación completa incluye:

1. **app** - Frontend Angular (Nginx)
   - Puerto: 80
   - URL: http://localhost

2. **api** - Backend NestJS
   - Puerto: 3000
   - URL: http://localhost:3000

3. **database** - PostgreSQL
   - Puerto: 5432
   - URL: postgresql://postgres:password@localhost:5432/escuela

## Comandos Útiles

```bash
# Ver estado de los contenedores
docker-compose ps

# Reconstruir una imagen específica
docker-compose build api
docker-compose build app

# Entrar a un contenedor
docker-compose exec api sh
docker-compose exec app sh

# Ver logs de un servicio específico
docker-compose logs -f api
docker-compose logs -f app

# Reiniciar un servicio
docker-compose restart api
```

## Variables de Entorno

Variables principales configurables en `.env`:

- `DB_NAME`: Nombre de la base de datos
- `DB_USER`: Usuario de PostgreSQL
- `DB_PASSWORD`: Contraseña de PostgreSQL
- `JWT_SECRET`: Clave secreta para JWT
- `JWT_EXPIRES_IN`: Tiempo de expiración del token
- `FRONTEND_URL`: URL del frontend
- `RESEND_API_KEY`: API key para envío de emails (opcional)

## Producción

Para producción:

1. Asegurar que todas las contraseñas y claves sean robustas
2. Configurar un dominio y certificados SSL/TLS
3. Considerar usar volúmenes persistentes para la base de datos
4. Configurar backup de la base de datos
5. Monitorear logs y métricas

## Troubleshooting

### Problemas comunes:

1. **Error de conexión a la base de datos**
   - Verificar que el contenedor de la base de datos esté corriendo
   - Revisar las variables de entorno en `.env`

2. **Error de build en Angular**
   - Verificar que todos los módulos estén correctamente importados
   - Revisar errores de TypeScript

3. **Problemas de permisos**
   - Los contenedores corren con usuarios no-root por seguridad
   - Asegurar que los volúmenes tengan los permisos correctos

### Logs importantes:

```bash
# Logs del API
docker-compose logs -f api

# Logs de la app
docker-compose logs -f app

# Logs de la base de datos
docker-compose logs -f database
```