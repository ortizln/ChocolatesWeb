# Arquitectura y Modelo de Seguridad - Chocolates Web

## Arquitectura General

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        CAPA DE PRESENTACIÓN                              │
│                                                                          │
│  ┌─────────────────────────┐     ┌──────────────────────────┐            │
│  │   Sitio Público         │     │   Panel Administrativo    │            │
│  │   Angular 18            │     │   Angular 18              │            │
│  │   Puerto :4200 (dev)    │     │   Puerto :4300 (dev)      │            │
│  └───────────┬─────────────┘     └────────────┬──────────────┘            │
│              │                                 │                           │
│              └──────────HTTPS──────────────────┘                           │
└───────────────────────────────────┬───────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼───────────────────────────────────────┐
│                        NGINX REVERSE PROXY                                 │
│                                                                           │
│  / → Sitio Público (dist/public)                                          │
│  /admin → Panel Admin (dist/admin)                                        │
│  /api/ → Spring Boot Backend (proxy_pass)                                 │
│  /uploads/ → Archivos estáticos                                           │
│                                                                           │
│  SSL Termination | CORS | Rate Limiting | Security Headers                 │
└───────────────────────────────────┬───────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼───────────────────────────────────────┐
│                        CAPA DE SERVICIOS                                   │
│                                                                           │
│                ┌──────────────────────────────────────┐                    │
│                │        Spring Boot 3 / Java 21        │                    │
│                │                                        │                    │
│  ┌───────────┐ │  ┌──────────┐  ┌──────────┐  ┌─────┐ │  ┌──────────┐     │
│  │ Auth      │ │  │Product   │  │Post      │  │Event│ │  │Banner    │     │
│  │ Controller│─┼─▶│Controller│─┼─▶│Controller│─┼─▶│Ctrl │─┼─▶│Controller│     │
│  └─────┬─────┘ │  └────┬─────┘  └────┬─────┘  └──┬──┘ │  └────┬─────┘     │
│        │       │       │             │           │    │        │           │
│  ┌─────▼─────┐ │  ┌────▼─────┐  ┌────▼─────┐  ┌──▼──┐ │  ┌────▼─────┐     │
│  │AuthService│ │  │Product   │  │Post      │  │Event│ │  │Banner    │     │
│  │ JWT       │ │  │Service   │  │Service   │  │Svce │ │  │Service   │     │
│  └─────┬─────┘ │  └────┬─────┘  └────┬─────┘  └──┬──┘ │  └────┬─────┘     │
│        │       │       │             │           │    │        │           │
│  ┌─────▼─────┐ │  ┌────▼─────┐  ┌────▼─────┐  ┌──▼──┐ │  ┌────▼─────┐     │
│  │ JPA       │ │  │  JPA     │  │  JPA     │  │ JPA │ │  │  JPA     │     │
│  │ Repository│ │  │Repository│  │Repository│  │Repo │I│  │Repository│     │
│  └───────────┘ │  └──────────┘  └──────────┘  └─────┘ │  └──────────┘     │
│                └──────────────────────────────────────┘                    │
│                                                                           │
│  ┌──────────────────────────────────────────────────────────┐             │
│  │  Analytics Service  │  Media Service (MinIO)  │ Contact  │             │
│  │  Dashboard Service  │  Report Service (PDF/Excel)         │             │
│  │  Settings Service   │  Navigation Service    │ Audit     │             │
│  └──────────────────────────────────────────────────────────┘             │
└───────────────────────────────────┬───────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼───────────────────────────────────────┐
│                        CAPA DE DATOS                                       │
│                                                                           │
│  ┌─────────────────────────┐     ┌──────────────────────────┐              │
│  │     PostgreSQL 16        │     │     MinIO Object Store    │              │
│  │                          │     │                          │              │
│  │  Datos Transaccionales   │     │  Imágenes                │              │
│  │  Datos Analíticos        │     │  Videos                  │              │
│  │  Usuarios y Roles        │     │  PDFs                    │              │
│  │  Auditoría               │     │  Documentos              │              │
│  └─────────────────────────┘     └──────────────────────────┘              │
└───────────────────────────────────────────────────────────────────────────┘
```

## Patrones y Principios

### Backend (Spring Boot)
- **Arquitectura**: Capas (Controller → Service → Repository → Entity)
- **DTOs**: Separación entre entidades JPA y objetos de respuesta
- **Inyección de Dependencias**: Constructor injection con Lombok
- **Transacciones**: @Transactional con control granular
- **Manejo de Errores**: GlobalExceptionHandler con @RestControllerAdvice
- **Paginación**: Spring Data Pageable para listados
- **Validación**: Jakarta Validation (@NotBlank, @Email, etc.)
- **Mapper**: MapStruct para conversión Entity ↔ DTO
- **Auditoría**: Tabla audit_log + post_versions

### Frontend (Angular)
- **Componentes Standalone**: Angular 18 standalone components
- **Lazy Loading**: Carga diferida por ruta
- **Servicios**: HttpClient inyectado con interceptors
- **Subjects**: BehaviorSubject para estado compartido
- **Guard**: Route guards con authGuard
- **Interceptor**: HTTP interceptor para token JWT
- **Modelos**: TypeScript interfaces mirror del backend

---

## Modelo de Seguridad

### 1. Autenticación JWT

```
┌──────────┐         ┌──────────┐         ┌──────────┐
│          │  1. POST │          │  2. Valid│          │
│  Cliente │──/login──▶  Spring  │──creds──▶   BD     │
│ (Angular)│          │  Security│          │          │
│          │◀──jwt────│          │◀──ok─────│          │
│          │  4. Token│          │  3. JWT  │          │
└──────────┘         └──────────┘         └──────────┘
     │
     │ 5. Request + Authorization: Bearer jwt
     ▼
