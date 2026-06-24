import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  constructor(private api: ApiService) {}

  trackPageView(page: string, title?: string): Observable<void> {
    return this.api.post<void>('analytics/pageview', { page, title });
  }

  trackEvent(category: string, action: string, label?: string, value?: number): Observable<void> {
    return this.api.post<void>('analytics/event', { category, action, label, value });
  }

  trackProductView(productId: number, productName: string): Observable<void> {
    return this.api.post<void>('analytics/product-view', { productId, productName });
  }

  trackProductLike(productId: number): Observable<void> {
    return this.api.post<void>('analytics/product-like', { productId });
  }

  incrementVisitorCount(): Observable<{ count: number }> {
    return this.api.post<{ count: number }>('analytics/visitor', {});
  }

  getVisitorCount(): Observable<{ count: number }> {
    return this.api.get<{ count: number }>('analytics/visitor-count');
  }
}
