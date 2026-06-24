import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminPostService } from '../../../shared/services/admin-post.service';
import { Post } from '../../../shared/models';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {
  posts: Post[] = [];
  filteredPosts: Post[] = [];
  search = '';
  statusFilter = '';
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  loading = false;

  constructor(private postService: AdminPostService) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts(): void {
    this.loading = true;
    const params: any = { page: this.currentPage - 1, size: this.pageSize };
    if (this.search) params.search = this.search;
    if (this.statusFilter) params.estado = this.statusFilter;
    this.postService.getPosts(params).subscribe({
      next: (res) => {
        this.posts = res.content || res;
        this.totalItems = res.totalElements || this.posts.length;
        this.applyFilter();
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  applyFilter(): void {
    let filtered = this.posts;
    if (this.search) {
      const s = this.search.toLowerCase();
      filtered = filtered.filter(p => p.titulo.toLowerCase().includes(s));
    }
    if (this.statusFilter) {
      filtered = filtered.filter(p => p.estado === this.statusFilter);
    }
    this.filteredPosts = filtered;
  }

  deletePost(id: number): void {
    if (confirm('¿Eliminar este post?')) {
      this.postService.deletePost(id).subscribe(() => this.loadPosts());
    }
  }

  getStatusClass(estado: string): string {
    switch (estado) {
      case 'PUBLICADO': return 'active';
      case 'BORRADOR': return 'pending';
      case 'PROGRAMADO': return 'inactive';
      default: return '';
    }
  }
}
