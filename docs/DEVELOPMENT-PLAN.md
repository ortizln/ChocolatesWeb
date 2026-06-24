# Plan de Desarrollo por Fases - Chocolates Web

## Resumen

| Fase | Duración | Descripción |
|------|----------|-------------|
| Fase 1 | 2 semanas | Infraestructura y base |
| Fase 2 | 2 semanas | APIs Core |
| Fase 3 | 3 semanas | Frontend Público |
| Fase 4 | 3 semanas | Panel Administrativo |
| Fase 5 | 2 semanas | Analítica y Reportes |
| Fase 6 | 2 semanas | Producción y Optimización |
| **Total** | **14 semanas** | |

---

## Fase 1: Infraestructura y Base (Semanas 1-2)

### Objetivo
Establecer toda la infraestructura base y el esqueleto del proyecto.

### Tareas

| # | Tarea | Responsable | Estimación |
|---|-------|-------------|------------|
| 1.1 | Configurar repositorio Git + .gitignore | DevOps | 2h |
| 1.2 | Docker Compose: PostgreSQL, MinIO, Nginx | DevOps | 8h |
| 1.3 | Configurar Nginx reverse proxy + SSL | DevOps | 6h |
| 1.4 | Crear esquema PostgreSQL completo (29 tablas) | Backend | 16h |
| 1.5 | Crear scripts seed + datos iniciales | Backend | 4h |
| 1.6 | Inicializar proyecto Spring Boot con dependencias | Backend | 4h |
| 1.7 | Configurar Spring Security + JWT | Backend | 8h |
| 1.8 | Configurar JPA/Hibernate + conexión BD | Backend | 4h |
| 1.9 | Configurar MapStruct + Lombok | Backend | 2h |
| 1.10 | Configurar MinIO Client | Backend | 4h |
| 1.11 | Inicializar proyectos Angular (público + admin) | Frontend | 8h |
| 1.12 | Configurar Angular Material + Bootstrap en ambos | Frontend | 4h |
| 1.13 | Crear estructura de carpetas y módulos | Ambos | 4h |
| 1.14 | Configurar environments (dev/prod) | Ambos | 2h |

**Entregables:**
- Infraestructura Docker funcional
- Base de datos creada con seed data
- Backend compila y conecta a BD
- Frontends sirven en dev
- Autenticación JWT funcional

**Hitos:**
- Semana 1: Docker Compose levantado con todos los servicios
- Semana 2: Login/registro funcional con JWT

---

## Fase 2: APIs Core (Semanas 3-4)

### Objetivo
Desarrollar todas las entidades JPA, repositorios, servicios y controladores REST.

### Tareas

| # | Tarea | Responsable | Estimación |
|---|-------|-------------|------------|
| 2.1 | Crear entidades JPA (29 entidades) | Backend | 16h |
| 2.2 | Crear repositorios JPA (29 repos) | Backend | 8h |
| 2.3 | Crear DTOs request/response | Backend | 12h |
| 2.4 | Implementar ProductService + ProductController | Backend | 16h |
| 2.5 | Implementar CategoryService + controller | Backend | 6h |
| 2.6 | Implementar TagService + controller | Backend | 4h |
| 2.7 | Implementar PostService + PostController | Backend | 12h |
| 2.8 | Implementar EventService + EventController | Backend | 10h |
| 2.9 | Implementar BannerService + controller | Backend | 6h |
| 2.10 | Implementar CarouselService + controller | Backend | 8h |
| 2.11 | Implementar ContactService + controller | Backend | 6h |
| 2.12 | Implementar SettingsService + controller | Backend | 4h |
| 2.13 | Implementar NavigationService + controller | Backend | 6h |
| 2.14 | Implementar MediaService + FileUpload | Backend | 10h |
| 2.15 | Implementar TestimonialService + controller | Backend | 4h |
| 2.16 | Implementar UserService + controller | Backend | 6h |
| 2.17 | Implementar AuditService + controller | Backend | 4h |
| 2.18 | Implementar GlobalExceptionHandler | Backend | 4h |
| 2.19 | Pruebas de integración de APIs | Backend | 16h |
| 2.20 | Documentación Swagger/OpenAPI | Backend | 8h |
| 2.21 | Pruebas con Postman de todos los endpoints | Backend | 8h |

