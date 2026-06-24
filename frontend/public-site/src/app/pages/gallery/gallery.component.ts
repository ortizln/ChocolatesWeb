import { Component, OnInit } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [NgClass, NgFor, NgIf, RouterLink],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  activeTab: 'albums' | 'videos' = 'albums';
  activeCategory: string = 'todas';
  isLightboxOpen = false;
  lightboxImage = '';

  categories = [
    { key: 'todas', name: 'Todas', icon: 'fa-th-large' },
    { key: 'productos', name: 'Productos', icon: 'fa-gem' },
    { key: 'eventos', name: 'Eventos', icon: 'fa-calendar-alt' },
    { key: 'talleres', name: 'Talleres', icon: 'fa-chalkboard-teacher' },
    { key: 'detras', name: 'Detrás de Cámaras', icon: 'fa-camera' }
  ];

  albums = [
    { id: 1, name: 'Colección Premium 2026', description: 'Nuestra última colección de chocolates premium.', coverUrl: 'assets/images/album-1.jpg', mediaCount: 12, slug: 'coleccion-premium-2026' },
    { id: 2, name: 'Talleres de Chocolate', description: 'Fotos de nuestros talleres de elaboración.', coverUrl: 'assets/images/album-2.jpg', mediaCount: 24, slug: 'talleres-chocolate' },
    { id: 3, name: 'Evento de Lanzamiento', description: 'Galería del lanzamiento de nuestra colección.', coverUrl: 'assets/images/album-3.jpg', mediaCount: 18, slug: 'evento-lanzamiento' },
    { id: 4, name: 'Nuestra Fábrica', description: 'Recorrido por nuestras instalaciones.', coverUrl: 'assets/images/album-4.jpg', mediaCount: 15, slug: 'nuestra-fabrica' },
    { id: 5, name: 'Materia Prima', description: 'Selección de granos de cacao.', coverUrl: 'assets/images/album-5.jpg', mediaCount: 9, slug: 'materia-prima' },
    { id: 6, name: 'Empaques y Presentaciones', description: 'Nuestros empaques artesanales.', coverUrl: 'assets/images/album-6.jpg', mediaCount: 20, slug: 'empaques-presentaciones' }
  ];

  mediaItems = [
    { id: 1, url: 'assets/images/gallery-1.jpg', thumbnail: 'assets/images/gallery-1.jpg', title: 'Chocolate Oscuro 70%', type: 'image', category: 'productos' },
    { id: 2, url: 'assets/images/gallery-2.jpg', thumbnail: 'assets/images/gallery-2.jpg', title: 'Presentación Elegante', type: 'image', category: 'productos' },
    { id: 3, url: 'assets/images/gallery-3.jpg', thumbnail: 'assets/images/gallery-3.jpg', title: 'Feria del Chocolate', type: 'image', category: 'eventos' },
    { id: 4, url: 'assets/images/gallery-4.jpg', thumbnail: 'assets/images/gallery-4.jpg', title: 'Taller de Degustación', type: 'image', category: 'talleres' },
    { id: 5, url: 'assets/images/gallery-5.jpg', thumbnail: 'assets/images/gallery-5.jpg', title: 'Preparación Artesanal', type: 'image', category: 'detras' },
    { id: 6, url: 'assets/images/gallery-6.jpg', thumbnail: 'assets/images/gallery-6.jpg', title: 'Caja de Regalo', type: 'image', category: 'productos' },
    { id: 7, url: 'assets/images/gallery-7.jpg', thumbnail: 'assets/images/gallery-7.jpg', title: 'Selección de Cacao', type: 'image', category: 'detras' },
    { id: 8, url: 'assets/images/gallery-8.jpg', thumbnail: 'assets/images/gallery-8.jpg', title: 'Evento Corporativo', type: 'image', category: 'eventos' },
    { id: 9, url: 'assets/images/gallery-9.jpg', thumbnail: 'assets/images/gallery-9.jpg', title: 'Bombones Surtidos', type: 'image', category: 'productos' },
    { id: 10, url: 'assets/images/gallery-10.jpg', thumbnail: 'assets/images/gallery-10.jpg', title: 'Taller Infantil', type: 'image', category: 'talleres' },
    { id: 11, url: 'assets/images/gallery-11.jpg', thumbnail: 'assets/images/gallery-11.jpg', title: 'Decoración Artesanal', type: 'image', category: 'detras' },
    { id: 12, url: 'assets/images/gallery-12.jpg', thumbnail: 'assets/images/gallery-12.jpg', title: 'Trufas Variadas', type: 'image', category: 'productos' }
  ];

  videos = [
    { id: 1, url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Proceso de Elaboración', duration: '3:45', thumbnail: 'assets/images/video-thumb-1.jpg' },
    { id: 2, url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Conociendo Nuestra Fábrica', duration: '5:20', thumbnail: 'assets/images/video-thumb-2.jpg' },
    { id: 3, url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Taller de Bombones', duration: '8:15', thumbnail: 'assets/images/video-thumb-3.jpg' },
    { id: 4, url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Entrevista con el Maestro Chocolatero', duration: '12:00', thumbnail: 'assets/images/video-thumb-4.jpg' }
  ];

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  setTab(tab: 'albums' | 'videos'): void {
    this.activeTab = tab;
  }

  setCategory(key: string): void {
    this.activeCategory = key;
  }

  get filteredMedia() {
    if (this.activeCategory === 'todas') return this.mediaItems;
    return this.mediaItems.filter(m => m.category === this.activeCategory);
  }

  openLightbox(url: string): void {
    this.lightboxImage = url;
    this.isLightboxOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeLightbox(): void {
    this.isLightboxOpen = false;
    document.body.style.overflow = '';
  }
}
