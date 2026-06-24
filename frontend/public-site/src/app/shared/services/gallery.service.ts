import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { GalleryAlbum, MediaItem } from '../models';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  constructor(private api: ApiService) {}

  getAlbums(): Observable<GalleryAlbum[]> {
    return this.api.get<GalleryAlbum[]>('gallery/albums');
  }

  getAlbumBySlug(slug: string): Observable<GalleryAlbum> {
    return this.api.get<GalleryAlbum>(`gallery/albums/${slug}`);
  }

  getMedia(params?: Record<string, string | number | boolean>): Observable<MediaItem[]> {
    return this.api.getWithParams<MediaItem[]>('gallery/media', params || {});
  }
}
