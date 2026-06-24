import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AdminPostService } from '../../../shared/services/admin-post.service';

@Component({
  selector: 'app-blog-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.scss']
})
export class BlogFormComponent implements OnInit {
  isEdit = false;
  postId: number | null = null;
  loading = false;
  submitting = false;
  error = '';
  previewImage: string | ArrayBuffer | null = null;
  showImageInfo = false;
  selectedFile: File | null = null;

  form = this.fb.group({
    titulo: ['', [Validators.required, Validators.maxLength(200)]],
    contenido: ['', Validators.required],
    extracto: ['', Validators.maxLength(400)],
    autor: ['', Validators.required],
    categoria: [''],
    tags: [[] as string[]],
    estado: ['BORRADOR' as 'BORRADOR' | 'PUBLICADO' | 'PROGRAMADO'],
    fechaProgramacion: ['']
  });

  tagInput = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private postService: AdminPostService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.postId = Number(id);
      this.loadPost(this.postId);
    }
  }

  loadPost(id: number): void {
    this.loading = true;
    this.postService.getPost(id).subscribe({
      next: (p) => {
        this.form.patchValue({
          titulo: p.titulo,
          contenido: p.contenido,
          extracto: p.extracto,
          autor: p.autor,
          categoria: p.categoria,
          tags: p.tags,
          estado: p.estado,
          fechaProgramacion: p.fechaProgramacion
        });
        this.previewImage = p.imagenDestacada;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  onImageSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = e => this.previewImage = e.target?.result || null;
      reader.readAsDataURL(this.selectedFile);
    }
  }

  addTag(): void {
    const tag = this.tagInput.trim();
    if (tag) {
      const tags = this.form.get('tags')?.value || [];
      if (!tags.includes(tag)) {
        tags.push(tag);
        this.form.get('tags')?.setValue(tags);
      }
      this.tagInput = '';
    }
  }

  removeTag(tag: string): void {
    const tags = this.form.get('tags')?.value || [];
    this.form.get('tags')?.setValue(tags.filter(t => t !== tag));
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.submitting = true;
    this.error = '';

    const data = this.form.value as any;
    const request = this.isEdit && this.postId
      ? this.postService.updatePost(this.postId, data)
      : this.postService.createPost(data);

    request.subscribe({
      next: (res) => {
        if (this.selectedFile && res.id) {
          this.postService.uploadImage(res.id, this.selectedFile).subscribe();
        }
        this.router.navigate(['/blog']);
      },
      error: (err) => {
        this.error = err.error?.mensaje || 'Error al guardar el post';
        this.submitting = false;
      }
    });
  }
}
