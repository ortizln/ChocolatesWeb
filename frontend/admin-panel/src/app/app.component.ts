import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, LayoutComponent],
  template: `
    <ng-container *ngIf="isLoggedIn; else loginView">
      <app-layout></app-layout>
    </ng-container>

    <ng-template #loginView>
      <router-outlet></router-outlet>
    </ng-template>
  `,
  styles: [`
    :host { display: contents; }
  `]
})
export class AppComponent {
  private authService = inject(AuthService);

  get isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }
}
