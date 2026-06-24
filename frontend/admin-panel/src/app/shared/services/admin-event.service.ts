import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Evento, EventFormData } from '../models';

@Injectable({ providedIn: 'root' })
export class AdminEventService {
  private apiUrl = `${environment.apiUrl}/admin/eventos`;

  constructor(private http: HttpClient) {}

  private mapEvent(e: any): Evento {
    return {
      id: e.id,
      titulo: e.title,
      descripcion: e.description || '',
      contenido: e.description || '',
      imagenUrl: e.featuredImage || '',
      fechaInicio: e.startDate || '',
      fechaFin: e.endDate || '',
      hora: '',
      lugar: e.location || '',
      linkRegistro: '',
      activo: e.status === 'ACTIVE',
      destacado: false,
      fechaCreacion: e.createdAt || ''
    };
  }

  private toRequest(f: any): any {
    const r: any = {};
    if (f.titulo !== undefined) r.title = f.titulo;
    if (f.descripcion !== undefined) r.description = f.descripcion;
    if (f.fechaInicio !== undefined) r.startDate = f.fechaInicio;
    if (f.fechaFin !== undefined) r.endDate = f.fechaFin;
    if (f.lugar !== undefined) r.location = f.lugar;
    if (f.imagenUrl !== undefined) r.featuredImage = f.imagenUrl;
    if (f.activo !== undefined) r.status = f.activo ? 'ACTIVE' : 'INACTIVE';
    return r;
  }

  getEvents(params?: { search?: string; activo?: boolean; page?: number; size?: number }): Observable<any> {
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
          content: (d.content || []).map((e: any) => this.mapEvent(e)),
          totalElements: d.totalElements || 0,
          page: d.page || 0,
          size: d.size || 0,
          totalPages: d.totalPages || 0,
          last: d.last !== undefined ? d.last : true
        };
      })
    );
  }

  getEvent(id: number): Observable<Evento> {
    return this.http.get(`${this.apiUrl}/${id}`).pipe(
      map((res: any) => this.mapEvent(res.data || res))
    );
  }

  createEvent(data: EventFormData): Observable<Evento> {
    return this.http.post(this.apiUrl, this.toRequest(data)).pipe(
      map((res: any) => this.mapEvent(res.data || res))
    );
  }

  updateEvent(id: number, data: Partial<EventFormData>): Observable<Evento> {
    return this.http.put(`${this.apiUrl}/${id}`, this.toRequest(data)).pipe(
      map((res: any) => this.mapEvent(res.data || res))
    );
  }

  deleteEvent(id: number): Observable<void> {
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
