import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { SiteSetting, SocialLink, NavigationMenu } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  constructor(private api: ApiService) {}

  getSettings(): Observable<SiteSetting[]> {
    return this.api.get<SiteSetting[]>('settings');
  }

  getSocialLinks(): Observable<SocialLink[]> {
    return this.api.get<SocialLink[]>('settings/social-links');
  }

  getNavigation(location: string): Observable<NavigationMenu> {
    return this.api.get<NavigationMenu>(`settings/navigation/${location}`);
  }
}
