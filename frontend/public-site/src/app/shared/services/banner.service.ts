import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Banner } from '../models';

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  constructor(private api: ApiService) {}

  getActive(): Observable<Banner[]> {
    return this.api.get<Banner[]>('banners');
  }
}
