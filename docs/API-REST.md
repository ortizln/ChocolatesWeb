# Documentación de APIs REST - Chocolates Web

## Base URL

| Entorno | URL |
|---------|-----|
| Desarrollo | `http://localhost:8080/api/v1` |
| Producción | `https://chocolates.local/api/v1` |

## Autenticación

Todas las rutas administrativas requieren header:

```
Authorization: Bearer <access_token>
```

---

## Índice de Endpoints

### 1. Autenticación
### 2. Productos (Público)
### 3. Productos (Admin)
### 4. Categorías
### 5. Etiquetas
### 6. Blog / Posts
### 7. Eventos
### 8. Banners
### 9. Carruseles
### 10. Galería Multimedia
### 11. Testimonios
### 12. Contacto / Mensajes
### 13. Usuarios
### 14. Dashboard
### 15. Analítica
### 16. Configuración del Sitio
### 17. Navegación
### 18. Auditoría
### 19. Medios / Archivos

---

## 1. Autenticación

### `POST /auth/login`
Iniciar sesión.

**Request:**
```json
{
  "username": "admin",
  "password": "Admin123!"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiJ9...",
    "tokenType": "Bearer",
    "username": "admin",
    "email": "admin@chocolates.com",
    "firstName": "Administrador",
    "lastName": "Sistema",
    "roles": ["ROLE_ADMIN", "ROLE_EDITOR", "ROLE_MARKETING"]
  }
}
```

### `POST /auth/register`
Registrar nuevo usuario.

**Request:**
```json
{
  "username": "nuevo_usuario",
  "email": "user@email.com",
  "password": "MiPassword123",
  "firstName": "Nombre",
  "lastName": "Apellido"
}
```

### `POST /auth/refresh`
Refrescar token expirado.

**Request:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiJ9..."
}
```

---

## 2. Productos - Público

### `GET /products/public`
Listar productos activos con paginación.

**Parámetros:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| page | int | Número de página (default: 0) |
| size | int | Tamaño de página (default: 12) |
| category | Long | Filtrar por ID de categoría |
| search | String | Buscar por nombre o descripción |
| sort | String | Ordenar (price, name, createdAt, viewsCount) |

**Response:**
```json
{
  "success": true,
  "data": {
    "content": [{ "id": 1, "name": "Chocolate Clásico", "code": "CH-001", ... }],
    "page": 0,
    "size": 12,
    "totalElements": 45,
    "totalPages": 4,
    "last": false
  }
}
```

### `GET /products/public/featured`
Obtener productos destacados (activos).

### `GET /products/public/top-liked?limit=10`
Productos con más likes.

### `GET /products/public/top-viewed?limit=10`
Productos más visitados.

### `GET /products/public/{slug}`
Obtener detalle de producto por slug.

### `POST /products/public/{productId}/like`
Dar/quitar like a un producto.

**Request Body:**
```json
{
  "sessionId": "abc123xyz"
}
```

### `GET /products/public/{productId}/related?limit=4`
Productos relacionados (misma categoría).

---

## 3. Productos - Admin

Requiere rol: `ROLE_ADMIN` | `ROLE_EDITOR` | `ROLE_MARKETING`

### `GET /admin/products?page=0&size=20&status=ACTIVE`
Listar todos los productos.

### `GET /admin/products/{id}`
Obtener producto por ID.

### `POST /admin/products`
Crear producto.

**Request:**
```json
{
  "name": "Chocolate Orgánico 70%",
  "code": "CH-ORG-001",
  "categoryId": 3,
  "shortDescription": "Chocolate oscuro orgánico 70% cacao",
  "fullDescription": "<p>Elaborado con cacao orgánico peruano...</p>",
  "ingredients": "Pasta de cacao, manteca de cacao, azúcar de caña orgánica",
  "nutritionalInfo": "{\"energia_kcal\": 580, \"grasas_g\": 42, \"carbohidratos_g\": 35, \"proteinas_g\": 8}",
  "referencePrice": 25.90,
  "currency": "PEN",
  "stock": 150,
  "weightGrams": 100,
  "isFeatured": true,
  "status": "ACTIVE",
  "tagIds": [1, 2, 5],
  "videoUrl": "https://youtube.com/watch?v=abc123"
}
```

### `PUT /admin/products/{id}`
Actualizar producto.

### `DELETE /admin/products/{id}`
Eliminar producto.

### `PATCH /admin/products/{id}/status?status=INACTIVE`
Cambiar estado (ACTIVE/INACTIVE/DRAFT).

---

## 4. Categorías

### Público
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/v1/products/public/categories` | Listar categorías activas |
| GET | `/api/v1/products/public/categories/{slug}` | Categoría por slug |

