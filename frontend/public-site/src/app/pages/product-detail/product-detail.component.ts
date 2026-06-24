import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../shared/models';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductCardComponent],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  selectedImageIndex = 0;
  isLiked = false;
  isLightboxOpen = false;
  lightboxIndex = 0;
  activeTab: 'description' | 'ingredients' | 'nutritional' = 'description';
  relatedProducts: any[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      if (slug) {
        this.loadProduct(slug);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  private loadProduct(slug: string): void {
    this.loading = true;
    this.productService.getBySlug(slug).subscribe({
      next: (p) => {
        this.product = p;
        this.loading = false;
        this.loadRelated();
      },
      error: () => this.loading = false
    });
  }

  private loadRelated(): void {
    if (!this.product) return;
    this.productService.getRelated(this.product.id, 4).subscribe({
      next: (products) => {
        this.relatedProducts = products;
      },
      error: () => {}
    });
  }

  selectImage(index: number): void {
    this.selectedImageIndex = index;
  }

  toggleLike(): void {
    if (!this.product) return;
    if (this.isLiked) {
      this.product.likesCount--;
    } else {
      this.product.likesCount++;
      this.productService.likeProduct(this.product.id).subscribe();
    }
    this.isLiked = !this.isLiked;
  }

  openLightbox(index: number): void {
    this.lightboxIndex = index;
    this.isLightboxOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeLightbox(): void {
    this.isLightboxOpen = false;
    document.body.style.overflow = '';
  }

  setTab(tab: 'description' | 'ingredients' | 'nutritional'): void {
    this.activeTab = tab;
  }

  shareOnFacebook(): void {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
  }

  shareOnTwitter(): void {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(this.product?.name || '')}`, '_blank');
  }

  shareOnWhatsApp(): void {
    window.open(`https://wa.me/?text=${encodeURIComponent(`${this.product?.name} - ${window.location.href}`)}`, '_blank');
  }

  copyLink(): void {
    navigator.clipboard.writeText(window.location.href);
  }

  getStarsArray(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i < rating ? 1 : 0);
  }
}
