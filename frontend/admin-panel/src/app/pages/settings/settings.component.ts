import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SiteSettings } from '../../shared/models';
import { AdminSettingsService } from '../../shared/services/admin-settings.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  loading = false;
  saving = false;
  uploadingLight = false;
  uploadingDark = false;
  successMsg = '';
  errorMsg = '';
  logoLightPreview: string | null = null;
  logoDarkPreview: string | null = null;
  showLogoInfo = false;
  showFaviconInfo = false;

  form = this.fb.group({
    sitioTitulo: ['', Validators.required],
    sitioDescripcion: [''],
    emailContacto: ['', [Validators.email]],
    telefonoContacto: [''],
    direccion: [''],
    facebook: [''],
    instagram: [''],
    twitter: [''],
    youtube: [''],
    metaDescripcion: [''],
    metaKeywords: [''],
    googleAnalyticsId: [''],
    mantenimiento: [false]
  });

  constructor(
    private fb: FormBuilder,
    private settingsService: AdminSettingsService
  ) {}

  ngOnInit() {
    this.loadSettings();
  }

  loadSettings(): void {
    this.loading = true;
    this.settingsService.getAll().subscribe({
      next: (resp) => {
        // Backend: { success, message, data: [SiteSettingResponse, ...] }
        const list: any[] = Array.isArray(resp?.data) ? resp.data : [];
        const flat: { [k: string]: string } = {};
        list.forEach(item => {
          if (item && item.settingKey != null) {
            flat[item.settingKey] = item.settingValue ?? '';
          }
        });

        this.form.patchValue({
          sitioTitulo: flat['sitioTitulo'] || '',
          sitioDescripcion: flat['sitioDescripcion'] || '',
          emailContacto: flat['emailContacto'] || '',
          telefonoContacto: flat['telefonoContacto'] || '',
          direccion: flat['direccion'] || '',
          facebook: flat['facebook'] || '',
          instagram: flat['instagram'] || '',
          twitter: flat['twitter'] || '',
          youtube: flat['youtube'] || '',
          metaDescripcion: flat['metaDescripcion'] || '',
          metaKeywords: flat['metaKeywords'] || '',
          googleAnalyticsId: flat['googleAnalyticsId'] || '',
          mantenimiento: flat['mantenimiento'] === 'true'
        });

        if (flat['logoLightUrl']) this.logoLightPreview = this.absUrl(flat['logoLightUrl']);
        if (flat['logoDarkUrl'])  this.logoDarkPreview  = this.absUrl(flat['logoDarkUrl']);

        this.loading = false;
      },
      error: (err) => {
        this.errorMsg = 'No se pudo cargar la configuracion';
        this.loading = false;
        console.error('[AdminSettings] load error:', err);
      }
    });
  }

  onLogoLightSelected(event: any): void {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => this.logoLightPreview = e.target?.result as string;
    reader.readAsDataURL(file);
    this.uploadingLight = true;
    this.settingsService.uploadLogo(file, 'light').subscribe({
      next: (resp) => {
        this.logoLightPreview = this.absUrl(resp?.data?.url);
        this.uploadingLight = false;
        this.successMsg = 'Logo claro actualizado';
        setTimeout(() => this.successMsg = '', 3000);
      },
      error: (err) => {
        this.uploadingLight = false;
        this.errorMsg = err?.error?.message || 'Error al subir logo claro';
        this.loadSettings();
      }
    });
  }

  onLogoDarkSelected(event: any): void {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => this.logoDarkPreview = e.target?.result as string;
    reader.readAsDataURL(file);
    this.uploadingDark = true;
    this.settingsService.uploadLogo(file, 'dark').subscribe({
      next: (resp) => {
        this.logoDarkPreview = this.absUrl(resp?.data?.url);
        this.uploadingDark = false;
        this.successMsg = 'Logo oscuro actualizado';
        setTimeout(() => this.successMsg = '', 3000);
      },
      error: (err) => {
        this.uploadingDark = false;
        this.errorMsg = err?.error?.message || 'Error al subir logo oscuro';
        this.loadSettings();
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.saving = true;
    this.successMsg = '';
    this.errorMsg = '';

    const v = this.form.value;
    const payload: { [k: string]: string } = {
      sitioTitulo: v.sitioTitulo || '',
      sitioDescripcion: v.sitioDescripcion || '',
      emailContacto: v.emailContacto || '',
      telefonoContacto: v.telefonoContacto || '',
      direccion: v.direccion || '',
      facebook: v.facebook || '',
      instagram: v.instagram || '',
      twitter: v.twitter || '',
      youtube: v.youtube || '',
      metaDescripcion: v.metaDescripcion || '',
      metaKeywords: v.metaKeywords || '',
      googleAnalyticsId: v.googleAnalyticsId || '',
      mantenimiento: v.mantenimiento ? 'true' : 'false'
    };

    this.settingsService.updateBulk(payload).subscribe({
      next: () => {
        this.saving = false;
        this.successMsg = 'Configuracion guardada correctamente';
      },
      error: (err) => {
        this.saving = false;
        this.errorMsg = err?.error?.message || 'Error al guardar';
      }
    });
  }

  private absUrl(path: string | null | undefined): string | null {
    if (!path) return null;
    if (path.startsWith('http')) return path;
    const base = environment.apiUrl.replace('/api/v1', '');
    return base + path + '?v=' + Date.now();
  }
}