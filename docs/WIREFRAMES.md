# Wireframes y Diseño UX/UI - Chocolates Web

## Brand Guidelines

### Paleta de Colores
```
Primario:    #4A0E4E  (Púrpura chocolate)
Secundario:  #D4A017  (Oro)
Oscuro:      #2C1810  (Marrón oscuro)
Claro:       #F8F5F0  (Crema)
Acento:      #8B4513  (Saddle brown)
Éxito:       #2E7D32  (Verde)
```

### Tipografía
- **Headings:** Playfair Display (serif) - Elegancia premium
- **Body:** Raleway (sans-serif) - Legibilidad moderna
- **Admin:** Inter (sans-serif) - Claridad funcional

### Tono de Marca
Premium, artesanal, cálido, acogedor. Comunicación que evoca tradición y calidad.

---

## Wireframes - Sitio Público

### 1. Landing Page (Home)

```
┌──────────────────────────────────────────────────────────┐
│ [HEADER]                                                 │
│  Logo        Inicio  Productos  Galería  Blog  Contacto  │
├──────────────────────────────────────────────────────────┤
│ ┌────────────────────────────────────────────────────┐   │
│ │              HERO BANNER                           │   │
│ │   "El placer del chocolate artesanal"              │   │
│ │   [CTA: Ver Productos]  [CTA: Conócenos]          │   │
│ │                                                    │   │
│ │   ○ ○ ○ ○ ○ (indicadores slider)                   │   │
│ └────────────────────────────────────────────────────┘   │
├──────────────────────────────────────────────────────────┤
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐         │
│ │ Nuestra │ │Misión   │ │Visión   │ │Valores  │         │
│ │Historia │ │         │ │         │ │         │         │
│ └─────────┘ └─────────┘ └─────────┘ └─────────┘         │
├──────────────────────────────────────────────────────────┤
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐  │
│ │Prod 1│ │Prod 2│ │Prod 3│ │Prod 4│ │Prod 5│ │Prod 6│  │
│ │      │ │      │ │      │ │      │ │      │ │      │  │
│ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘  │
│              [←] Productos Destacados [→]                │
├──────────────────────────────────────────────────────────┤
│ ┌────────────────────────────────────────────────────┐   │
│ │   VIDEO PROMOCIONAL (YouTube embed)                │   │
│ └────────────────────────────────────────────────────┘   │
├──────────────────────────────────────────────────────────┤
│ ┌──────────┐ ┌──────────┐ ┌──────────┐                   │
│ │Testimonio│ │Testimonio│ │Testimonio│                   │
│ │   ★★★★★  │ │   ★★★★★  │ │   ★★★★★  │                   │
│ └──────────┘ └──────────┘ └──────────┘                   │
├──────────────────────────────────────────────────────────┤
│   👥 12,458 visitantes han explorado nuestros productos  │
├──────────────────────────────────────────────────────────┤
│ ┌────────────────────────────────────────────────────┐   │
│ │ Blog: Últimas noticias (3 cards)                   │   │
│ └────────────────────────────────────────────────────┘   │
├──────────────────────────────────────────────────────────┤
│ ┌────────────────────────────────────────────────────┐   │
│ │ Eventos: Próximas ferias y degustaciones           │   │
│ └────────────────────────────────────────────────────┘   │
├──────────────────────────────────────────────────────────┤
│ [WhatsApp] [Facebook] [Instagram] [YouTube] [TikTok]     │
├──────────────────────────────────────────────────────────┤
│ [FOOTER] Logo | Links | Contacto | Newsletter            │
└──────────────────────────────────────────────────────────┘
```

### 2. Catálogo de Productos

