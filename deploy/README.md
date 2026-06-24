# Chocolates Web - Despliegue

Arquitectura: Frontend nativo (Angular) + Backend en Docker + BD nativa (PostgreSQL)

## Estructura

```
192.168.100.215
├── /chocolateweb/        → Frontend publico (Angular)
├── /chocolateweb/admin/  → Panel admin (Angular)
├── /api/v1/...             → Backend API (Spring Boot en Docker)
└── /uploads/               → Archivos subidos
```

## Requisitos

- **Servidor**: Linux con bash, docker, docker compose, nginx, node.js 22+, npm
- **Base de datos**: PostgreSQL 16 nativa (NO en Docker)
- **Backend**: Docker (Spring Boot 3.2 + Java 21)
- **Frontend**: Node.js nativo (Angular CLI)

## Despliegue Rapido

### 1. Base de Datos (una sola vez)

```bash
# En tu servidor PostgreSQL nativo
sudo -u postgres createdb chocolates_db;
sudo -u postgres psql -c "CREATE USER chocolates_user WITH PASSWORD 'Ch0c0l4t3s#2024!';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE chocolates_db TO chocolates_user;"

# Inicializar esquemas
# (ejecuta manualmente los scripts en ../database/ o usa JPA ddl-auto)
```

### 2. Backend (Docker)

```bash
cd deploy
cp .env.production .env
# Edita .env con tus valores reales
./deploy-backend.sh
```

### 3. Frontend (nativo)

```bash
# Nota: la configuracion de nginx la realizas manualmente
cd deploy
NGINX_WEBROOT=/usr/share/nginx/html ./deploy-frontend.sh
```

## Archivos

| Archivo | Descripcion |
|---------|-------------|
| `.env.production` | Template de variables de entorno para produccion |
| `docker-compose.backend.yml` | Docker Compose solo para el backend (sin BD) |
| `deploy-backend.sh` | Script de despliegue del backend en Docker |
| `deploy-frontend.sh` | Script de build + copia del frontend Angular |
| `nginx-chocolates.conf` | Configuracion de nginx para subpath /chocolateweb |
