# Chocolates Web - Plataforma Corporativa Premium

Plataforma web profesional para empresa dedicada a la venta y promoción de productos elaborados a base de chocolate. Dividida en **Sitio Web Público** y **Panel Administrativo**.

---

## Arquitectura

```
┌─────────────────────────────────────────────────────────┐
│                    Cliente (Browser)                      │
│         Sitio Público :4200  │  Admin :4300               │
└────────────────────────┬────────────────────────────────┘
                         │ HTTPS
┌────────────────────────▼────────────────────────────────┐
│                   Nginx (Reverse Proxy)                   │
│              SSL / Ruteo / Archivos Estáticos             │
└────────────────────────┬────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────┐
│              Spring Boot 3 / Java 21 API                  │
│   ┌──────┐ ┌──────┐ ┌──────┐ ┌────────┐ ┌──────────┐   │
│   │Auth  │ │Prod  │ │Blog  │ │Analytics│ │Multimedia│   │
│   │JWT   │ │Catalog│ │Events│ │Métricas │ │MinIO     │   │
│   └──────┘ └──────┘ └──────┘ └────────┘ └──────────┘   │
└────────────────────────┬────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────┐
│              PostgreSQL 16                                │
│         Datos · Analytics · Usuarios                     │
└─────────────────────────────────────────────────────────┘
```

---

## Requisitos del Sistema

| Herramienta | Versión |
|-------------|---------|
| Docker | 24+ |
| Docker Compose | 2.20+ |
| Node.js | 20+ |
| Java | 21 (JDK) |
| Maven | 3.9+ |
| Angular CLI | 18+ |

---

## Instalación Rápida (Docker)

### 1. Clonar el repositorio

```bash
git clone <repo-url> chocolates-web
cd chocolates-web
```

### 2. Configurar variables de entorno

Editar `infra/docker-compose.yml` o crear archivo `.env`:

```env
DB_NAME=chocolates_db
DB_USER=chocolates_user
DB_PASSWORD=Ch0c0l4t3s#2024!
JWT_SECRET=YmFzZTY0RW5jb2RlZFNlY3JldEtleUZvckNob2NvbGF0ZXNXZWJBcHBsaWNhdGlvbjIwMjQ=
MINIO_ACCESS_KEY=chocolates_minio
MINIO_SECRET_KEY=Ch0c0l4t3s_M1n10_2024!
```

### 3. Construir y ejecutar con Docker Compose

```bash
# Desde la raíz del proyecto
docker-compose -f infra/docker-compose.yml up -d --build
```

Esto levantará:
- **Nginx** → `puertos 80 (HTTP) y 443 (HTTPS)`
- **Spring Boot API** → `puerto 8080`
- **PostgreSQL 16** → `puerto 5432`
- **MinIO** → `puertos 9000 (API S3) y 9001 (Consola)`

### 4. Verificar el despliegue

```bash
docker-compose -f infra/docker-compose.yml ps
docker-compose -f infra/docker-compose.yml logs -f
```

---

## Instalación Manual (Desarrollo)

### Backend (Spring Boot)

```bash
cd backend

# Compilar
./mvnw clean package -DskipTests

# Ejecutar
java -jar target/chocolates-web-backend-1.0.0.jar

# O con Maven Wrapper
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

La API estará disponible en: `http://localhost:8080`

### Frontend - Sitio Público (Angular 18)

```bash
cd frontend/public-site

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm start
# → http://localhost:4200
```

### Frontend - Panel Admin (Angular 18)

```bash
cd frontend/admin-panel

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm start
# → http://localhost:4300
```

---

## Estructura del Proyecto

