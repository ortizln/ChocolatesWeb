import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AdminEventService } from '../../../shared/services/admin-event.service';

@Component({
  selector: 'app-events-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './events-form.component.html',
  styleUrls: ['./events-form.component.scss']
})
export class EventsFormComponent implements OnInit {
  isEdit = false;
  eventId: number | null = null;
  loading = false;
  submitting = false;
  error = '';
  previewImage: string | ArrayBuffer | null = null;
  showImageInfo = false;
  selectedFile: File | null = null;

  form = this.fb.group({
    titulo: ['', [Validators.required, Validators.maxLength(200)]],
    descripcion: ['', Validators.maxLength(400)],
    contenido: [''],
    fechaInicio: ['', Validators.required],
    fechaFin: [''],
    hora: [''],
    lugar: [''],
    linkRegistro: [''],
    activo: [true],
    destacado: [false]
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private eventService: AdminEventService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.eventId = Number(id);
      this.loadEvent(this.eventId);
    }
  }

  loadEvent(id: number): void {
    this.loading = true;
    this.eventService.getEvent(id).subscribe({
      next: (e) => {
        this.form.patchValue({
          titulo: e.titulo,
          descripcion: e.descripcion,
          contenido: e.contenido,
          fechaInicio: e.fechaInicio,
          fechaFin: e.fechaFin,
          hora: e.hora,
          lugar: e.lugar,
          linkRegistro: e.linkRegistro,
          activo: e.activo,
          destacado: e.destacado
        });
        this.previewImage = e.imagenUrl;
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

  onSubmit(): void {
    if (this.form.invalid) return;
    this.submitting = true;
    this.error = '';
    const data = this.form.value as any;
    const request = this.isEdit && this.eventId
      ? this.eventService.updateEvent(this.eventId, data)
      : this.eventService.createEvent(data);

    request.subscribe({
      next: (res) => {
        if (this.selectedFile && res.id) {
          this.eventService.uploadImage(res.id, this.selectedFile).subscribe();
        }
        this.router.navigate(['/events']);
      },
      error: (err) => {
        this.error = err.error?.mensaje || 'Error al guardar el evento';
        this.submitting = false;
      }
    });
  }
}