```
┌──────────────────────────────────────────────────────────┐
│ [HEADER]                                                 │
├──────────────────────────────────────────────────────────┤
│ [Breadcrumb: Inicio > Productos]                         │
│                                                          │
│ ┌─────────────┐ ┌──────────────────────────────────┐     │
│ │  FILTROS    │ │  [🔍 Buscar productos...]        │     │
│ │             │ │                                   │     │
│ │ Categorías  │ │  ┌──────┐ ┌──────┐ ┌──────┐     │     │
│ │ ☑ Todas    │ │  │Prod 1│ │Prod 2│ │Prod 3│     │     │
│ │ ☐ Tradic.. │ │  │      │ │      │ │      │     │     │
│ │ ☐ Rellenos │ │  │$25.90│ │$32.00│ │$18.50│     │     │
│ │ ☐ Orgánicos│ │  │ ❤ 23 │ │ ❤ 45 │ │ ❤ 12 │     │     │
│ │ ☐ Bombones │ │  └──────┘ └──────┘ └──────┘     │     │
│ │ ☐ Tabletas │ │  ┌──────┐ ┌──────┐ ┌──────┐     │     │
│ │ ☐ Regalos  │ │  │Prod 4│ │Prod 5│ │Prod 6│     │     │
│ │             │ │  │      │ │      │ │      │     │     │
│ │ Precio      │ │  └──────┘ └──────┘ └──────┘     │     │
│ │ [---●---]   │ │                                   │     │
│ │             │ │  [< 1 2 3 4 >]  Paginación       │     │
│ └─────────────┘ └──────────────────────────────────┘     │
├──────────────────────────────────────────────────────────┤
│ [FOOTER]                                                 │
└──────────────────────────────────────────────────────────┘
```

### 3. Detalle de Producto

```
┌──────────────────────────────────────────────────────────┐
│ [HEADER]                                                 │
├──────────────────────────────────────────────────────────┤
│ [Breadcrumb: Inicio > Productos > Chocolate Orgánico]    │
│                                                          │
│ ┌───────────────┐ ┌────────────────────────────────┐     │
│ │               │ │ NOMBRE: Chocolate Orgánico 70%  │     │
│ │  IMAGEN       │ │ Código: CH-ORG-001             │     │
│ │  PRINCIPAL    │ │ Categoría: Orgánicos            │     │
│ │               │ │ ★ Precio: S/ 25.90              │     │
│ │               │ │                                 │     │
│ │ ┌─┐ ┌─┐ ┌─┐ │ │ Descripción:                    │     │
│ │ │ │ │ │ │ │ │ │ Chocolate oscuro elaborado...    │     │
│ │ └─┘ └─┘ └─┘ │ │                                 │     │
│ │  miniaturas   │ │ [❤ 45 Likes]  [Compartir]      │     │
│ └───────────────┘ │                                 │     │
│                   │ [INGREDIENTES] [INFO NUTRICIONAL]│     │
│                   │ ┌─┐ Pasta de cacao...          │     │
│                   │ ┌─┐ Manteca de cacao...         │     │
│                   └────────────────────────────────┘     │
│                                                          │
│ PRODUCTOS RELACIONADOS:                                  │
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                     │
│ │Rel 1 │ │Rel 2 │ │Rel 3 │ │Rel 4 │                     │
│ └──────┘ └──────┘ └──────┘ └──────┘                     │
├──────────────────────────────────────────────────────────┤
│ [FOOTER]                                                 │
└──────────────────────────────────────────────────────────┘
```

### 4. Blog / Noticias

```
┌──────────────────────────────────────────────────────────┐
│ [HEADER]                                                 │
├──────────────────────────────────────────────────────────┤
│ Artículos Recientes                                      │
│                                                          │
│ ┌────────────────────────────────────────────────────┐   │
│ │ [IMG]  Título del Artículo                         │   │
│ │        Resumen del artículo...                     │   │
│ │        📅 15 Ene 2024   👤 Admin   👁 234          │   │
│ └────────────────────────────────────────────────────┘   │
│ ┌────────────────────────────────────────────────────┐   │
│ │ [IMG]  Otro Artículo...                            │   │
│ └────────────────────────────────────────────────────┘   │
│ ┌────────────────────────────────────────────────────┐   │
│ │ [IMG]  Y otro más...                               │   │
│ └────────────────────────────────────────────────────┘   │
│                                                          │
│ [< 1 2 3 >]                                              │
├──────────────────────────────────────────────────────────┤
│ [FOOTER]                                                 │
└──────────────────────────────────────────────────────────┘
```

---

## Wireframes - Panel Administrativo

