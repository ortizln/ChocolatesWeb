export interface Product {
  id: number;
  name: string;
  slug: string;
  code: string;
  description: string;
  shortDescription: string;
  price: number;
  discountPrice?: number;
  imageUrl: string;
  images: string[];
  categoryId: number;
  categoryName: string;
  tags: Tag[];
  ingredients: string[];
  nutritionalInfo: NutritionalInfo;
  weight: string;
  isFeatured: boolean;
  isActive: boolean;
  likesCount: number;
  viewsCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface NutritionalInfo {
  servingSize: string;
  calories: number;
  totalFat: string;
  saturatedFat: string;
  transFat: string;
  cholesterol: string;
  sodium: string;
  totalCarbohydrates: string;
  dietaryFiber: string;
  sugars: string;
  protein: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  productCount: number;
  isActive: boolean;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  imageUrl: string;
  author: string;
  authorAvatar: string;
  categoryId: number;
  categoryName: string;
  tags: Tag[];
  isFeatured: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Event {
  id: number;
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  eventDate: string;
  eventTime: string;
  location: string;
  locationUrl: string;
  type: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Banner {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  buttonText: string;
  order: number;
  isActive: boolean;
  createdAt: string;
}

export interface Carousel {
  id: number;
  name: string;
  items: CarouselItem[];
  isActive: boolean;
}

export interface CarouselItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  buttonText: string;
  order: number;
  isActive: boolean;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
  isActive: boolean;
  createdAt: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface MediaItem {
  id: number;
  title: string;
  description: string;
  url: string;
  thumbnailUrl: string;
  type: 'image' | 'video';
  albumId: number;
  albumName: string;
  isActive: boolean;
  createdAt: string;
}

export interface GalleryAlbum {
  id: number;
  name: string;
  slug: string;
  description: string;
  coverUrl: string;
  mediaCount: number;
  isActive: boolean;
  createdAt: string;
}

export interface SiteSetting {
  id: number;
  key: string;
  value: string;
  description: string;
}

export interface SocialLink {
  id: number;
  platform: string;
  url: string;
  icon: string;
  order: number;
  isActive: boolean;
}

export interface NavigationMenu {
  id: number;
  name: string;
  location: string;
  items: NavigationItem[];
  isActive: boolean;
}

export interface NavigationItem {
  id: number;
  title: string;
  url: string;
  target: string;
  order: number;
  children: NavigationItem[];
  isActive: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors: string[];
}

export interface PagedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  refreshToken: string;
  expiresAt: string;
}
