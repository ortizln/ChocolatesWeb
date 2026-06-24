import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AdminProductService } from '../../../shared/services/admin-product.service';
import { Categoria, Tag } from '../../../shared/models';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  isEdit = false;
  productId: number | null = null;
  loading = false;
  submitting = false;
  error = '';

  categories: Categoria[] = [];
  availableTags: Tag[] = [];
  selectedImage: string | ArrayBuffer | null = null;
  selectedFiles: File[] = [];
  showImageInfo = false;

  form = this.fb.group({
    nombre: ['', [Validators.required, Validators.maxLength(200)]],
    descripcion: [''],
    descripcionCorta: ['', [Validators.maxLength(300)]],
    precio: [0, [Validators.required, Validators.min(0)]],
    precioOferta: [0],
    stock: [0, [Validators.required, Validators.min(0)]],
    sku: ['', [Validators.required]],
    categoriaId: [0, [Validators.required, Validators.min(1)]],
    tags: [[] as number[]],
    ingredientes: [''],
    peso: [''],
    activo: [true],
    destacado: [false]
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: AdminProductService
  ) {}

  ngOnInit() {
    this.loadCategories();
    this.loadTags();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.productId = Number(id);
      this.loadProduct(this.productId);
    }
  }

  loadProduct(id: number): void {
    this.loading = true;
    this.productService.getProduct(id).subscribe({
      next: (p) => {
        this.form.patchValue({
          nombre: p.nombre,
          descripcion: p.descripcion,
          descripcionCorta: p.descripcionCorta,
          precio: p.precio,
          precioOferta: p.precioOferta || 0,
          stock: p.stock,
          sku: p.sku,
          categoriaId: p.categoriaId,
          tags: p.tags,
          ingredientes: p.ingredientes,
          peso: p.peso,
          activo: p.activo,
          destacado: p.destacado
        });
        this.selectedImage = p.imagenUrl;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  loadCategories(): void {
    // TODO: Replace with actual service call
    this.categories = [
      { id: 1, nombre: 'Chocolates en Barra', slug: 'chocolates-barra', descripcion: '', imagenUrl: '', padreId: null, activo: true },
      { id: 2, nombre: 'Bombones', slug: 'bombones', descripcion: '', imagenUrl: '', padreId: null, activo: true },
      { id: 3, nombre: 'Trufas', slug: 'trufas', descripcion: '', imagenUrl: '', padreId: null, activo: true },
      { id: 4, nombre: 'Cacao en Polvo', slug: 'cacao-polvo', descripcion: '', imagenUrl: '', padreId: null, activo: true }
    ];
  }

  loadTags(): void {
    // TODO: Replace with actual service call
    this.availableTags = [
      { id: 1, nombre: 'Orgánico', slug: 'organico', activo: true },
      { id: 2, nombre: 'Sin Azúcar', slug: 'sin-azucar', activo: true },
      { id: 3, nombre: 'Vegano', slug: 'vegano', activo: true },
      { id: 4, nombre: 'Artesanal', slug: 'artesanal', activo: true },
      { id: 5, nombre: 'Premium', slug: 'premium', activo: true }
    ];
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFiles = [file];
      const reader = new FileReader();
      reader.onload = e => this.selectedImage = e.target?.result || null;
      reader.readAsDataURL(file);
    }
  }

  toggleTag(tagId: number): void {
    const tags = this.form.get('tags')?.value || [];
    const idx = tags.indexOf(tagId);
    if (idx >= 0) {
      tags.splice(idx, 1);
    } else {
      tags.push(tagId);
    }
    this.form.get('tags')?.setValue(tags);
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.submitting = true;
    this.error = '';

    const data = this.form.value as any;
    const request = this.isEdit && this.productId
      ? this.productService.updateProduct(this.productId, data)
      : this.productService.createProduct(data);

    request.subscribe({
      next: (res) => {
        if (this.selectedFiles.length && res.id) {
          this.productService.uploadImage(res.id, this.selectedFiles[0]).subscribe();
        }
        this.router.navigate(['/products']);
      },
      error: (err) => {
        const body = err.error;
        this.error = body?.message || body?.mensaje || err.message || 'Error al guardar el producto';
        this.submitting = false;
      }
    });
  }
}
