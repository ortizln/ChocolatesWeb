import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminProductService } from '../../../shared/services/admin-product.service';
import { Product } from '../../../shared/models';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  search = '';
  statusFilter = '';
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  loading = false;

  constructor(private productService: AdminProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    const params: any = { page: this.currentPage - 1, size: this.pageSize };
    if (this.search) params.search = this.search;
    if (this.statusFilter) params.activo = this.statusFilter === 'active';
    this.productService.getProducts(params).subscribe({
      next: (res) => {
        this.products = res.content || res;
        this.totalItems = res.totalElements || this.products.length;
        this.applyFilter();
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  applyFilter(): void {
    let filtered = this.products;
    if (this.search) {
      const s = this.search.toLowerCase();
      filtered = filtered.filter(p => p.nombre.toLowerCase().includes(s) || p.sku?.toLowerCase().includes(s));
    }
    if (this.statusFilter) {
      filtered = filtered.filter(p => this.statusFilter === 'active' ? p.activo : !p.activo);
    }
    this.filteredProducts = filtered;
  }

  toggleStatus(product: Product): void {
    this.productService.toggleStatus(product.id).subscribe(() => {
      product.activo = !product.activo;
    });
  }

  deleteProduct(id: number): void {
    if (confirm('¿Eliminar este producto?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.loadProducts();
      });
    }
  }

  getStatusClass(activo: boolean): string {
    return activo ? 'active' : 'inactive';
  }
}