### 1. Login

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│                    ┌──────────────────┐                   │
│                    │  Chocolates Web  │                   │
│                    │  Panel Admin     │                   │
│                    │                  │                   │
│                    │  👤 Usuario      │                   │
│                    │  [____________]  │                   │
│                    │  🔒 Contraseña   │                   │
│                    │  [____________]  │                   │
│                    │                  │                   │
│                    │  [INICIAR SESIÓN]│                   │
│                    └──────────────────┘                   │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

### 2. Dashboard

```
┌──────────────────────────────────────────────────────────┐
│ [SIDEBAR]                │ [HEADER]  Admin  🔔 👤       │
│                          ├──────────────────────────────│
│ ╳ Dashboard              │ Dashboard                    │
│ ╳ Productos              │                              │
│ ╳ Categorías             │ ┌──────┐┌──────┐┌──────┐    │
│ ╳ Blog                   │ │Visitas││Prod. ││Noticias   │
│ ╳ Eventos                │ │ 1,234 ││ 45   ││ 23    │    │
│ ╳ Mensajes               │ └──────┘└──────┘└──────┘    │
│ ╳ Usuarios               │ ┌──────┐┌──────┐            │
│ ╳ Analítica              │ │Event.││Usuarios            │
│                          │ │ 3    ││ 5     │            │
│                          │ └──────┘└──────┘             │
│                          │                              │
│                          │ ┌─────────────────────┐      │
│                          │ │  Gráfico: Visitas    │      │
│                          │ │  │││││││││││││││││││      │
│                          │ └─────────────────────┘      │
│                          │                              │
│                          │ ┌─────────┐ ┌─────────┐      │
│                          │ │Top Prod │ │Top Posts│      │
│                          │ └─────────┘ └─────────┘      │
└──────────────────────────────────────────────────────────┘
```

### 3. Listado de Productos (Admin)

```
┌──────────────────────────────────────────────────────────┐
│ [SIDEBAR]                │ [HEADER]                      │
│                          ├──────────────────────────────│
│ ╳ Dashboard              │ Productos  [+ Nuevo Producto] │
│ ╳ ████████████          │                              │
│ ╳ Categorías             │ [🔍 Buscar...]  [Filtrar ▼]  │
│ ╳ Blog                   │                              │
│ ╳ Eventos                │ ┌──────────────────────────┐ │
│ ╳ Mensajes               │ │ Código  Nombre  Precio   │ │
│ ╳ Usuarios               │ │ CH-001  Prod 1  S/25     │ │
│ ╳ Analítica              │ │ CH-002  Prod 2  S/32     │ │
│                          │ │ CH-003  Prod 3  S/18     │ │
│                          │ │ ...                      │ │
│                          │ └──────────────────────────┘ │
│                          │                              │
│                          │ [< 1 2 3 4 5 >]  45 registros│
└──────────────────────��───────────────────────────────────┘
```

### 4. Formulario de Producto

```
┌──────────────────────────────────────────────────────────┐
│ [SIDEBAR]                │ [HEADER]                      │
│                          ├──────────────────────────────│
│                          │ Nuevo Producto                │
│                          │                              │
│                          │ ┌───────────────────────────┐│
│                          │ │ Nombre*     [____________]││
│                          │ │ Código*     [____________]││
│                          │ │ Categoría   [▼ Seleccionar]││
│                          │ │ Precio      [_____]  Soles ││
│                          │ │ Stock       [_____]        ││
│                          │ │ Estado      [● Activo]     ││
│                          │ │ Descripción:               ││
│                          │ │ ┌─────────────────────┐   ││
│                          │ │ │ Rich Text Editor    │   ││
│                          │ │ └─────────────────────┘   ││
│                          │ │ Ingredientes:             ││
│                          │ │ ┌─────────────────────┐   ││
│                          │ │ │ Text area...         │   ││
│                          │ │ └─────────────────────┘   ││
│                          │ │                           ││
│                          │ │ Imágenes:  [+ Agregar]    ││
│                          │ │ ┌──┐ ┌──┐ ┌──┐           ││
│                          │ │ │  │ │  │ │  │           ││
│                          │ │ └──┘ └──┘ └──┘           ││
│                          │ │                           ││
│                          │ │ Etiquetas:                ││
│                          │ │ [Orgánico] [Premium] [×]  ││
│                          │ │                           ││
│                          │ │ [💾 Guardar]  [✕ Cancelar]││
│                          │ └───────────────────────────┘│
└──────────────────────────────────────────────────────────┘
```

