import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Tag } from '../../shared/models';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  tags: Tag[] = [];
  editingTag: Tag | null = null;
  form = this.fb.group({
    nombre: ['', Validators.required],
    activo: [true]
  });
  showForm = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.loadTags();
  }

  loadTags(): void {
    // TODO: Replace with actual API call
    this.tags = [
      { id: 1, nombre: 'Orgánico', slug: 'organico', activo: true },
      { id: 2, nombre: 'Sin Azúcar', slug: 'sin-azucar', activo: true },
      { id: 3, nombre: 'Vegano', slug: 'vegano', activo: true },
      { id: 4, nombre: 'Artesanal', slug: 'artesanal', activo: false },
    ];
  }

  openNew(): void {
    this.editingTag = null;
    this.form.reset({ activo: true });
    this.showForm = true;
  }

  openEdit(tag: Tag): void {
    this.editingTag = tag;
    this.form.patchValue({ nombre: tag.nombre, activo: tag.activo });
    this.showForm = true;
  }

  onDelete(id: number): void {
    if (confirm('¿Eliminar esta etiqueta?')) {
      this.tags = this.tags.filter(t => t.id !== id);
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    const data = this.form.value;
    if (this.editingTag) {
      const idx = this.tags.findIndex(t => t.id === this.editingTag!.id);
      if (idx >= 0) {
        this.tags[idx] = { ...this.tags[idx], ...data as any };
      }
    } else {
      this.tags.push({
        id: Math.max(...this.tags.map(t => t.id), 0) + 1,
        ...data as any,
        slug: (data.nombre || '').toLowerCase().replace(/\s+/g, '-')
      });
    }
    this.showForm = false;
    this.editingTag = null;
  }

  cancel(): void {
    this.showForm = false;
    this.editingTag = null;
  }
}