### Admin (ROLE_ADMIN | EDITOR | MARKETING)
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/v1/admin/categories` | Listar todas |
| GET | `/api/v1/admin/categories/{id}` | Por ID |
| POST | `/api/v1/admin/categories` | Crear |
| PUT | `/api/v1/admin/categories/{id}` | Actualizar |
| DELETE | `/api/v1/admin/categories/{id}` | Eliminar |

---

## 5. Blog / Posts

### Público
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/v1/posts/public?page=0&size=10&type=BLOG` | Listar publicados |
| GET | `/api/v1/posts/public/{slug}` | Detalle (incrementa visitas) |

### Admin (ROLE_ADMIN | EDITOR | MARKETING)
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/v1/admin/posts` | Listar todos |
| POST | `/api/v1/admin/posts` | Crear |
| PUT | `/api/v1/admin/posts/{id}` | Actualizar |
| DELETE | `/api/v1/admin/posts/{id}` | Eliminar |
| PATCH | `/api/v1/admin/posts/{id}/status` | Cambiar estado |
| PATCH | `/api/v1/admin/posts/{id}/schedule` | Programar publicación |
| GET | `/api/v1/admin/posts/{id}/versions` | Historial de versiones |

---

## 6. Eventos

### Público
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/v1/events/public?type=FAIR` | Listar eventos publicados |
| GET | `/api/v1/events/public/upcoming` | Próximos eventos |
| GET | `/api/v1/events/public/{slug}` | Detalle |
| POST | `/api/v1/events/public/{eventId}/register` | Registrarse |

### Admin (ROLE_ADMIN | EDITOR | MARKETING)
CRUD completo en `/api/v1/admin/events`

---

## 7. Banners

### Público
| Método | Endpoint |
|--------|----------|
| GET | `/api/v1/banners/public/{bannerType}` |

Tipos: `PRINCIPAL`, `PROMOTION`, `CAMPAIGN`

### Admin
CRUD completo en `/api/v1/admin/banners` + `PATCH /reorder`

---

## 8. Carruseles

### Público
| Método | Endpoint |
|--------|----------|
| GET | `/api/v1/carousels/public/{location}` |

Ubicaciones: `HOME`, `PRODUCTS`, `GALLERY`, `ABOUT`

### Admin
CRUD completo en `/api/v1/admin/carousels` + items management

---

## 9. Contacto

### Público
**`POST /api/v1/contact/public`**

```json
{
  "fullName": "Juan Pérez",
  "email": "juan@email.com",
  "phone": "999888777",
  "subject": "Consulta sobre productos",
  "message": "Hola, me gustaría saber más sobre sus chocolates orgánicos."
}
```

