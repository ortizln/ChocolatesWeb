import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Banner } from '../../shared/models';

@Component({
  selector: 'app-banners',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.scss']
})
export class BannersComponent implements OnInit {
  banners: Banner[] = [];
  editingBanner: Banner | null = null;
  showForm = false;
  previewImage: string | ArrayBuffer | null = null;
  showImageInfo = false;

  form = this.fb.group({
    titulo: ['', Validators.required],
    subtitulo: [''],
    linkUrl: [''],
    orden: [0, Validators.min(0)],
    activo: [true],
    fechaInicio: [''],
    fechaFin: ['']
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.loadBanners();
  }

  loadBanners(): void {
    // TODO: Replace with actual API call
    this.banners = [
      { id: 1, titulo: 'Chocolate Artesanal', subtitulo: 'Descubre nuestros sabores', imagenUrl: '', linkUrl: '/productos', orden: 1, activo: true, fechaInicio: '2026-01-01', fechaFin: '2026-12-31' },
      { id: 2, titulo: 'Nueva Colección', subtitulo: 'Edición limitada', imagenUrl: '', linkUrl: '/novedades', orden: 2, activo: true, fechaInicio: '2026-06-01', fechaFin: '2026-09-30' },
    ];
  }

  openNew(): void {
    this.editingBanner = null;
    this.form.reset({ activo: true, orden: this.banners.length + 1 });
    this.previewImage = null;
    this.showForm = true;
  }

  openEdit(banner: Banner): void {
    this.editingBanner = banner;
    this.form.patchValue({
      titulo: banner.titulo,
      subtitulo: banner.subtitulo,
      linkUrl: banner.linkUrl,
      orden: banner.orden,
      activo: banner.activo,
      fechaInicio: banner.fechaInicio,
      fechaFin: banner.fechaFin
    });
    this.previewImage = banner.imagenUrl;
    this.showForm = true;
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => this.previewImage = e.target?.result || null;
      reader.readAsDataURL(file);
    }
  }

  onDelete(id: number): void {
    if (confirm('¿Eliminar este banner?')) {
      this.banners = this.banners.filter(b => b.id !== id);
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    const data = this.form.value;
    if (this.editingBanner) {
      const idx = this.banners.findIndex(b => b.id === this.editingBanner!.id);
      if (idx >= 0) {
        this.banners[idx] = { ...this.banners[idx], ...data as any };
      }
    } else {
      this.banners.push({
        id: Math.max(...this.banners.map(b => b.id), 0) + 1,
        ...data as any,
        imagenUrl: ''
      });
    }
    this.showForm = false;
    this.editingBanner = null;
  }

  cancel(): void {
    this.showForm = false;
    this.editingBanner = null;
  }
}
