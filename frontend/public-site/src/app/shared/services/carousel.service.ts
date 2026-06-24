import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Carousel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {
  constructor(private api: ApiService) {}

  getActive(): Observable<Carousel[]> {
    return this.api.get<Carousel[]>('carousels');
  }

  getByName(name: string): Observable<Carousel> {
    return this.api.get<Carousel>(`carousels/${name}`);
  }
}
