import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ContactMessage, ApiResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private api: ApiService) {}

  sendMessage(data: { name: string; email: string; phone?: string; message: string }): Observable<ApiResponse<ContactMessage>> {
    return this.api.post<ApiResponse<ContactMessage>>('contact', data);
  }
}
