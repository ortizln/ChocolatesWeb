import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../shared/models';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  editingUser: User | null = null;
  showForm = false;
  showPasswordForm = false;
  passwordForm = this.fb.group({
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  });

  userForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    nombre: ['', Validators.required],
    role: ['EDITOR' as 'ADMIN' | 'EDITOR' | 'VIEWER'],
    activo: [true]
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(): void {
    this.users = [
      { id: 1, username: 'admin', email: 'admin@chocolatesweb.com', nombre: 'Administrador', role: 'ADMIN', activo: true, fechaCreacion: '2026-01-01' },
      { id: 2, username: 'editor1', email: 'editor@chocolatesweb.com', nombre: 'María Editor', role: 'EDITOR', activo: true, fechaCreacion: '2026-02-15' },
      { id: 3, username: 'visor1', email: 'visor@chocolatesweb.com', nombre: 'Carlos Visor', role: 'VIEWER', activo: false, fechaCreacion: '2026-03-10' },
    ];
  }

  get roleBadgeClass(): Record<string, string> {
    return {
      'ADMIN': 'bg-danger',
      'EDITOR': 'bg-primary',
      'VIEWER': 'bg-secondary'
    };
  }

  openNew(): void {
    this.editingUser = null;
    this.userForm.reset({ role: 'EDITOR', activo: true });
    this.showForm = true;
  }

  openEdit(user: User): void {
    this.editingUser = user;
    this.userForm.patchValue({
      username: user.username,
      email: user.email,
      nombre: user.nombre,
      role: user.role,
      activo: user.activo
    });
    this.showForm = true;
  }

  openPassword(user: User): void {
    this.editingUser = user;
    this.passwordForm.reset();
    this.showPasswordForm = true;
  }

  onSubmit(): void {
    if (this.userForm.invalid) return;
    const data = this.userForm.value;
    if (this.editingUser) {
      const idx = this.users.findIndex(u => u.id === this.editingUser!.id);
      if (idx >= 0) {
        this.users[idx] = { ...this.users[idx], ...data as any };
      }
    } else {
      this.users.push({
        id: Math.max(...this.users.map(u => u.id), 0) + 1,
        ...data as any,
        fechaCreacion: new Date().toISOString()
      });
    }
    this.showForm = false;
    this.editingUser = null;
  }

  onChangePassword(): void {
    if (this.passwordForm.invalid) return;
    if (this.passwordForm.value.newPassword !== this.passwordForm.value.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    alert('Contraseña actualizada correctamente');
    this.showPasswordForm = false;
    this.editingUser = null;
  }

  toggleStatus(user: User): void {
    user.activo = !user.activo;
  }

  cancel(): void {
    this.showForm = false;
    this.showPasswordForm = false;
    this.editingUser = null;
  }

  deleteUser(id: number): void {
    if (confirm('¿Eliminar este usuario?')) {
      this.users = this.users.filter(u => u.id !== id);
    }
  }
}
