import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Event, PagedResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(private api: ApiService) {}

  getEvents(params?: Record<string, string | number | boolean>): Observable<PagedResponse<Event>> {
    return this.api.getWithParams<PagedResponse<Event>>('events', params || {});
  }

  getUpcoming(limit?: number): Observable<Event[]> {
    const params: Record<string, string | number | boolean> = {};
    if (limit) params.limit = limit;
    return this.api.getWithParams<Event[]>('events/upcoming', params);
  }

  getBySlug(slug: string): Observable<Event> {
    return this.api.get<Event>(`events/${slug}`);
  }
}
