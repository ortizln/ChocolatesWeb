import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  currentSlide = 0;
  featuredIndex = 0;
  testimonialIndex = 0;
  promotionSlide = 0;
  visitorCount = 0;
  visitorAnimation = false;
  isVisible = false;
  private observer: IntersectionObserver | null = null;
  private countInterval: ReturnType<typeof setInterval> | null = null;
  private slideInterval: ReturnType<typeof setInterval> | null = null;
  private featuredInterval: ReturnType<typeof setInterval> | null = null;
  private testimonialInterval: ReturnType<typeof setInterval> | null = null;
  private promotionInterval: ReturnType<typeof setInterval> | null = null;

  heroSlides = [
    { title: 'Chocolate Artesanal', subtitle: 'Hecho con Amor', description: 'Descubre el sabor inigualable de nuestros chocolates elaborados con ingredientes naturales y recetas tradicionales.', image: 'assets/images/hero-1.jpg', cta: 'Ver Productos', link: '/productos' },
    { title: 'Ediciones Especiales', subtitle: 'Temporada 2026', description: 'Nuevas creaciones con los mejores ingredientes del mundo para los paladares más exigentes.', image: 'assets/images/hero-2.jpg', cta: 'Descubrir', link: '/productos' },
    { title: 'Regalos con Estilo', subtitle: 'Para Momentos Especiales', description: 'Sorprende con nuestros exclusivos empaques y cajas de chocolate personalizadas para cualquier ocasión.', image: 'assets/images/hero-3.jpg', cta: 'Ver Colección', link: '/productos' }
  ];

  categories = [
    { name: 'Chocolate Oscuro', icon: 'fas fa-cube', count: 12, color: '#3E2723' },
    { name: 'Chocolate con Leche', icon: 'fas fa-cube', count: 8, color: '#6D4C41' },
    { name: 'Chocolate Blanco', icon: 'fas fa-cube', count: 6, color: '#D7CCC8' },
    { name: 'Rellenos', icon: 'fas fa-cube', count: 10, color: '#4E342E' },
    { name: 'Trufas', icon: 'fas fa-circle', count: 15, color: '#5D4037' },
    { name: 'Cajas de Regalo', icon: 'fas fa-gift', count: 9, color: '#4A0E4E' }
  ];

  featuredProducts = [
    { id: 1, name: 'Chocolate Oscuro 70% Cacao', slug: 'chocolate-oscuro-70', code: 'CHO-001', categoryName: 'Chocolate Oscuro', price: 35.00, imageUrl: 'assets/images/product-1.jpg', likesCount: 128, viewsCount: 1543, isFeatured: true, discountPrice: null as number | null },
    { id: 2, name: 'Trufa de Maracuyá', slug: 'trufa-maracuya', code: 'TRF-003', categoryName: 'Trufas', price: 28.00, imageUrl: 'assets/images/product-2.jpg', likesCount: 95, viewsCount: 892, isFeatured: true, discountPrice: 24.00 },
    { id: 3, name: 'Caja Degustación 12 Piezas', slug: 'caja-degustacion-12', code: 'CAJ-001', categoryName: 'Cajas de Regalo', price: 89.00, imageUrl: 'assets/images/product-3.jpg', likesCount: 210, viewsCount: 2341, isFeatured: true, discountPrice: null },
    { id: 4, name: 'Chocolate con Leche y Almendras', slug: 'chocolate-leche-almendras', code: 'CHO-008', categoryName: 'Chocolate con Leche', price: 32.00, imageUrl: 'assets/images/product-4.jpg', likesCount: 67, viewsCount: 721, isFeatured: true, discountPrice: null },
    { id: 5, name: 'Bombones Surtidos', slug: 'bombones-surtidos', code: 'BOM-001', categoryName: 'Rellenos', price: 45.00, imageUrl: 'assets/images/product-5.jpg', likesCount: 156, viewsCount: 1890, isFeatured: true, discountPrice: 39.00 },
    { id: 6, name: 'Tableta Chocolate Blanco con Frutas', slug: 'tableta-chocolate-blanco', code: 'CHO-012', categoryName: 'Chocolate Blanco', price: 30.00, imageUrl: 'assets/images/product-6.jpg', likesCount: 83, viewsCount: 945, isFeatured: true, discountPrice: null }
  ];

  promotions = [
    { title: '2x1 en Trufas', description: 'Lleva 2 cajas de trufas al precio de 1. Válido todos los martes.', image: 'assets/images/promo-1.jpg', validUntil: '31 Mar 2026', code: 'TRUFA2X1' },
    { title: '10% de Descuento', description: 'En tu primera compra online usando nuestro código.', image: 'assets/images/promo-2.jpg', validUntil: '30 Jun 2026', code: 'PRIMERA10' },
    { title: 'Caja Regalo + Envío Gratis', description: 'En compras mayores a S/150 recibe envío gratis a todo Perú.', image: 'assets/images/promo-3.jpg', validUntil: '31 Dic 2026', code: 'ENVIOFREE' }
  ];

  testimonials = [
    { name: 'María García', role: 'Cliente Frecuente', avatar: 'assets/images/avatar-1.jpg', content: 'Los mejores chocolates que he probado. La calidad y el sabor son incomparables. Desde que los descubrí, son mi opción favorita para regalar.', rating: 5 },
    { name: 'Carlos Mendoza', role: 'Crítico Gastronómico', avatar: 'assets/images/avatar-2.jpg', content: 'Una experiencia sensorial única. Cada bocado revela la dedicación y el cuidado en la selección de ingredientes. Altamente recomendados.', rating: 5 },
    { name: 'Ana Torres', role: 'Pastelera Profesional', avatar: 'assets/images/avatar-3.jpg', content: 'Uso sus chocolates en mis creaciones y el resultado es espectacular. La consistencia y el sabor son perfectos para repostería de alta calidad.', rating: 4 },
    { name: 'Pedro Sánchez', role: 'Cliente Corporativo', avatar: 'assets/images/avatar-4.jpg', content: 'Excelente servicio para pedidos corporativos. Siempre puntuales y con una presentación impecable. Nuestros clientes quedan encantados.', rating: 5 }
  ];

  blogPosts = [
    { id: 1, title: 'El Origen del Cacao Peruano', slug: 'origen-cacao-peruano', summary: 'Descubre la historia y las variedades del cacao peruano, considerado uno de los mejores del mundo por su sabor y aroma únicos.', image: 'assets/images/blog-1.jpg', author: 'Chef Carlos', date: '15 May 2026', category: 'Historia' },
    { id: 2, title: 'Cómo Degustar Chocolate como un Experto', slug: 'degustar-chocolate-experto', summary: 'Aprende las técnicas profesionales para apreciar todas las notas y matices del chocolate artesanal.', image: 'assets/images/blog-2.jpg', author: 'María Fernanda', date: '10 May 2026', category: 'Consejos' },
    { id: 3, title: 'Beneficios del Chocolate Oscuro para la Salud', slug: 'beneficios-chocolate-oscuro', summary: 'Conoce las propiedades antioxidantes y los beneficios cardiovasculares del chocolate con alto contenido de cacao.', image: 'assets/images/blog-3.jpg', author: 'Dra. Laura', date: '5 May 2026', category: 'Salud' }
  ];

  events = [
    { title: 'Feria del Chocolate 2026', date: '20 Jul 2026', time: '10:00 AM', location: 'Centro de Convenciones', type: 'Feria', image: 'assets/images/event-1.jpg' },
    { title: 'Taller de Elaboración de Chocolates', date: '15 Ago 2026', time: '3:00 PM', location: 'Nuestra Fábrica', type: 'Taller', image: 'assets/images/event-2.jpg' },
    { title: 'Lanzamiento Colección Otoño', date: '10 Sep 2026', time: '7:00 PM', location: 'Showroom Principal', type: 'Lanzamiento', image: 'assets/images/event-3.jpg' }
  ];

  socialGallery = [
    { image: 'assets/images/social-1.jpg', platform: 'instagram' },
    { image: 'assets/images/social-2.jpg', platform: 'instagram' },
    { image: 'assets/images/social-3.jpg', platform: 'instagram' },
    { image: 'assets/images/social-4.jpg', platform: 'instagram' },
    { image: 'assets/images/social-5.jpg', platform: 'instagram' },
    { image: 'assets/images/social-6.jpg', platform: 'instagram' }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.startAutoplay();
      this.initIntersectionObserver();
      this.startVisitorCounter();
    }
  }

  ngOnDestroy(): void {
    this.stopAll();
    if (this.observer) this.observer.disconnect();
  }

  private stopAll(): void {
    if (this.slideInterval) clearInterval(this.slideInterval);
    if (this.featuredInterval) clearInterval(this.featuredInterval);
    if (this.testimonialInterval) clearInterval(this.testimonialInterval);
    if (this.promotionInterval) clearInterval(this.promotionInterval);
    if (this.countInterval) clearInterval(this.countInterval);
  }

  private startAutoplay(): void {
    this.slideInterval = setInterval(() => this.nextSlide(), 6000);
    this.featuredInterval = setInterval(() => this.nextFeatured(), 5000);
    this.testimonialInterval = setInterval(() => this.nextTestimonial(), 4000);
    this.promotionInterval = setInterval(() => this.nextPromotion(), 5000);
  }

  private initIntersectionObserver(): void {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          if (entry.target.classList.contains('visitor-section')) {
            this.startCountUp();
          }
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    setTimeout(() => {
      document.querySelectorAll('.fade-in-section').forEach(el => this.observer?.observe(el));
    }, 100);
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (!this.visitorAnimation) {
      const el = document.querySelector('.visitor-section');
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          this.startCountUp();
        }
      }
    }
  }

  private startVisitorCounter(): void {
    this.visitorCount = 0;
    const target = 15428;
    if (this.countInterval) clearInterval(this.countInterval);
    const steps = 100;
    const increment = target / steps;
    let current = 0;
    this.countInterval = setInterval(() => {
      current += increment;
      if (current >= target) {
        this.visitorCount = target;
        if (this.countInterval) clearInterval(this.countInterval);
      } else {
        this.visitorCount = Math.floor(current);
      }
    }, 30);
  }

  private startCountUp(): void {
    if (this.visitorAnimation) return;
    this.visitorAnimation = true;
    this.startVisitorCounter();
  }

  getStarsArray(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i < rating ? 1 : 0);
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
    this.resetSlideInterval();
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.heroSlides.length;
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.heroSlides.length) % this.heroSlides.length;
  }

  nextFeatured(): void {
    const total = Math.ceil(this.featuredProducts.length / 3);
    this.featuredIndex = (this.featuredIndex + 1) % total;
  }

  prevFeatured(): void {
    const total = Math.ceil(this.featuredProducts.length / 3);
    this.featuredIndex = (this.featuredIndex - 1 + total) % total;
  }

  nextTestimonial(): void {
    this.testimonialIndex = (this.testimonialIndex + 1) % this.testimonials.length;
  }

  prevTestimonial(): void {
    this.testimonialIndex = (this.testimonialIndex - 1 + this.testimonials.length) % this.testimonials.length;
  }

  nextPromotion(): void {
    this.promotionSlide = (this.promotionSlide + 1) % this.promotions.length;
  }

  prevPromotion(): void {
    this.promotionSlide = (this.promotionSlide - 1 + this.promotions.length) % this.promotions.length;
  }

  private resetSlideInterval(): void {
    if (this.slideInterval) clearInterval(this.slideInterval);
    this.slideInterval = setInterval(() => this.nextSlide(), 6000);
  }

  get featuredPages(): number[] {
    return Array(Math.ceil(this.featuredProducts.length / 3)).fill(0).map((_, i) => i);
  }
}
