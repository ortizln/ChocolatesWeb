import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <header class="admin-header">
      <div class="header-left">
        <button class="btn-icon sidebar-toggle" (click)="toggleSidebar()" aria-label="Toggle sidebar">
          <i class="fas fa-bars"></i>
        </button>
        <span class="brand d-none d-sm-inline">Chocolates Web</span>
        <span class="brand-subtitle d-none d-md-inline">Panel Administrativo</span>
      </div>

      <div class="header-right">
        <button class="btn-icon notification-btn position-relative" (click)="toggleNotifications()" aria-label="Notificaciones">
          <i class="fas fa-bell"></i>
          <span class="notification-dot"></span>
        </button>

        <div class="dropdown user-dropdown" #userDropdown>
          <button class="btn-icon user-btn" data-bs-toggle="dropdown" aria-expanded="false" aria-label="Menú de usuario">
            <div class="user-avatar">
              <i class="fas fa-user"></i>
            </div>
            <span class="d-none d-md-inline user-name">{{ userName }}</span>
            <i class="fas fa-chevron-down d-none d-md-inline arrow"></i>
          </button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li><span class="dropdown-item-text">
              <small class="text-muted">Conectado como</small><br>
              <strong>{{ userName }}</strong>
            </span></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" routerLink="/settings">
              <i class="fas fa-cog"></i> Configuración
            </a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item text-danger" (click)="logout()">
              <i class="fas fa-sign-out-alt"></i> Cerrar Sesión
            </a></li>
          </ul>
        </div>
      </div>
    </header>
  `,
  styles: [`
    :host { display: contents; }
  `]
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private sidebarService = inject(SidebarService);
  private router = inject(Router);

  get userName(): string {
    const user = this.authService.getCurrentUser();
    return user?.nombre || user?.username || 'Usuario';
  }

  toggleSidebar() {
    if (window.innerWidth < 768) {
      this.sidebarService.toggleMobile();
    } else {
      this.sidebarService.toggleCollapsed();
    }
  }

  toggleNotifications() {
    // TODO: Implementar panel de notificaciones
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
