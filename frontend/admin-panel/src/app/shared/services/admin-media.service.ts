import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { GalleryImage } from '../models';

@Injectable({ providedIn: 'root' })
export class AdminMediaService {
  private apiUrl = `${environment.apiUrl}/admin/media`;

  constructor(private http: HttpClient) {}

  private mapImage(m: any): GalleryImage {
    return {
      id: m.id,
      nombre: m.fileName || m.originalFilename || '',
      url: m.url,
      thumbnailUrl: m.thumbnailUrl || m.url,
      alt: m.altText || '',
      categoria: m.fileType || m.mediaType || '',
      fileSize: m.fileSize || 0,
      subidoPor: m.createdByUser?.username || m.createdBy?.toString() || '',
      fechaSubida: m.createdAt || ''
    };
  }

  getImages(params?: { search?: string; categoria?: string; page?: number; size?: number }): Observable<any> {
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
        const list = Array.isArray(d) ? d : d.content || d;
        return {
          content: list.map((m: any) => this.mapImage(m)),
          totalElements: d.totalElements || list.length
        };
      })
    );
  }

  uploadImage(file: File, categoria?: string): Observable<GalleryImage> {
    const formData = new FormData();
    formData.append('file', file);
    if (categoria) formData.append('categoria', categoria);
    return this.http.post(`${this.apiUrl}/upload`, formData).pipe(
      map((res: any) => this.mapImage(res.data || res))
    );
  }

  uploadMultiple(files: File[], categoria?: string): Observable<GalleryImage[]> {
    const formData = new FormData();
    files.forEach(f => formData.append('files', f));
    if (categoria) formData.append('categoria', categoria);
    return this.http.post(`${this.apiUrl}/upload-multiple`, formData).pipe(
      map((res: any) => {
        const d = res.data || res;
        const list = Array.isArray(d) ? d : [];
        return list.map((m: any) => this.mapImage(m));
      })
    );
  }

  deleteImage(id: number): Observable<void> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      map(() => undefined)
    );
  }

  updateImage(id: number, data: Partial<GalleryImage>): Observable<GalleryImage> {
    return this.http.put(`${this.apiUrl}/${id}`, data).pipe(
      map((res: any) => this.mapImage(res.data || res))
    );
  }
}