```
chocolates-web/
├── infra/                          # Infraestructura
│   ├── docker-compose.yml          # Orquestación Docker
│   ├── nginx/conf.d/default.conf   # Configuración Nginx
│   └── nginx/ssl/                  # Certificados SSL
├── database/                       # Base de datos
│   ├── init/01-schema.sql          # Esquema completo
│   ├── init/02-seed.sql            # Datos iniciales
│   ├── ER-Diagram.md               # Diagrama entidad-relación
│   └── scripts/                    # Scripts adicionales
├── backend/                        # API REST Spring Boot
│   ├── pom.xml
│   ├── Dockerfile
│   └── src/main/java/com/chocolates/web/
│       ├── ChocolatesWebApplication.java
│       ├── configuration/          # Config (Security, MinIO)
│       ├── security/               # JWT, Auth
│       ├── entity/                 # 29 entidades JPA
│       ├── repository/             # 29 repositorios
│       ├── service/                # 18 servicios
│       ├── controller/public/      # 12 APIs públicas
│       ├── controller/admin/       # 17 APIs admin
│       ├── dto/request/            # DTOs de entrada
│       ├── dto/response/           # DTOs de salida
│       ├── mapper/                 # MapStruct mappers
│       └── exception/              # Manejo global errores
├── frontend/
│   ├── public-site/               # Sitio público Angular 18
│   │   ├── package.json
│   │   ├── angular.json
│   │   └── src/app/
│   │       ├── pages/             # Home, Catálogo, Blog, Eventos...
│   │       └── shared/            # Componentes, servicios, modelos
│   └── admin-panel/               # Panel admin Angular 18
│       ├── package.json
│       ├── angular.json
│       └── src/app/
│           ├── pages/             # Dashboard, Productos, Usuarios...
│           └── shared/            # Guards, interceptors, servicios
└── README.txt                     # Este archivo
```

---

## APIs REST - Endpoints Principales

### Autenticación
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/v1/auth/login` | Iniciar sesión |
| POST | `/api/v1/auth/register` | Registrar usuario |
| POST | `/api/v1/auth/refresh` | Refrescar token |

### Públicas
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/v1/products/public` | Listar productos activos |
| GET | `/api/v1/products/public/featured` | Productos destacados |
| GET | `/api/v1/products/public/{slug}` | Detalle de producto |
| POST | `.../{id}/like` | Dar like a producto |
| GET | `/api/v1/posts/public` | Listar publicaciones |
| GET | `/api/v1/events/public` | Listar eventos |
| GET | `/api/v1/events/public/upcoming` | Próximos eventos |
| GET | `/api/v1/banners/public/{type}` | Banners por tipo |
| GET | `/api/v1/carousels/public/{location}` | Carrusel por ubicación |
| POST | `/api/v1/contact/public` | Enviar mensaje |
| GET | `/api/v1/testimonials/public` | Testimonios activos |
| POST | `/api/v1/analytics/public/visit` | Registrar visita |

### Administrativas
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/v1/admin/dashboard/stats` | Estadísticas dashboard |
| CRUD | `/api/v1/admin/products` | Gestión productos |
| CRUD | `/api/v1/admin/categories` | Gestión categorías |
| CRUD | `/api/v1/admin/posts` | Gestión blog |
| CRUD | `/api/v1/admin/events` | Gestión eventos |
| CRUD | `/api/v1/admin/banners` | Gestión banners |
| CRUD | `/api/v1/admin/carousels` | Gestión carruseles |
| CRUD | `/api/v1/admin/messages` | Gestión mensajes |
| CRUD | `/api/v1/admin/users` | Gestión usuarios (admin) |
| GET | `/api/v1/admin/analytics/export` | Exportar reportes |

---

## Credenciales por Defecto

| Usuario | Contraseña | Rol |
|---------|-----------|-----|
| `admin` | `Admin123!` | ROLE_ADMIN |
| `editor1` | `Admin123!` | ROLE_EDITOR |
| `marketing1` | `Admin123!` | ROLE_MARKETING |

> **⚠️ Importante**: Cambiar las credenciales y secretos en producción.

---

## Seguridad

- **Autenticación**: JWT (Access Token + Refresh Token)
- **Roles**: ADMIN (control total), EDITOR (contenido), MARKETING (productos/campañas)
- **Passwords**: BCrypt + salt
- **API**: Endpoints protegidos con Spring Security + @PreAuthorize
- **CORS**: Configurado para orígenes permitidos
- **Headers**: X-Frame-Options, X-Content-Type-Options, X-XSS-Protection
- **Almacenamiento**: Contraseñas y secretos en variables de entorno

---

## Variables de Entorno

| Variable | Descripción | Valor por Defecto |
|----------|-------------|-------------------|
| `DB_HOST` | Host PostgreSQL | `localhost` |
| `DB_PORT` | Puerto PostgreSQL | `5432` |
| `DB_NAME` | Nombre BD | `chocolates_db` |
| `DB_USER` | Usuario BD | `chocolates_user` |
| `DB_PASSWORD` | Contraseña BD | `Ch0c0l4t3s#2024!` |
| `JWT_SECRET` | Secreto JWT (Base64) | `YmFzZTY0...` |
| `JWT_EXPIRATION` | Expiración token (ms) | `86400000` |
| `MINIO_ENDPOINT` | Endpoint MinIO | `http://localhost:9000` |
| `MINIO_ACCESS_KEY` | Access Key MinIO | `chocolates_minio` |
| `MINIO_SECRET_KEY` | Secret Key MinIO | `Ch0c0l4t3s_M1n10_2024!` |
| `CORS_ORIGINS` | Orígenes CORS | `http://localhost:4200,...` |

