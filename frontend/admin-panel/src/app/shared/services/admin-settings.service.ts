import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminSettingsService {
  private readonly apiUrl = `${environment.apiUrl}/admin/settings`;
  private readonly logoUrl = `${environment.apiUrl}/admin/settings/logo`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  updateBulk(settings: { [key: string]: string }): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/bulk`, settings);
  }

  updateOne(key: string, value: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${key}`, { value });
  }

  uploadLogo(file: File, variant: 'light' | 'dark'): Observable<any> {
    const fd = new FormData();
    fd.append('file', file);
    fd.append('variant', variant);
    return this.http.post<any>(`${this.logoUrl}/upload`, fd);
  }

  deleteLogo(variant: 'light' | 'dark'): Observable<any> {
    return this.http.delete<any>(`${this.logoUrl}/${variant}`);
  }
}