### Admin (ROLE_ADMIN | EDITOR)
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/v1/admin/messages?status=PENDING` | Listar mensajes |
| GET | `/api/v1/admin/messages/{id}` | Detalle + respuestas |
| PUT | `/api/v1/admin/messages/{id}/status` | Cambiar estado |
| POST | `/api/v1/admin/messages/{id}/reply` | Responder |

---

## 10. Galería Multimedia

### Público
| Método | Endpoint |
|--------|----------|
| GET | `/api/v1/gallery/public/albums` |
| GET | `/api/v1/gallery/public/albums/{id}` |

### Admin (ROLE_ADMIN | EDITOR | MARKETING)
| Método | Endpoint |
|--------|----------|
| CRUD | `/api/v1/admin/galleries` |
| POST | `/api/v1/admin/galleries/{id}/media` |
| DELETE | `/api/v1/admin/galleries/{id}/media/{mediaId}` |

---

## 11. Usuarios (Admin)

Requiere: `ROLE_ADMIN`

| Método | Endpoint |
|--------|----------|
| GET | `/api/v1/admin/users` |
| GET | `/api/v1/admin/users/{id}` |
| POST | `/api/v1/admin/users` |
| PUT | `/api/v1/admin/users/{id}` |
| PATCH | `/api/v1/admin/users/{id}/status` |

---

## 12. Dashboard

Requiere: `ROLE_ADMIN` | `EDITOR` | `MARKETING`

| Método | Endpoint |
|--------|----------|
| GET | `/api/v1/admin/dashboard/stats` |
| GET | `/api/v1/admin/dashboard/charts` |

**Response `/stats`:**
```json
{
  "totalVisits": 15234,
  "dailyVisits": 342,
  "monthlyVisits": 8921,
  "totalProducts": 45,
  "totalPosts": 23,
  "activeEvents": 3,
  "totalUsers": 5,
  "topLikedProducts": [{"name": "...", "likesCount": 42}],
  "topViewedProducts": [{"name": "...", "viewsCount": 1234}],
  "topReadPosts": [{"title": "...", "viewsCount": 567}]
}
```

---

## 13. Analítica

Requiere: `ROLE_ADMIN` | `MARKETING`

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/v1/admin/analytics/daily?from=2024-01-01&to=2024-01-31` | Estadísticas diarias |
| GET | `/api/v1/admin/analytics/monthly?year=2024&month=1` | Estadísticas mensuales |
| GET | `/api/v1/admin/analytics/export?type=DAILY&format=PDF` | Exportar reporte |

Formatos: `PDF`, `EXCEL`

---

## 14. Medios / Archivos

Requiere: `ROLE_ADMIN` | `EDITOR` | `MARKETING`

| Método | Endpoint |
|--------|----------|
| POST | `/api/v1/admin/media/upload` (multipart) |
| POST | `/api/v1/admin/media/folder` |
| GET | `/api/v1/admin/media/folder/{id}` |
| DELETE | `/api/v1/admin/media/{id}` |
| GET | `/api/v1/admin/media/search?q=keyword` |

---

## 15. Configuración

Requiere: `ROLE_ADMIN`

| Método | Endpoint |
|--------|----------|
| GET | `/api/v1/admin/settings` |
| PUT | `/api/v1/admin/settings/{key}` |
| PUT | `/api/v1/admin/settings/bulk` |

---

## 16. Navegación

Requiere: `ROLE_ADMIN` | `EDITOR`

CRUD completo en `/api/v1/admin/navigation`

---

## 17. Auditoría

Requiere: `ROLE_ADMIN`

| Método | Endpoint |
|--------|----------|
| GET | `/api/v1/admin/audit?entityType=Product&entityId=1` |

---

## 18. Testimonios

### Público
`GET /api/v1/testimonials/public`

### Admin
CRUD completo en `/api/v1/admin/testimonials`

---

## 19. Registro de Visitas (Analytics Público)

**`POST /api/v1/analytics/public/visit`**

```json
{
  "pageUrl": "/productos/chocolate-organico-70",
  "pageType": "PRODUCT",
  "referenceId": 1,
  "sessionId": "abc123xyz"
}
```

El backend extrae automáticamente: IP, User-Agent, dispositivo, navegador, OS. La geolocalización se obtiene por IP si está configurado GeoLite2.

---

## Códigos de Error

| Código | Descripción |
|--------|-------------|
| 200 | OK |
| 201 | Creado |
| 400 | Error de validación |
| 401 | No autenticado |
| 403 | No autorizado (rol insuficiente) |
| 404 | Recurso no encontrado |
| 409 | Conflicto (duplicado) |
| 413 | Archivo demasiado grande |
| 500 | Error interno |

**Formato de error:**
```json
{
  "success": false,
  "message": "Descripción del error",
  "data": null,
  "timestamp": "2024-01-15T10:30:00"
}
```