---

## Plan de Desarrollo por Fases

### Fase 1 - Infraestructura y Base (Semanas 1-2)
- [x] Docker Compose + Nginx
- [x] Base de datos PostgreSQL (29 tablas)
- [x] Estructura backend Spring Boot
- [x] Seguridad JWT + roles

### Fase 2 - API Core (Semanas 3-4)
- [ ] CRUD productos, categorías, etiquetas
- [ ] CRUD blog, eventos
- [ ] Banners y carruseles
- [ ] Gestión multimedia (MinIO + local)

### Fase 3 - Frontend Público (Semanas 5-7)
- [ ] Landing page completa
- [ ] Catálogo + detalle producto
- [ ] Blog + eventos
- [ ] Galería multimedia
- [ ] Formulario contacto

### Fase 4 - Panel Admin (Semanas 8-10)
- [ ] Dashboard con gráficos
- [ ] CRUD administrable
- [ ] Gestión de usuarios
- [ ] Sistema de mensajes

### Fase 5 - Analítica (Semanas 11-12)
- [ ] Registro de visitas
- [ ] Estadísticas diarias/mensuales
- [ ] Reportes PDF/Excel
- [ ] Dashboard de métricas

### Fase 6 - Producción (Semanas 13-14)
- [ ] SSL / HTTPS
- [ ] Optimización rendimiento
- [ ] Pruebas de carga
- [ ] Documentación final

---

## Comandos Útiles

```bash
# Ver logs de todos los servicios
docker-compose -f infra/docker-compose.yml logs -f

# Ver logs de un servicio específico
docker-compose -f infra/docker-compose.yml logs -f spring-app

# Reiniciar un servicio
docker-compose -f infra/docker-compose.yml restart spring-app

# Acceder a la base de datos
docker exec -it chocolates-postgres psql -U chocolates_user -d chocolates_db

# Acceder a la consola MinIO
# http://localhost:9001 (usuario: chocolates_minio)

# Backup de la base de datos
docker exec chocolates-postgres pg_dump -U chocolates_user chocolates_db > backup.sql

# Restaurar base de datos
cat backup.sql | docker exec -i chocolates-postgres psql -U chocolates_user -d chocolates_db
```

---

## Tecnologías Utilizadas

| Capa | Tecnología |
|------|-----------|
| **Frontend** | Angular 18, Angular Material, Bootstrap 5 |
| **Backend** | Spring Boot 3, Java 21, Spring Security JWT |
| **Base de Datos** | PostgreSQL 16 |
| **Almacenamiento** | MinIO (S3-compatible) |
| **Infraestructura** | Docker, Docker Compose, Nginx |

---

## Licencia

© 2024 Chocolates Web. Todos los derechos reservados.