**Entregables:**
- 29 APIs REST funcionales
- CRUD completo de todas las entidades
- Seguridad por roles implementada
- Manejo de archivos (upload/download)
- Documentación de APIs

**Hitos:**
- Semana 3: APIs de catálogo y contenido funcionales
- Semana 4: APIs de admin, media y settings completas

---

## Fase 3: Frontend Público (Semanas 5-7)

### Objetivo
Desarrollar el sitio web público completo con diseño premium.

### Tareas

| # | Tarea | Responsable | Estimación |
|---|-------|-------------|------------|
| 3.1 | Diseñar identidad visual completa | UX/UI | 16h |
| 3.2 | Crear design system (colores, tipografía, componentes) | UX/UI | 12h |
| 3.3 | Implementar Header (logo, nav, responsive) | Frontend | 8h |
| 3.4 | Implementar Footer completo | Frontend | 6h |
| 3.5 | Desarrollar Landing Page (home) | Frontend | 24h |
| 3.6 | Implementar Hero Banner animado | Frontend | 8h |
| 3.7 | Implementar sección Historia de Marca | Frontend | 4h |
| 3.8 | Implementar sección Productos Destacados | Frontend | 6h |
| 3.9 | Implementar sección Videos | Frontend | 4h |
| 3.10 | Implementar sección Testimonios | Frontend | 6h |
| 3.11 | Implementar contador de visitantes | Frontend | 2h |
| 3.12 | Implementar sección Blog (últimas noticias) | Frontend | 6h |
| 3.13 | Implementar sección Eventos | Frontend | 6h |
| 3.14 | Implementar sección Redes Sociales | Frontend | 2h |
| 3.15 | Implementar sección Contacto + Mapa | Frontend | 6h |
| 3.16 | Implementar Catálogo de Productos | Frontend | 16h |
| 3.17 | Implementar Filtros (categoría, búsqueda) | Frontend | 8h |
| 3.18 | Implementar Detalle de Producto | Frontend | 16h |
| 3.19 | Implementar Galería de imágenes/videos | Frontend | 10h |
| 3.20 | Implementar Página de Blog | Frontend | 10h |
| 3.21 | Implementar Detalle de Blog | Frontend | 8h |
| 3.22 | Implementar Página de Eventos | Frontend | 8h |
| 3.23 | Implementar Página de Contacto | Frontend | 8h |
| 3.24 | Implementar Página Nosotros | Frontend | 8h |
| 3.25 | Implementar botón flotante WhatsApp | Frontend | 2h |
| 3.26 | Responsive design + pruebas móviles | Frontend | 16h |
| 3.27 | Animaciones y micro-interacciones | Frontend | 8h |
| 3.28 | Optimización de rendimiento (Lighthouse) | Frontend | 8h |
| 3.29 | Pruebas de integración frontend-backend | Ambos | 8h |

**Entregables:**
- Sitio público completo y funcional
- Diseño responsive premium
- Integración completa con APIs
- Animaciones y experiencia de usuario fluida

**Hitos:**
- Semana 5: Landing page completa con todas las secciones
- Semana 6: Catálogo + detalle de producto funcional
- Semana 7: Sitio público completo responsive

---

## Fase 4: Panel Administrativo (Semanas 8-10)

### Objetivo
Desarrollar el panel de administración completo.

### Tareas

