import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SiteSettings } from '../../shared/models';

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
  successMsg = '';
  errorMsg = '';
  logoPreview: string | ArrayBuffer | null = null;
  faviconPreview: string | ArrayBuffer | null = null;
  showLogoInfo = false;
  showFaviconInfo = false;

  form = this.fb.group({
    sitioTitulo: ['', Validators.required],
    sitioDescripcion: [''],
    logoUrl: [''],
    faviconUrl: [''],
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

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.loadSettings();
  }

  loadSettings(): void {
    this.loading = true;
    // TODO: Replace with actual API call
    setTimeout(() => {
      this.form.patchValue({
        sitioTitulo: 'Chocolates Web',
        sitioDescripcion: 'Los mejores chocolates artesanales',
        emailContacto: 'info@chocolatesweb.com',
        telefonoContacto: '+54 11 5555-1234',
        direccion: 'Av. Principal 123, Buenos Aires, Argentina',
        facebook: 'https://facebook.com/chocolatesweb',
        instagram: 'https://instagram.com/chocolatesweb',
        twitter: 'https://twitter.com/chocolatesweb',
        youtube: 'https://youtube.com/@chocolatesweb',
        metaDescripcion: 'Tienda online de chocolates artesanales. Los mejores bombones, trufas y tabletas de chocolate.',
        metaKeywords: 'chocolate, artesanal, bombones, trufas, cacao',
        googleAnalyticsId: 'G-XXXXXXXXXX',
        mantenimiento: false
      });
      this.loading = false;
    }, 500);
  }

  onLogoSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => this.logoPreview = e.target?.result || null;
      reader.readAsDataURL(file);
    }
  }

  onFaviconSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => this.faviconPreview = e.target?.result || null;
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.saving = true;
    this.successMsg = '';
    this.errorMsg = '';

    const data: any = {
      ...this.form.value,
      redesSociales: {
        facebook: this.form.value.facebook,
        instagram: this.form.value.instagram,
        twitter: this.form.value.twitter,
        youtube: this.form.value.youtube
      }
    };
    delete data.facebook;
    delete data.instagram;
    delete data.twitter;
    delete data.youtube;

    // TODO: Replace with actual API call
    setTimeout(() => {
      this.saving = false;
      this.successMsg = 'Configuración guardada correctamente';
    }, 1000);
  }
}
