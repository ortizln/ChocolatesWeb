import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Carousel, CarouselItem } from '../../shared/models';

@Component({
  selector: 'app-carousels',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './carousels.component.html',
  styleUrls: ['./carousels.component.scss']
})
export class CarouselsComponent implements OnInit {
  carousels: Carousel[] = [];
  editingCarousel: Carousel | null = null;
  editingItem: CarouselItem | null = null;
  showForm = false;
  showItemForm = false;
  previewImage: string | ArrayBuffer | null = null;

  carouselForm = this.fb.group({
    nombre: ['', Validators.required],
    activo: [true]
  });

  itemForm = this.fb.group({
    titulo: [''],
    descripcion: [''],
    linkUrl: [''],
    orden: [0],
    activo: [true]
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.loadCarousels();
  }

  loadCarousels(): void {
    this.carousels = [
      {
        id: 1, nombre: 'Hero Principal', activo: true,
        items: [
          { id: 1, titulo: 'Chocolate Artesanal', descripcion: 'Descubre nuestra selección', imagenUrl: '', linkUrl: '/productos', orden: 1, activo: true },
          { id: 2, titulo: 'Edición Limitada', descripcion: 'Sabores exclusivos', imagenUrl: '', linkUrl: '/novedades', orden: 2, activo: true }
        ]
      },
      {
        id: 2, nombre: 'Promociones', activo: false,
        items: [
          { id: 3, titulo: 'Oferta Especial', descripcion: '20% off en compras mayores a \$50', imagenUrl: '', linkUrl: '/ofertas', orden: 1, activo: true }
        ]
      }
    ];
  }

  openNewCarousel(): void {
    this.editingCarousel = null;
    this.carouselForm.reset({ activo: true });
    this.showForm = true;
  }

  openEditCarousel(c: Carousel): void {
    this.editingCarousel = c;
    this.carouselForm.patchValue({ nombre: c.nombre, activo: c.activo });
    this.showForm = true;
  }

  saveCarousel(): void {
    if (this.carouselForm.invalid) return;
    const data = this.carouselForm.value;
    if (this.editingCarousel) {
      const idx = this.carousels.findIndex(c => c.id === this.editingCarousel!.id);
      if (idx >= 0) {
        this.carousels[idx] = { ...this.carousels[idx], nombre: data.nombre!, activo: data.activo! };
      }
    } else {
      this.carousels.push({
        id: Math.max(...this.carousels.map(c => c.id), 0) + 1,
        nombre: data.nombre!,
        activo: data.activo!,
        items: []
      });
    }
    this.showForm = false;
    this.editingCarousel = null;
  }

  cancelCarousel(): void {
    this.showForm = false;
    this.editingCarousel = null;
  }

  deleteCarousel(id: number): void {
    if (confirm('¿Eliminar este carrusel?')) {
      this.carousels = this.carousels.filter(c => c.id !== id);
    }
  }

  openNewItem(carousel: Carousel): void {
    this.editingCarousel = carousel;
    this.editingItem = null;
    this.itemForm.reset({ activo: true, orden: carousel.items.length + 1 });
    this.previewImage = null;
    this.showItemForm = true;
  }

  openEditItem(carousel: Carousel, item: CarouselItem): void {
    this.editingCarousel = carousel;
    this.editingItem = item;
    this.itemForm.patchValue({
      titulo: item.titulo,
      descripcion: item.descripcion,
      linkUrl: item.linkUrl,
      orden: item.orden,
      activo: item.activo
    });
    this.previewImage = item.imagenUrl;
    this.showItemForm = true;
  }

  saveItem(): void {
    if (!this.editingCarousel || this.itemForm.invalid) return;
    const data = this.itemForm.value;
    if (this.editingItem) {
      const idx = this.editingCarousel.items.findIndex(i => i.id === this.editingItem!.id);
      if (idx >= 0) {
        this.editingCarousel.items[idx] = { ...this.editingCarousel.items[idx], ...data as any };
      }
    } else {
      this.editingCarousel.items.push({
        id: Math.max(0, ...this.editingCarousel.items.map(i => i.id)) + 1,
        ...data as any,
        imagenUrl: ''
      });
    }
    this.showItemForm = false;
    this.editingItem = null;
  }

  cancelItem(): void {
    this.showItemForm = false;
    this.editingItem = null;
  }

  deleteItem(carouselId: number, itemId: number): void {
    const c = this.carousels.find(c => c.id === carouselId);
    if (c && confirm('¿Eliminar este item?')) {
      c.items = c.items.filter(i => i.id !== itemId);
    }
  }

  moveItem(carouselId: number, itemId: number, direction: 'up' | 'down'): void {
    const c = this.carousels.find(c => c.id === carouselId);
    if (!c) return;
    const idx = c.items.findIndex(i => i.id === itemId);
    if ((direction === 'up' && idx > 0) || (direction === 'down' && idx < c.items.length - 1)) {
      const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
      [c.items[idx], c.items[swapIdx]] = [c.items[swapIdx], c.items[idx]];
      c.items.forEach((item, i) => item.orden = i + 1);
    }
  }
}