| # | Tarea | Responsable | Estimación |
|---|-------|-------------|------------|
| 4.1 | Diseñar layout admin (sidebar + header) | Frontend | 8h |
| 4.2 | Implementar Login page | Frontend | 6h |
| 4.3 | Implementar Dashboard con stats | Frontend | 16h |
| 4.4 | Implementar HTTP interceptor (JWT + refresh) | Frontend | 6h |
| 4.5 | Implementar Route guards | Frontend | 4h |
| 4.6 | Implementar Productos: Listado | Frontend | 12h |
| 4.7 | Implementar Productos: Formulario creación/edición | Frontend | 16h |
| 4.8 | Implementar Productos: Upload imágenes | Frontend | 8h |
| 4.9 | Implementar Categorías CRUD | Frontend | 8h |
| 4.10 | Implementar Etiquetas CRUD | Frontend | 4h |
| 4.11 | Implementar Blog: Listado | Frontend | 8h |
| 4.12 | Implementar Blog: Editor de contenido | Frontend | 16h |
| 4.13 | Implementar Blog: Programación + versiones | Frontend | 8h |
| 4.14 | Implementar Eventos CRUD | Frontend | 10h |
| 4.15 | Implementar Banners CRUD | Frontend | 8h |
| 4.16 | Implementar Carruseles CRUD | Frontend | 8h |
| 4.17 | Implementar Gestión Multimedia | Frontend | 12h |
| 4.18 | Implementar Bandeja de Mensajes | Frontend | 10h |
| 4.19 | Implementar Gestión de Usuarios | Frontend | 10h |
| 4.20 | Implementar Configuración del Sitio | Frontend | 8h |
| 4.21 | Implementar Gestión de Navegación | Frontend | 6h |
| 4.22 | Pruebas de integración admin APIs | Ambos | 12h |
| 4.23 | Pruebas de roles y permisos | Ambos | 8h |
| 4.24 | Corrección de bugs | Frontend | 8h |

**Entregables:**
- Panel administrativo completo
- CRUD de todas las entidades
- Gestión de roles y usuarios
- Dashboard con indicadores

**Hitos:**
- Semana 8: Dashboard + CRUD productos funcional
- Semana 9: CRUD contenido (blog, eventos, banners) funcional
- Semana 10: Panel admin completo con usuarios y config

---

## Fase 5: Analítica y Reportes (Semanas 11-12)

### Objetivo
Implementar sistema de métricas y generación de reportes.

### Tareas

| # | Tarea | Responsable | Estimación |
|---|-------|-------------|------------|
| 5.1 | Implementar registro de visitas (backend) | Backend | 8h |
| 5.2 | Implementar detección de dispositivo/browser/OS | Backend | 6h |
| 5.3 | Implementar geolocalización por IP | Backend | 6h |
| 5.4 | Implementar agregación diaria y mensual | Backend | 8h |
| 5.5 | Implementar tracking en frontend público | Frontend | 6h |
| 5.6 | Implementar Dashboard de analítica (admin) | Frontend | 16h |
| 5.7 | Gráficos: visitas por día/mes | Frontend | 8h |
| 5.8 | Gráficos: productos más vistos/likeados | Frontend | 6h |
| 5.9 | Tablas: top productos, top posts, dispositivos | Frontend | 8h |
| 5.10 | Implementar generación de reportes PDF | Backend | 12h |
| 5.11 | Implementar generación de reportes Excel | Backend | 8h |
| 5.12 | Implementar exportación (frontend) | Frontend | 6h |
| 5.13 | Filtros de fecha en analítica | Frontend | 4h |
| 5.14 | Pruebas de precisión de métricas | Ambos | 8h |

**Entregables:**
- Sistema de analytics funcional
- Dashboard de métricas con gráficos
- Reportes exportables PDF y Excel
- Tracking preciso de visitas

**Hitos:**
- Semana 11: Tracking de visitas y dashboard funcional
- Semana 12: Reportes PDF/Excel exportables

---

## Fase 6: Producción y Optimización (Semanas 13-14)

### Objetivo
Preparar la plataforma para despliegue en producción.

### Tareas

