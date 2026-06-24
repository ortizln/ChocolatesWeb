import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Product, PagedResponse } from '../models';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private api: ApiService) {}

  private mapProduct(p: any): Product {
    const primaryImage = p.images?.find((i: any) => i.isPrimary);
    return {
      id: p.id,
      name: p.name,
      slug: p.slug || '',
      code: p.code,
      description: p.fullDescription || '',
      shortDescription: p.shortDescription || '',
      price: p.referencePrice,
      discountPrice: p.discountPrice,
      imageUrl: primaryImage?.imageUrl || p.images?.[0]?.imageUrl || '',
      images: p.images?.map((i: any) => i.imageUrl) || [],
      categoryId: p.categoryId,
      categoryName: p.categoryName || '',
      tags: (p.tags || []).map((t: any) => ({ id: t.id, name: t.name, slug: t.slug })),
      ingredients: p.ingredients ? p.ingredients.split(',').map((s: string) => s.trim()) : [],
      nutritionalInfo: p.nutritionalInfo ? (typeof p.nutritionalInfo === 'string' ? JSON.parse(p.nutritionalInfo) : p.nutritionalInfo) : null,
      weight: p.weightGrams ? `${p.weightGrams}g` : '',
      isFeatured: p.isFeatured || false,
      isActive: p.status === 'ACTIVE',
      likesCount: p.likeCount || 0,
      viewsCount: p.viewCount || 0,
      createdAt: p.createdAt || '',
      updatedAt: p.updatedAt || ''
    };
  }

  private mapPaged(res: any): PagedResponse<Product> {
    const d = res.data || res;
    const content = (d.content || []).map((p: any) => this.mapProduct(p));
    return {
      success: res.success !== undefined ? res.success : true,
      message: res.message || '',
      data: content,
      totalCount: d.totalElements || 0,
      page: d.page || 0,
      pageSize: d.size || 0,
      totalPages: d.totalPages || 0,
      hasPreviousPage: (d.page || 0) > 0,
      hasNextPage: !d.last
    };
  }

  getProducts(params?: Record<string, string | number | boolean>): Observable<PagedResponse<Product>> {
    return this.api.getWithParams<any>('products/public', params || {}).pipe(
      map(res => this.mapPaged(res))
    );
  }

  getFeatured(): Observable<Product[]> {
    return this.api.get<any>('products/public/featured').pipe(
      map((res: any) => {
        const list = Array.isArray(res) ? res : res.data || res;
        return (list || []).map((p: any) => this.mapProduct(p));
      })
    );
  }

  getBySlug(slug: string): Observable<Product> {
    return this.api.get<any>(`products/public/${slug}`).pipe(
      map(res => this.mapProduct(res.data || res))
    );
  }

  likeProduct(id: number): Observable<Product> {
    return this.api.post<any>(`products/public/${id}/like`, {}).pipe(
      map(res => this.mapProduct(res.data || res))
    );
  }

  getRelated(id: number, limit?: number): Observable<Product[]> {
    const params: Record<string, string | number | boolean> = {};
    if (limit) params['limit'] = limit;
    return this.api.getWithParams<any>(`products/public/${id}/related`, params).pipe(
      map((res: any) => {
        const list = Array.isArray(res) ? res : res.data || res;
        return (list || []).map((p: any) => this.mapProduct(p));
      })
    );
  }

  getCategories(): Observable<any[]> {
    return this.api.get<any>('public/categories').pipe(
      map((res: any) => {
        const list = Array.isArray(res) ? res : res.data || res;
        return (list || []).map((c: any) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          description: c.description || '',
          imageUrl: c.imageUrl || '',
          productCount: c.productCount || 0,
          isActive: c.isActive !== undefined ? c.isActive : true
        }));
      })
    );
  }

  search(query: string, params?: Record<string, string | number | boolean>): Observable<PagedResponse<Product>> {
    const allParams = { q: query, ...params };
    return this.api.getWithParams<any>('products/public/search', allParams).pipe(
      map(res => this.mapPaged(res))
    );
  }
}
