import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Post, PagedResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private api: ApiService) {}

  getPosts(params?: Record<string, string | number | boolean>): Observable<PagedResponse<Post>> {
    return this.api.getWithParams<PagedResponse<Post>>('posts', params || {});
  }

  getBySlug(slug: string): Observable<Post> {
    return this.api.get<Post>(`posts/${slug}`);
  }

  getLatest(limit?: number): Observable<Post[]> {
    const params: Record<string, string | number | boolean> = {};
    if (limit) params.limit = limit;
    return this.api.getWithParams<Post[]>('posts/latest', params);
  }

  getRelated(slug: string, limit?: number): Observable<Post[]> {
    const params: Record<string, string | number | boolean> = {};
    if (limit) params.limit = limit;
    return this.api.getWithParams<Post[]>(`posts/${slug}/related`, params);
  }
}
