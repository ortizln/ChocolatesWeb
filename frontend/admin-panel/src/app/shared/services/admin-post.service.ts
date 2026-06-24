import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Post, PostFormData } from '../models';

@Injectable({ providedIn: 'root' })
export class AdminPostService {
  private apiUrl = `${environment.apiUrl}/admin/posts`;

  constructor(private http: HttpClient) {}

  private mapPost(p: any): Post {
    return {
      id: p.id,
      titulo: p.title,
      slug: p.slug || '',
      contenido: p.content || '',
      extracto: p.summary || '',
      imagenDestacada: p.featuredImage || '',
      autor: p.authorName || '',
      categoria: p.postType || '',
      tags: [],
      estado: p.status === 'PUBLISHED' ? 'PUBLICADO' : p.status === 'SCHEDULED' ? 'PROGRAMADO' : 'BORRADOR',
      fechaPublicacion: p.publishedAt || p.createdAt || '',
      fechaProgramacion: p.scheduledAt || undefined,
      fechaCreacion: p.createdAt || ''
    };
  }

  private toRequest(f: any): any {
    const r: any = {};
    if (f.titulo !== undefined) r.title = f.titulo;
    if (f.contenido !== undefined) r.content = f.contenido;
    if (f.extracto !== undefined) r.summary = f.extracto;
    if (f.imagenDestacada !== undefined) r.featuredImage = f.imagenDestacada;
    if (f.categoria !== undefined) r.postType = f.categoria;
    if (f.estado !== undefined) {
      r.status = f.estado === 'PUBLICADO' ? 'PUBLISHED' : f.estado === 'PROGRAMADO' ? 'SCHEDULED' : 'DRAFT';
    }
    if (f.fechaProgramacion !== undefined) r.scheduledAt = f.fechaProgramacion;
    return r;
  }

  getPosts(params?: { search?: string; estado?: string; page?: number; size?: number }): Observable<any> {
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
          content: (d.content || []).map((p: any) => this.mapPost(p)),
          totalElements: d.totalElements || 0,
          page: d.page || 0,
          size: d.size || 0,
          totalPages: d.totalPages || 0,
          last: d.last !== undefined ? d.last : true
        };
      })
    );
  }

  getPost(id: number): Observable<Post> {
    return this.http.get(`${this.apiUrl}/${id}`).pipe(
      map((res: any) => this.mapPost(res.data || res))
    );
  }

  createPost(data: PostFormData): Observable<Post> {
    return this.http.post(this.apiUrl, this.toRequest(data)).pipe(
      map((res: any) => this.mapPost(res.data || res))
    );
  }

  updatePost(id: number, data: Partial<PostFormData>): Observable<Post> {
    return this.http.put(`${this.apiUrl}/${id}`, this.toRequest(data)).pipe(
      map((res: any) => this.mapPost(res.data || res))
    );
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      map(() => undefined)
    );
  }

  uploadImage(id: number, file: File): Observable<{ imagenUrl: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/${id}/imagen`, formData).pipe(
      map((res: any) => {
        const d = res.data || res;
        return { imagenUrl: d.imageUrl || d.imagenUrl || d.featuredImage || '' };
      })
    );
  }
}
