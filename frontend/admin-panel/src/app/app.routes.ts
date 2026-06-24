import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
  { path: '', canActivate: [authGuard], children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) },
    { path: 'products', loadComponent: () => import('./pages/products/product-list/product-list.component').then(m => m.ProductListComponent) },
    { path: 'products/new', loadComponent: () => import('./pages/products/product-form/product-form.component').then(m => m.ProductFormComponent) },
    { path: 'products/:id/edit', loadComponent: () => import('./pages/products/product-form/product-form.component').then(m => m.ProductFormComponent) },
    { path: 'categories', loadComponent: () => import('./pages/categories/categories.component').then(m => m.CategoriesComponent) },
    { path: 'tags', loadComponent: () => import('./pages/tags/tags.component').then(m => m.TagsComponent) },
    { path: 'banners', loadComponent: () => import('./pages/banners/banners.component').then(m => m.BannersComponent) },
    { path: 'carousels', loadComponent: () => import('./pages/carousels/carousels.component').then(m => m.CarouselsComponent) },
    { path: 'blog', loadComponent: () => import('./pages/blog-admin/blog-list/blog-list.component').then(m => m.BlogListComponent) },
    { path: 'blog/new', loadComponent: () => import('./pages/blog-admin/blog-form/blog-form.component').then(m => m.BlogFormComponent) },
    { path: 'blog/:id/edit', loadComponent: () => import('./pages/blog-admin/blog-form/blog-form.component').then(m => m.BlogFormComponent) },
    { path: 'events', loadComponent: () => import('./pages/events-admin/events-list/events-list.component').then(m => m.EventsListComponent) },
    { path: 'events/new', loadComponent: () => import('./pages/events-admin/events-form/events-form.component').then(m => m.EventsFormComponent) },
    { path: 'events/:id/edit', loadComponent: () => import('./pages/events-admin/events-form/events-form.component').then(m => m.EventsFormComponent) },
    { path: 'gallery', loadComponent: () => import('./pages/gallery-admin/gallery-admin.component').then(m => m.GalleryAdminComponent) },
    { path: 'messages', loadComponent: () => import('./pages/messages/messages.component').then(m => m.MessagesComponent) },
    { path: 'users', loadComponent: () => import('./pages/users/users.component').then(m => m.UsersComponent) },
    { path: 'analytics', loadComponent: () => import('./pages/analytics/analytics.component').then(m => m.AnalyticsComponent) },
    { path: 'settings', loadComponent: () => import('./pages/settings/settings.component').then(m => m.SettingsComponent) },
  ]},
  { path: '**', redirectTo: 'dashboard' }
];
