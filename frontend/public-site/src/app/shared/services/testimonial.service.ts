import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Testimonial } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {
  constructor(private api: ApiService) {}

  getActive(): Observable<Testimonial[]> {
    return this.api.get<Testimonial[]>('testimonials');
  }
}
