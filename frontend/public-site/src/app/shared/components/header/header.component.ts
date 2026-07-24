import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass } from '@angular/common';
import { SettingsService } from '../../services/settings.service';
import { SiteSetting } from '../../models';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isMenuOpen = false;
  isScrolled = false;
  logoLightUrl = 'assets/images/logo-white.png';
  logoDarkUrl  = 'assets/images/logo-dark.png';
  siteTitle = 'Chocolates 3D';
  cacheBust = Date.now();

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.loadSettings();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 50;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  private loadSettings(): void {
    this.settingsService.getSettings().subscribe({
      next: (list: SiteSetting[]) => {
        const map: { [k: string]: string } = {};
        (list || []).forEach(s => map[s.settingKey] = s.settingValue);

        if (map['logoLightUrl']) this.logoLightUrl = this.absUrl(map['logoLightUrl']);
        if (map['logoDarkUrl'])  this.logoDarkUrl  = this.absUrl(map['logoDarkUrl']);
        if (map['sitioTitulo'])  this.siteTitle    = map['sitioTitulo'];

        this.cacheBust = Date.now();
      },
      error: () => {
        // fallback silencioso: usar logos por defecto del asset
      }
    });
  }

  private absUrl(path: string): string {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    const base = environment.apiUrl.replace('/api/v1', '');
    return base + path + '?v=' + this.cacheBust;
  }
}