| # | Tarea | Responsable | Estimación |
|---|-------|-------------|------------|
| 6.1 | Configurar certificados SSL (Let's Encrypt) | DevOps | 4h |
| 6.2 | Hardening de seguridad Nginx | DevOps | 6h |
| 6.3 | Configurar backup automático BD | DevOps | 4h |
| 6.4 | Configurar backup de archivos (MinIO) | DevOps | 4h |
| 6.5 | Optimizar consultas SQL + índices | Backend | 8h |
| 6.6 | Optimizar imágenes (compresión, webp) | Frontend | 6h |
| 6.7 | Configurar lazy loading + code splitting | Frontend | 6h |
| 6.8 | Pruebas de carga (JMeter) | QA | 16h |
| 6.9 | Corrección de bugs de rendimiento | Ambos | 12h |
| 6.10 | Pruebas de seguridad (OWASP top 10) | QA | 16h |
| 6.11 | Corrección de vulnerabilidades | Ambos | 8h |
| 6.12 | Documentación final de usuario | Tech Writer | 12h |
| 6.13 | Documentación técnica (README, deploy) | Tech Writer | 8h |
| 6.14 | Pruebas de aceptación (UAT) | PO | 16h |
| 6.15 | Deploy a producción | DevOps | 8h |
| 6.16 | Monitoreo post-deploy | DevOps | 8h |

**Entregables:**
- Plataforma en producción
- SSL/HTTPS configurado
- Backups automáticos
- Pruebas de carga y seguridad aprobadas
- Documentación completa

**Hitos:**
- Semana 13: Plataforma preparada para producción
- Semana 14: GO-LIVE + monitoreo

---

## Resumen de Recursos

### Equipo Recomendado

| Rol | Cantidad | Dedicación |
|-----|----------|------------|
| Project Manager / PO | 1 | Part-time |
| UX/UI Designer | 1 | Fase 1-3 |
| Backend Developer (Spring) | 2 | Fase 1-5 |
| Frontend Developer (Angular) | 2 | Fase 1-5 |
| DevOps Engineer | 1 | Fase 1, 6 |
| QA Engineer | 1 | Fase 4-6 |

### Estimación de Horas por Fase

| Fase | Backend | Frontend | UX/UI | DevOps | QA | Total |
|------|---------|----------|-------|--------|----|-------|
| Fase 1 | 52h | 18h | 0h | 16h | 0h | 86h |
| Fase 2 | 164h | 0h | 0h | 0h | 8h | 172h |
| Fase 3 | 0h | 188h | 28h | 0h | 8h | 224h |
| Fase 4 | 0h | 176h | 0h | 0h | 20h | 196h |
| Fase 5 | 48h | 48h | 0h | 0h | 8h | 104h |
| Fase 6 | 8h | 12h | 0h | 26h | 32h | 78h |
| **Total** | **272h** | **442h** | **28h** | **42h** | **76h** | **860h** |

### Dependencias entre Fases

```
Fase 1 (Infraestructura)
    │
    ▼
Fase 2 (APIs Core) ◄────── Depende de BD y seguridad
    │
    ├──────────────────────────┐
    ▼                          ▼
Fase 3 (Frontend Público)    Fase 4 (Panel Admin)
    │                          │
    └──────────┬───────────────┘
               ▼
          Fase 5 (Analítica) ◄── Depende de Fase 3 + 4
               │
               ▼
          Fase 6 (Producción) ◄── Depende de todo lo anterior
```

### Riesgos y Mitigación

| Riesgo | Impacto | Probabilidad | Mitigación |
|--------|---------|-------------|------------|
| Cambios de requisitos | Alto | Media | Sprints cortos, reuniones semanales |
| Curva de aprendizaje Angular 18 | Medio | Alta | Capacitación previa, pair programming |
| Rendimiento BD con analytics | Alto | Baja | Índices, agregaciones programadas |
| Seguridad JWT | Alto | Baja | Buenas prácticas, revisión de código |
| Disponibilidad del equipo | Medio | Media | Documentación, código limpio |
| Integración MinIO | Medio | Baja | Fallback a almacenamiento local |
