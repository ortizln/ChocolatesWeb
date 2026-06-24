import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  template: `
    <div class="admin-wrapper">
      <aside class="sidebar" *ngIf="isLoggedIn">
        <div class="sidebar-header">
          <div class="logo">Chocolates Web</div>
          <div class="logo-sub">Panel Administrativo</div>
        </div>
        <nav>
          <div class="nav-section">Principal</div>
          <a class="nav-item" routerLink="/dashboard" routerLinkActive="active">
            <i class="fas fa-chart-pie"></i> Dashboard
          </a>
          <div class="nav-section">Contenido</div>
          <a class="nav-item" routerLink="/products" routerLinkActive="active">
            <i class="fas fa-box"></i> Productos
          </a>
          <a class="nav-item" routerLink="/categories" routerLinkActive="active">
            <i class="fas fa-tags"></i> Categorías
          </a>
          <a class="nav-item" routerLink="/tags" routerLinkActive="active">
            <i class="fas fa-hashtag"></i> Etiquetas
          </a>
          <a class="nav-item" routerLink="/banners" routerLinkActive="active">
            <i class="fas fa-images"></i> Banners
          </a>
          <a class="nav-item" routerLink="/carousels" routerLinkActive="active">
            <i class="fas fa-sliders-h"></i> Carruseles
          </a>
          <a class="nav-item" routerLink="/blog" routerLinkActive="active">
            <i class="fas fa-newspaper"></i> Blog
          </a>
          <a class="nav-item" routerLink="/events" routerLinkActive="active">
            <i class="fas fa-calendar-alt"></i> Eventos
          </a>
          <a class="nav-item" routerLink="/gallery" routerLinkActive="active">
            <i class="fas fa-photo-video"></i> Galería
          </a>
          <div class="nav-section">Gestión</div>
          <a class="nav-item" routerLink="/messages" routerLinkActive="active">
            <i class="fas fa-envelope"></i> Mensajes
          </a>
          <a class="nav-item" routerLink="/users" routerLinkActive="active">
            <i class="fas fa-users"></i> Usuarios
          </a>
          <a class="nav-item" routerLink="/analytics" routerLinkActive="active">
            <i class="fas fa-chart-line"></i> Analítica
          </a>
          <a class="nav-item" routerLink="/settings" routerLinkActive="active">
            <i class="fas fa-cog"></i> Configuración
          </a>
          <div class="nav-section">Sistema</div>
          <a class="nav-item" (click)="logout()" style="cursor:pointer">
            <i class="fas fa-sign-out-alt"></i> Cerrar Sesión
          </a>
        </nav>
      </aside>
      <div class="main-content">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [':host { display: contents; }']
})
export class AppComponent {
  constructor(private router: Router) {}
  get isLoggedIn(): boolean {
    return typeof localStorage !== 'undefined' && !!localStorage.getItem('accessToken');
  }
  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.router.navigate(['/login']);
  }
}
