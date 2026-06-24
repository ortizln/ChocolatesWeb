import { Component, OnInit } from '@angular/core';
import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [NgClass, NgFor, NgIf, NgStyle, RouterLink],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  activeCategory: string = 'todas';
  currentPage = 1;
  totalPages = 3;

  categories = [
    { key: 'todas', name: 'Todas', icon: 'fa-newspaper' },
    { key: 'historia', name: 'Historia', icon: 'fa-history' },
    { key: 'consejos', name: 'Consejos', icon: 'fa-lightbulb' },
    { key: 'salud', name: 'Salud', icon: 'fa-heartbeat' },
    { key: 'recetas', name: 'Recetas', icon: 'fa-utensils' },
    { key: 'eventos', name: 'Eventos', icon: 'fa-calendar-alt' }
  ];

  posts = [
    { id: 1, title: 'El Origen del Cacao Peruano', slug: 'origen-cacao-peruano', summary: 'Descubre la historia y las variedades del cacao peruano, considerado uno de los mejores del mundo por su sabor y aroma únicos.', content: '', image: 'assets/images/blog-1.jpg', author: 'Chef Carlos', authorAvatar: 'assets/images/author-1.jpg', date: '15 May 2026', category: 'Historia', tags: ['cacao', 'perú', 'origen'] },
    { id: 2, title: 'Cómo Degustar Chocolate como un Experto', slug: 'degustar-chocolate-experto', summary: 'Aprende las técnicas profesionales para apreciar todas las notas y matices del chocolate artesanal.', content: '', image: 'assets/images/blog-2.jpg', author: 'María Fernanda', authorAvatar: 'assets/images/author-2.jpg', date: '10 May 2026', category: 'Consejos', tags: ['degustación', 'técnicas'] },
    { id: 3, title: 'Beneficios del Chocolate Oscuro para la Salud', slug: 'beneficios-chocolate-oscuro', summary: 'Conoce las propiedades antioxidantes y los beneficios cardiovasculares del chocolate con alto contenido de cacao.', content: '', image: 'assets/images/blog-3.jpg', author: 'Dra. Laura', authorAvatar: 'assets/images/author-3.jpg', date: '5 May 2026', category: 'Salud', tags: ['salud', 'antioxidantes'] },
    { id: 4, title: 'Receta: Brownies de Chocolate Artesanal', slug: 'receta-brownies-chocolate', summary: 'Aprende a preparar los brownies más deliciosos con nuestro chocolate artesanal.', content: '', image: 'assets/images/blog-4.jpg', author: 'Chef Carlos', authorAvatar: 'assets/images/author-1.jpg', date: '28 Abr 2026', category: 'Recetas', tags: ['receta', 'brownies'] },
    { id: 5, title: 'Feria del Chocolate 2026: Lo que Debes Saber', slug: 'feria-chocolate-2026', summary: 'Todo sobre la próxima feria del chocolate, los expositores y las actividades programadas.', content: '', image: 'assets/images/blog-5.jpg', author: 'María Fernanda', authorAvatar: 'assets/images/author-2.jpg', date: '20 Abr 2026', category: 'Eventos', tags: ['feria', 'evento'] },
    { id: 6, title: 'El Proceso de Elaboración del Chocolate', slug: 'proceso-elaboracion-chocolate', summary: 'Desde el grano de cacao hasta la tableta: conoce cada paso del proceso artesanal.', content: '', image: 'assets/images/blog-6.jpg', author: 'Chef Carlos', authorAvatar: 'assets/images/author-1.jpg', date: '15 Abr 2026', category: 'Historia', tags: ['proceso', 'elaboración'] }
  ];

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  setCategory(key: string): void {
    this.activeCategory = key;
    this.currentPage = 1;
  }

  get filteredPosts() {
    if (this.activeCategory === 'todas') return this.posts;
    const catName = this.categories.find(c => c.key === this.activeCategory)?.name || '';
    return this.posts.filter(p => p.category === catName);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