### 5. Mensajes de Contacto

```
┌──────────────────────────────────────────────────────────┐
│ [SIDEBAR]                │ [HEADER]                      │
│                          ├──────────────────────────────│
│ ╳ Dashboard              │ Mensajes de Contacto          │
│ ╳ Productos              │                              │
│ ╳ Categorías             │ [📥 Pendientes] [👁 Leídos]  │
│ ╳ Blog                   │ [✅ Respondidos] [🔒 Cerrados]│
│ ╳ Eventos                │                              │
│ ╳ █████████             │ ┌──────────────────────────┐ │
│ ╳ Usuarios               │ │ De: Juan Pérez           │ │
│ ╳ Analítica              │ │ Asunto: Consulta         │ │
│                          │ │ 📅 15/01/2024            │ │
│                          │ │ 💬 Buenos días, quisiera │ │
│                          │ │ saber si hacen envíos... │ │
│                          │ │                          │ │
│                          │ │ ┌──────────────────┐     │ │
│                          │ │ │ [Responder...]    │     │ │
│                          │ │ └──────────────────┘     │ │
│                          │ └──────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```

### 6. Analítica

```
┌──────────────────────────────────────────────────────────┐
│ [SIDEBAR]                │ [HEADER]                      │
│                          ├──────────────────────────────│
│ ╳ Dashboard              │ Analítica y Reportes          │
│ ╳ Productos              │                              │
│ ╳ Categorías             │ [📅 Fecha Desde] [📅 Hasta]  │
│ ╳ Blog                   │ [📊 PDF] [📊 Excel]          │
│ ╳ Eventos                │                              │
│ ╳ Mensajes               │ ┌──────────────────────────┐ │
│ ╳ Usuarios               │ │ Visitas por Día          │ │
│ ╳ ████████              │ │ ││││││││││││││││││││││││  │ │
│                          │ └──────────────────────────┘ │
│                          │                              │
│                          │ ┌──────────┐ ┌──────────┐   │
│                          │ │Disposit. │ │Navegador │   │
│                          │ │ 🖥 65%   │ │Chrome 70%│   │
│                          │ │ 📱 30%   │ │Firefox  │   │
│                          │ │ 📟 5%    │ │Safari   │   │
│                          │ └──────────┘ └──────────┘   │
│                          │                              │
│                          │ ┌──────────────────────────┐ │
│                          │ │ Top 10 Productos          │ │
│                          │ │ 1. Prod A - 1,234 vistas │ │
│                          │ │ 2. Prod B - 987 vistas   │ │
│                          │ └──────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```

---

## Diseño Responsivo

### Breakpoints
| Dispositivo | Ancho |
|-------------|-------|
| Móvil | < 768px |
| Tablet | 768px - 1024px |
| Desktop | > 1024px |

### Adaptaciones Mobile
- Header: Logo + menú hamburguesa
- Sidebar admin: Menú colapsable
- Catálogo: 1 columna (mobile) → 2 (tablet) → 3-4 (desktop)
- Footer: Apilado vertical en mobile
- Formularios: Ancho completo en mobile
- Tablas: Scroll horizontal en mobile

---

## Experiencia de Usuario (UX)

### Flujos Principales

**Visitante → Cliente:**
1. Landing Page → Explora productos
2. Ve detalle, da like
3. Navega a catálogo, filtra por categoría
4. Contacta por formulario o WhatsApp

**Admin → Gestión:**
1. Login → Dashboard (visión general)
2. Navega a sección específica
3. CRUD de contenido
4. Revisa analíticas y exporta reportes

### Micro-interacciones
- Cards con hover elevación
- Botones con efecto de profundidad
- Loading skeletons en tablas
- Toast notifications para acciones CRUD
- Transiciones suaves entre rutas
- Scroll animado (AOS) en landing page
- Contador animado de visitas

### Estados
| Estado | Acción |
|--------|--------|
| Loading | Skeleton/spinner |
| Empty | Mensaje + CTA |
| Error | Mensaje claro + reintentar |
| Success | Toast/notificación |