┌──────────┐         ┌──────────┐
│ Spring   │──valid──▶JwtAuthen │
│ Security │──token──▶tication  │
│ Filter   │          Filter    │
│ Chain    │◀──set─────┐       │
│          │   Auth    │       │
└──────────┘  Context  └───────┘
```

**Flujo:**
1. Usuario envía credenciales a `/auth/login`
2. Spring Security autentica contra BD
3. Servicio genera JWT (Access + Refresh)
4. Cliente almacena tokens (localStorage)
5. Cada request incluye `Authorization: Bearer <token>`
6. JwtAuthenticationFilter valida token y establece contexto de seguridad
7. Access token expira en 24h, refresh token en 7 días
8. Cliente usa `/auth/refresh` para renovar access token

### 2. Roles y Permisos

```
┌─────────────────────────────────────────────────────────┐
│                     JERARQUÍA DE ROLES                    │
│                                                          │
│          ┌──────────────────────────────────────┐        │
│          │        ROLE_ADMIN                    │        │
│          │  Control total del sistema           │        │
│          │  Usuarios, Settings, Auditoría       │        │
│          │  Todo lo que EDITOR y MARKETING tienen│        │
│          └──────────────────┬───────────────────┘        │
│                             │                            │
│          ┌──────────────────▼───────────────────┐        │
│          │        ROLE_EDITOR                    │        │
│          │  Contenido: Blog, Eventos, Galería   │        │
│          │  Mensajes, Navegación                │        │
│          │  Todo lo que MARKETING tiene          │        │
│          └──────────────────┬───────────────────┘        │
│                             │                            │
│          ┌──────────────────▼───────────────────┐        │
│          │      ROLE_MARKETING                   │        │
│          │  Productos, Categorías, Etiquetas    │        │
│          │  Banners, Carruseles, Analítica      │        │
│          └──────────────────────────────────────┘        │
└─────────────────────────────────────────────────────────┘
```

### 3. Protección de Endpoints

**Endpoint públicos** (sin autenticación):
- `/api/v1/auth/**` - Login, registro
- `/api/v1/**/public/**` - Datos públicos
- `/uploads/**` - Archivos estáticos
- `/actuator/health` - Health check

**Endpoint protegidos por rol:**
```java
@PreAuthorize("hasRole('ADMIN')")           // Solo admin
@PreAuthorize("hasAnyRole('ADMIN', 'EDITOR')")  // Admin + Editor
@PreAuthorize("hasAnyRole('ADMIN', 'MARKETING')") // Admin + Marketing
@PreAuthorize("hasAnyRole('ADMIN', 'EDITOR', 'MARKETING')") // Todos los roles
```

### 4. Seguridad en Capas

| Capa | Mecanismo |
|------|-----------|
| Network | HTTPS, Nginx reverse proxy |
| Transporte | SSL/TLS 1.2+ |
| HTTP | Security headers (X-Frame-Options, XSS, etc.) |
| API | CORS configurado, JWT, Rate limiting |
| Aplicación | Spring Security, @PreAuthorize, validación |
| Datos | Prepared statements (JPA), escape de inputs |
| Almacenamiento | Passwords BCrypt, secrets en env vars |

### 5. Medidas de Seguridad Adicionales

```nginx
# Nginx Security Headers
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block";
add_header Referrer-Policy "strict-origin-when-cross-origin";
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";
```

- Passwords almacenadas con BCrypt (salt automático)
- Refresh tokens con fecha de expiración y revocación
- Tokens JWT firmados con HMAC-SHA256
- Protección contra CSRF deshabilitada (usamos JWT stateless)
- Validación de inputs en frontend y backend
- Límite de tamaño de archivos subidos (50MB)
- CORS limitado a orígenes configurados
- Auditoría de todas las acciones CRUD

---

## Base de Datos - Modelo de Seguridad

```sql
-- Tablas de seguridad
roles            → id, name (ROLE_ADMIN, ROLE_EDITOR, ROLE_MARKETING), description
users            → id, username, email, password (BCrypt), enabled, account_non_locked
user_roles       → user_id, role_id (relación M:N)
refresh_tokens   → id, token, user_id, expiry_date, revoked
password_reset_tokens → id, token, user_id, expiry_date, used
```

### Consulta de ejemplo para obtener roles de usuario:
```sql
SELECT u.username, r.name as role
FROM users u
JOIN user_roles ur ON u.id = ur.user_id
JOIN roles r ON ur.role_id = r.id
WHERE u.username = 'admin';
```

---

## Almacenamiento de Archivos

```
                    ┌─────────────────────┐
                    │    File Upload       │
                    │    Angular / Admin    │
                    └──────────┬──────────┘
                               │ POST /api/v1/admin/media/upload
                               ▼
                    ┌─────────────────────┐
                    │    MediaService      │
                    │    Spring Boot       │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
      ┌────────────┐   ┌────────────┐   ┌────────────┐
      │  MinIO     │   │   Local    │   │  YouTube   │
      │  S3 API    │   │  ./uploads │   │  (embed)   │
      └────────────┘   └────────────┘   └────────────┘
```

**Tipos de almacenamiento:**
- `MINIO`: Archivos multimedia grandes (bucket: chocolates-media)
- `LOCAL`: Archivos pequeños, desarrollo (./uploads/)
- `YOUTUBE`: Videos alojados en YouTube (embed)
- `EXTERNAL`: URLs de terceros

---

## Rendimiento y Escalabilidad

### Backend
- Pool de conexiones HikariCP (20 conexiones max)
- Batch inserts para operaciones masivas
- Consultas con índices optimizados
- Caching (a implementar en futura fase: Redis)

### Base de Datos
- Índices en columnas de búsqueda frecuente
- Full-text search en productos y posts
- Particionamiento por fecha en tabla page_visits
- Vistas materializadas para analytics (futuro)

### Frontend
- Lazy loading de módulos
- Lazy loading de imágenes
- Compresión Gzip en Nginx
- Cache de archivos estáticos (30 días)
- Build con output hashing

### Infraestructura
- Docker multi-stage builds (imágenes ligeras)
- Health checks para todos los servicios
- Restart automático en caso de fallo
- Volúmenes Docker para persistencia de datos
