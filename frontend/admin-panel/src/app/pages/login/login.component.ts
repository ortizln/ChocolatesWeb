import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';

interface CarouselItem {
  image: string;
  title: string;
  subtitle: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
  loading = false;
  error = '';
  currentSlide = 0;
  private intervalId: any;

  carouselItems: CarouselItem[] = [
    { image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=800&q=80', title: 'Chocolate Oscuro 70%', subtitle: 'Intenso y puro, ideal para los paladares más exigentes' },
    { image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=800&q=80', title: 'Trufas Artesanales', subtitle: 'Delicadas trufas rellenas con los mejores ingredientes' },
    { image: 'https://images.unsplash.com/photo-1622973536968-3ead9e780960?w=800&q=80', title: 'Bombones Surtidos', subtitle: 'Una selección especial de bombones para cada ocasión' },
    { image: 'https://images.unsplash.com/photo-1601370690183-1c7796ecec61?w=800&q=80', title: 'Cajas de Regalo', subtitle: 'Presentaciones elegantes para regalar momentos dulces' }
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.startCarousel();
  }

  ngOnDestroy(): void {
    this.stopCarousel();
  }

  private startCarousel(): void {
    this.intervalId = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.carouselItems.length;
    }, 5000);
  }

  private stopCarousel(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
    this.stopCarousel();
    this.startCarousel();
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;
    this.loading = true;
    this.error = '';
    this.authService.login(this.loginForm.value as any).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => {
        this.error = err.error?.mensaje || 'Credenciales inválidas';
        this.loading = false;
      }
    });
  }
}
