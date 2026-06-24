import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User, LoginRequest } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest) {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((res: any) => {
        const data = res.data || res;
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        const user: User = {
          id: 0,
          username: data.username || '',
          email: data.email || '',
          nombre: (data.firstName || '') + ' ' + (data.lastName || ''),
          role: data.roles?.[0]?.replace('ROLE_', '') || 'ADMIN',
          activo: true
        };
        localStorage.setItem('currentUser', JSON.stringify(user));
      })
    );
  }

  register(user: Partial<User> & { password: string }) {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  refreshToken() {
    const refresh = localStorage.getItem('refreshToken');
    return this.http.post(`${this.apiUrl}/refresh`, { refreshToken: refresh }).pipe(
      tap((res: any) => {
        const data = res.data || res;
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
      })
    );
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  getAccessToken(): string | null {
    const token = localStorage.getItem('accessToken');
    if (!token || token === 'undefined' || token === 'null') {
      this.logout();
      return null;
    }
    return token;
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('currentUser');
  }
}
