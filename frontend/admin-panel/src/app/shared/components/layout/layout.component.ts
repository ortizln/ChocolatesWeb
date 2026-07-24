import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { SidebarService } from '../../services/sidebar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule, SidebarComponent, HeaderComponent, FooterComponent],
  template: `
    <div class="admin-layout" [class.sidebar-collapsed]="isCollapsed">
      <app-sidebar></app-sidebar>
      <div class="layout-main">
        <app-header></app-header>
        <main class="main-content">
          <router-outlet></router-outlet>
        </main>
        <app-footer></app-footer>
      </div>
    </div>
  `,
  styles: [`
    :host { display: contents; }
  `]
})
export class LayoutComponent implements OnInit, OnDestroy {
  private sidebarService = inject(SidebarService);
  isCollapsed = false;
  private sub = new Subscription();

  ngOnInit() {
    this.sub.add(
      this.sidebarService.collapsed$.subscribe(v => this.isCollapsed = v)
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
