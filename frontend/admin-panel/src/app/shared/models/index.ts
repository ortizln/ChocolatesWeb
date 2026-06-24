export interface User {
  id: number;
  username: string;
  email: string;
  nombre: string;
  role: 'ADMIN' | 'EDITOR' | 'VIEWER';
  activo: boolean;
  fechaCreacion?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  usuario: User;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface Product {
  id: number;
  nombre: string;
  slug: string;
  descripcion: string;
  descripcionCorta: string;
  precio: number;
  precioOferta?: number;
  stock: number;
  sku: string;
  imagenUrl: string;
  imagenes: string[];
  categoriaId: number;
  categoriaNombre?: string;
  tags: number[];
  ingredientes: string;
  peso: string;
  activo: boolean;
  destacado: boolean;
  fechaCreacion: string;
  fechaActualizacion: string;
}

export interface ProductFormData {
  nombre: string;
  descripcion: string;
  descripcionCorta: string;
  precio: number;
  precioOferta?: number;
  stock: number;
  sku: string;
  categoriaId: number;
  tags: number[];
  ingredientes: string;
  peso: string;
  activo: boolean;
  destacado: boolean;
}

export interface Categoria {
  id: number;
  nombre: string;
  slug: string;
  descripcion: string;
  imagenUrl: string;
  padreId: number | null;
  hijos?: Categoria[];
  activo: boolean;
}

export interface Tag {
  id: number;
  nombre: string;
  slug: string;
  activo: boolean;
}

export interface Banner {
  id: number;
  titulo: string;
  subtitulo: string;
  imagenUrl: string;
  linkUrl: string;
  orden: number;
  activo: boolean;
  fechaInicio: string;
  fechaFin: string;
}

export interface Carousel {
  id: number;
  nombre: string;
  items: CarouselItem[];
  activo: boolean;
}

export interface CarouselItem {
  id: number;
  titulo: string;
  descripcion: string;
  imagenUrl: string;
  linkUrl: string;
  orden: number;
  activo: boolean;
}

export interface Post {
  id: number;
  titulo: string;
  slug: string;
  contenido: string;
  extracto: string;
  imagenDestacada: string;
  autor: string;
  categoria: string;
  tags: string[];
  estado: 'BORRADOR' | 'PUBLICADO' | 'PROGRAMADO';
  fechaPublicacion: string;
  fechaProgramacion?: string;
  fechaCreacion: string;
}

export interface PostFormData {
  titulo: string;
  contenido: string;
  extracto: string;
  imagenDestacada: string;
  autor: string;
  categoria: string;
  tags: string[];
  estado: 'BORRADOR' | 'PUBLICADO' | 'PROGRAMADO';
  fechaProgramacion?: string;
}

export interface Evento {
  id: number;
  titulo: string;
  descripcion: string;
  contenido: string;
  imagenUrl: string;
  fechaInicio: string;
  fechaFin: string;
  hora: string;
  lugar: string;
  linkRegistro: string;
  activo: boolean;
  destacado: boolean;
  fechaCreacion: string;
}

export interface EventFormData {
  titulo: string;
  descripcion: string;
  contenido: string;
  imagenUrl: string;
  fechaInicio: string;
  fechaFin: string;
  hora: string;
  lugar: string;
  linkRegistro: string;
  activo: boolean;
  destacado: boolean;
}

export interface Message {
  id: number;
  nombre: string;
  email: string;
  telefono?: string;
  asunto: string;
  mensaje: string;
  leido: boolean;
  respondido: boolean;
  respuesta?: string;
  fechaEnvio: string;
}

export interface AnalyticsData {
  visitasHoy: number;
  visitasSemana: number;
  visitasMes: number;
  visitasPorDia: { fecha: string; visitas: number }[];
  visitasPorMes: { mes: string; visitas: number }[];
  likesPorProducto: { producto: string; likes: number }[];
  productosTop: { id: number; nombre: string; ventas: number }[];
  postsTop: { id: number; titulo: string; visitas: number }[];
  totalProductos: number;
  totalPosts: number;
  totalEventos: number;
  totalUsuarios: number;
  totalMensajes: number;
}

export interface GalleryImage {
  id: number;
  nombre: string;
  url: string;
  thumbnailUrl: string;
  alt: string;
  categoria: string;
  fileSize: number;
  subidoPor: string;
  fechaSubida: string;
}

export interface SiteSettings {
  id: number;
  sitioTitulo: string;
  sitioDescripcion: string;
  logoUrl: string;
  faviconUrl: string;
  emailContacto: string;
  telefonoContacto: string;
  direccion: string;
  redesSociales: { [key: string]: string };
  metaDescripcion: string;
  metaKeywords: string;
  googleAnalyticsId: string;
  mantenimiento: boolean;
}
