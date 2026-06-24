import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { ProductService } from '../../shared/services/product.service';
import { Product, Category } from '../../shared/models';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ProductCardComponent],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  searchTerm = '';
  sortBy = 'default';
  currentPage = 1;
  pageSize = 12;
  totalPages = 0;
  selectedCategory: number | null = null;
  isFilterOpen = false;
  isGridView = true;
  showSearchResults = false;
  totalProductCount = 0;
  loading = false;

  categories: Category[] = [];
  products: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe({
      next: (cats) => this.categories = cats,
      error: () => {}
    });
  }

  loadProducts(): void {
    this.loading = true;
    const params: Record<string, string | number | boolean> = {
      page: this.currentPage - 1,
      size: this.pageSize
    };
    if (this.selectedCategory) params['category'] = this.selectedCategory;
    if (this.sortBy === 'price-asc') params['sort'] = 'price,asc';
    else if (this.sortBy === 'price-desc') params['sort'] = 'price,desc';
    else if (this.sortBy === 'name-asc') params['sort'] = 'name,asc';
    else if (this.sortBy === 'name-desc') params['sort'] = 'name,desc';

    const req = this.showSearchResults && this.searchTerm.trim()
      ? this.productService.search(this.searchTerm.trim(), params)
      : this.productService.getProducts(params);

    req.subscribe({
      next: (res) => {
        this.products = res.data;
        this.totalProductCount = res.totalCount;
        this.totalPages = res.totalPages;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  filterByCategory(categoryId: number | null): void {
    this.selectedCategory = categoryId;
    this.currentPage = 1;
    this.loadProducts();
  }

  clearCategoryFilter(): void {
    this.selectedCategory = null;
    this.currentPage = 1;
    this.loadProducts();
  }

  toggleFilter(): void {
    this.isFilterOpen = !this.isFilterOpen;
  }

  toggleView(): void {
    this.isGridView = !this.isGridView;
  }

  onSearch(): void {
    this.showSearchResults = this.searchTerm.trim().length > 0;
    this.currentPage = 1;
    this.loadProducts();
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.showSearchResults = false;
    this.loadProducts();
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.loadProducts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  getSortLabel(): string {
    const labels: Record<string, string> = {
      'default': 'Ordenar por',
      'price-asc': 'Precio: Menor a Mayor',
      'price-desc': 'Precio: Mayor a Menor',
      'name-asc': 'Nombre: A-Z',
      'name-desc': 'Nombre: Z-A',
      'popular': 'Más Populares'
    };
    return labels[this.sortBy] || 'Ordenar por';
  }
}
