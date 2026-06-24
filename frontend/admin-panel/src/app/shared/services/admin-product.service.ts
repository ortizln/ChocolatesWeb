import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Product, ProductFormData } from '../models';

@Injectable({ providedIn: 'root' })
export class AdminProductService {
  private apiUrl = `${environment.apiUrl}/admin/productos`;

  constructor(private http: HttpClient) {}

  private mapProduct(p: any): Product {
    return {
      id: p.id,
      nombre: p.name,
      slug: p.slug || '',
      descripcion: p.fullDescription || '',
      descripcionCorta: p.shortDescription || '',
      precio: p.referencePrice,
      precioOferta: p.discountPrice,
      stock: p.stock ?? 0,
      sku: p.code,
      imagenUrl: p.images?.find((i: any) => i.isPrimary)?.imageUrl || '',
      imagenes: p.images?.map((i: any) => i.imageUrl) || [],
      categoriaId: p.categoryId,
      categoriaNombre: p.categoryName || '',
      tags: p.tags?.map((t: any) => t.id) || [],
      ingredientes: p.ingredients || '',
      peso: p.weightGrams?.toString() || '',
      activo: p.status === 'ACTIVE',
      destacado: p.isFeatured || false,
      fechaCreacion: p.createdAt || '',
      fechaActualizacion: p.updatedAt || ''
    };
  }

  private toRequest(f: any): any {
    const r: any = { currency: 'PEN' };
    if (f.nombre !== undefined) r.name = f.nombre;
    if (f.sku !== undefined) r.code = f.sku;
    if (f.categoriaId !== undefined) r.categoryId = f.categoriaId;
    if (f.descripcionCorta !== undefined) r.shortDescription = f.descripcionCorta;
    if (f.descripcion !== undefined) r.fullDescription = f.descripcion;
    if (f.ingredientes !== undefined) r.ingredients = f.ingredientes;
    if (f.precio !== undefined) r.referencePrice = f.precio;
    if (f.precioOferta !== undefined) r.discountPrice = f.precioOferta || null;
    if (f.stock !== undefined) r.stock = f.stock;
    if (f.peso !== undefined) r.weightGrams = f.peso ? parseFloat(f.peso) : null;
    if (f.destacado !== undefined) r.isFeatured = f.destacado;
    if (f.activo !== undefined) r.status = f.activo ? 'ACTIVE' : 'INACTIVE';
    if (f.tags !== undefined) r.tagIds = f.tags;
    return r;
  }

  getProducts(params?: { search?: string; activo?: boolean; categoriaId?: number; page?: number; size?: number }): Observable<any> {
    let httpParams = new HttpParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          httpParams = httpParams.set(key, value.toString());
        }
      });
    }
    return this.http.get(this.apiUrl, { params: httpParams }).pipe(
      map((res: any) => {
        const d = res.data || res;
        return {
          content: (d.content || []).map((p: any) => this.mapProduct(p)),
          totalElements: d.totalElements || 0,
          page: d.page || 0,
          size: d.size || 0,
          totalPages: d.totalPages || 0,
          last: d.last !== undefined ? d.last : true
        };
      })
    );
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get(`${this.apiUrl}/${id}`).pipe(
      map((res: any) => this.mapProduct(res.data || res))
    );
  }

  createProduct(data: ProductFormData): Observable<Product> {
    return this.http.post(this.apiUrl, this.toRequest(data)).pipe(
      map((res: any) => this.mapProduct(res.data || res))
    );
  }

  updateProduct(id: number, data: Partial<ProductFormData>): Observable<Product> {
    return this.http.put(`${this.apiUrl}/${id}`, this.toRequest(data)).pipe(
      map((res: any) => this.mapProduct(res.data || res))
    );
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      map(() => undefined)
    );
  }

  toggleStatus(id: number): Observable<Product> {
    return this.http.patch(`${this.apiUrl}/${id}/status`, {}).pipe(
      map((res: any) => this.mapProduct(res.data || res))
    );
  }

  uploadImage(id: number, file: File): Observable<{ imagenUrl: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/${id}/imagen`, formData).pipe(
      map((res: any) => {
        const d = res.data || res;
        return { imagenUrl: d.imageUrl || d.imagenUrl || '' };
      })
    );
  }

  uploadGalleryImages(id: number, files: File[]): Observable<{ imagenes: string[] }> {
    const formData = new FormData();
    files.forEach(f => formData.append('files', f));
    return this.http.post(`${this.apiUrl}/${id}/galeria`, formData).pipe(
      map((res: any) => {
        const d = res.data || res;
        return { imagenes: d.images?.map((i: any) => i.imageUrl) || d.imagenes || [] };
      })
    );
  }
}
