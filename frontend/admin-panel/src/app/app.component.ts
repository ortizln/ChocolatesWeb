import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, SidebarComponent, HeaderComponent],
  template: `
    <ng-container *ngIf="isLoggedIn; else loginView">
      <app-sidebar></app-sidebar>
      <app-header></app-header>
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
    </ng-container>

    <ng-template #loginView>
      <router-outlet></router-outlet>
    </ng-template>
  `,
  styles: [`
    :host { display: contents; }
    .main-content {
      margin-top: var(--header-h);
      margin-left: var(--sidebar-w);
      padding: 24px;
      min-height: calc(100vh - var(--header-h));
      background: var(--bg);
      transition: margin-left .25s ease;
    }
    @media (max-width: 1199px) {
      .main-content { margin-left: var(--sidebar-w-collapsed); }
    }
    @media (max-width: 767px) {
      .main-content { margin-left: 0; padding: 16px; }
    }
  `]
})
export class AppComponent {
  private authService = inject(AuthService);

  get isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }
}
