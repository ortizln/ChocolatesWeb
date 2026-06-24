import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Categoria } from '../../shared/models';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: Categoria[] = [];
  editingCategory: Categoria | null = null;
  showForm = false;
  form = this.fb.group({
    nombre: ['', Validators.required],
    descripcion: [''],
    padreId: [0],
    activo: [true]
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories(): void {
    // TODO: Replace with actual API call
    this.categories = [
      { id: 1, nombre: 'Chocolates en Barra', slug: 'chocolates-barra', descripcion: '', imagenUrl: '', padreId: null, activo: true },
      { id: 2, nombre: 'Bombones', slug: 'bombones', descripcion: '', imagenUrl: '', padreId: null, activo: true },
      { id: 3, nombre: 'Chocolate Amargo', slug: 'chocolate-amargo', descripcion: '', imagenUrl: '', padreId: 1, activo: true },
      { id: 4, nombre: 'Chocolate con Leche', slug: 'chocolate-leche', descripcion: '', imagenUrl: '', padreId: 1, activo: true },
    ];
  }

  get parentCategories(): Categoria[] {
    return this.categories.filter(c => !c.padreId);
  }

  getChildCategories(parentId: number): Categoria[] {
    return this.categories.filter(c => c.padreId === parentId);
  }

  openNew(): void {
    this.editingCategory = null;
    this.form.reset({ activo: true, padreId: 0 });
    this.showForm = true;
  }

  openEdit(cat: Categoria): void {
    this.editingCategory = cat;
    this.form.patchValue({
      nombre: cat.nombre,
      descripcion: cat.descripcion,
      padreId: cat.padreId || 0,
      activo: cat.activo
    });
    this.showForm = true;
  }

  onDelete(id: number): void {
    if (confirm('¿Eliminar esta categoría?')) {
      this.categories = this.categories.filter(c => c.id !== id);
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    const data = this.form.value;
    if (this.editingCategory) {
      const idx = this.categories.findIndex(c => c.id === this.editingCategory!.id);
      if (idx >= 0) {
        this.categories[idx] = { ...this.categories[idx], ...data as any, padreId: data.padreId || null };
      }
    } else {
      this.categories.push({
        id: Math.max(...this.categories.map(c => c.id), 0) + 1,
        ...data as any,
        slug: (data.nombre || '').toLowerCase().replace(/\s+/g, '-'),
        imagenUrl: '',
        padreId: data.padreId || null
      });
    }
    this.showForm = false;
    this.editingCategory = null;
  }

  cancel(): void {
    this.showForm = false;
    this.editingCategory = null;
  }
}
