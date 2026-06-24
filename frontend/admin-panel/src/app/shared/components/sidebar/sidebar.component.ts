import { Component, HostListener, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <aside class="sidebar" [class.collapsed]="isCollapsed" [class.mobile-open]="isMobileOpen">
      <div class="sidebar-header">
        <div class="logo-icon">
          <i class="fas fa-crown"></i>
        </div>
        <div class="logo-text" *ngIf="!isCollapsed">
          <div class="logo">Chocolates Web</div>
          <div class="logo-sub">Panel Administrativo</div>
        </div>
      </div>

      <nav class="sidebar-nav">
        <div class="nav-section" *ngIf="!isCollapsed">Principal</div>
        <a class="nav-item" routerLink="/dashboard" routerLinkActive="active" (click)="onNavClick()">
          <i class="fas fa-chart-pie"></i>
          <span class="nav-text" *ngIf="!isCollapsed">Dashboard</span>
        </a>

        <div class="nav-section" *ngIf="!isCollapsed">Contenido</div>
        <a class="nav-item" routerLink="/products" routerLinkActive="active" (click)="onNavClick()">
          <i class="fas fa-box"></i>
          <span class="nav-text" *ngIf="!isCollapsed">Productos</span>
        </a>
        <a class="nav-item" routerLink="/categories" routerLinkActive="active" (click)="onNavClick()">
          <i class="fas fa-tags"></i>
          <span class="nav-text" *ngIf="!isCollapsed">Categorías</span>
        </a>
        <a class="nav-item" routerLink="/tags" routerLinkActive="active" (click)="onNavClick()">
          <i class="fas fa-hashtag"></i>
          <span class="nav-text" *ngIf="!isCollapsed">Etiquetas</span>
        </a>
        <a class="nav-item" routerLink="/banners" routerLinkActive="active" (click)="onNavClick()">
          <i class="fas fa-images"></i>
          <span class="nav-text" *ngIf="!isCollapsed">Banners</span>
        </a>
        <a class="nav-item" routerLink="/carousels" routerLinkActive="active" (click)="onNavClick()">
          <i class="fas fa-sliders-h"></i>
          <span class="nav-text" *ngIf="!isCollapsed">Carruseles</span>
        </a>
        <a class="nav-item" routerLink="/blog" routerLinkActive="active" (click)="onNavClick()">
          <i class="fas fa-newspaper"></i>
          <span class="nav-text" *ngIf="!isCollapsed">Blog</span>
        </a>
        <a class="nav-item" routerLink="/events" routerLinkActive="active" (click)="onNavClick()">
          <i class="fas fa-calendar-alt"></i>
          <span class="nav-text" *ngIf="!isCollapsed">Eventos</span>
        </a>
        <a class="nav-item" routerLink="/gallery" routerLinkActive="active" (click)="onNavClick()">
          <i class="fas fa-photo-video"></i>
          <span class="nav-text" *ngIf="!isCollapsed">Galería</span>
        </a>

        <div class="nav-section" *ngIf="!isCollapsed">Gestión</div>
        <a class="nav-item" routerLink="/messages" routerLinkActive="active" (click)="onNavClick()">
          <i class="fas fa-envelope"></i>
          <span class="nav-text" *ngIf="!isCollapsed">Mensajes</span>
        </a>
        <a class="nav-item" routerLink="/users" routerLinkActive="active" (click)="onNavClick()">
          <i class="fas fa-users"></i>
          <span class="nav-text" *ngIf="!isCollapsed">Usuarios</span>
        </a>
        <a class="nav-item" routerLink="/analytics" routerLinkActive="active" (click)="onNavClick()">
          <i class="fas fa-chart-line"></i>
          <span class="nav-text" *ngIf="!isCollapsed">Analítica</span>
        </a>
        <a class="nav-item" routerLink="/settings" routerLinkActive="active" (click)="onNavClick()">
          <i class="fas fa-cog"></i>
          <span class="nav-text" *ngIf="!isCollapsed">Configuración</span>
        </a>
      </nav>
    </aside>

    <div class="sidebar-overlay" [class.show]="isMobileOpen" (click)="closeMobile()"></div>
  `,
  styles: [`
    :host { display: contents; }
  `]
})
export class SidebarComponent {
  private sidebarService = inject(SidebarService);

  isCollapsed = false;
  isMobileOpen = false;

  constructor() {
    this.sidebarService.collapsed$.subscribe(v => this.isCollapsed = v);
    this.sidebarService.mobileOpen$.subscribe(v => this.isMobileOpen = v);
  }

  @HostListener('window:resize')
  onResize() {
    const w = window.innerWidth;
    if (w >= 1200) {
      this.sidebarService.setCollapsed(false);
      this.sidebarService.closeMobile();
    } else if (w >= 768) {
      this.sidebarService.setCollapsed(true);
      this.sidebarService.closeMobile();
    } else {
      this.sidebarService.setCollapsed(false);
    }
  }

  onNavClick() {
    if (window.innerWidth < 768) {
      this.sidebarService.closeMobile();
    }
  }

  closeMobile() {
    this.sidebarService.closeMobile();
  }
}
