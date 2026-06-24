import { Component, OnInit } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [NgClass, NgFor, NgIf, RouterLink],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  showPastEvents = false;
  activeType: string = 'todos';

  upcoming = [
    { id: 1, title: 'Feria del Chocolate 2026', slug: 'feria-chocolate-2026', description: 'La feria más importante del año con expositores nacionales e internacionales, catas, talleres y concursos.', image: 'assets/images/event-1.jpg', date: '20 Julio, 2026', day: '20', month: 'Jul', time: '10:00 AM - 9:00 PM', location: 'Centro de Convenciones, Lima', type: 'Feria' },
    { id: 2, title: 'Taller de Elaboración de Chocolates', slug: 'taller-elaboracion-chocolates', description: 'Aprende las técnicas básicas para elaborar tus propios chocolates artesanales en nuestro taller guiado.', image: 'assets/images/event-2.jpg', date: '15 Agosto, 2026', day: '15', month: 'Ago', time: '3:00 PM - 6:00 PM', location: 'Nuestra Fábrica, Miraflores', type: 'Taller' },
    { id: 3, title: 'Lanzamiento Colección Otoño', slug: 'lanzamiento-coleccion-otono', description: 'Presentación exclusiva de nuestra nueva colección de chocolates de temporada con degustación incluida.', image: 'assets/images/event-3.jpg', date: '10 Septiembre, 2026', day: '10', month: 'Sep', time: '7:00 PM - 10:00 PM', location: 'Showroom Principal, San Isidro', type: 'Lanzamiento' },
    { id: 4, title: 'Cata de Chocolates Premium', slug: 'cata-chocolates-premium', description: 'Una experiencia sensorial única guiada por nuestro maestro chocolatero, explorando 8 variedades de chocolate.', image: 'assets/images/event-4.jpg', date: '5 Octubre, 2026', day: '05', month: 'Oct', time: '6:00 PM - 8:00 PM', location: 'Hotel Bolívar, Centro', type: 'Cata' }
  ];

  past = [
    { id: 5, title: 'Chocolates para San Valentín', slug: 'chocolates-san-valentin', description: 'Taller especial para parejas donde aprenderán a hacer chocolates juntos.', image: 'assets/images/event-5.jpg', date: '14 Febrero, 2026', day: '14', month: 'Feb', time: '4:00 PM - 7:00 PM', location: 'Nuestra Fábrica', type: 'Taller' },
    { id: 6, title: 'Navidad Dulce 2025', slug: 'navidad-dulce-2025', description: 'Celebración navideña con nuestros productos especiales de temporada.', image: 'assets/images/event-6.jpg', date: '20 Diciembre, 2025', day: '20', month: 'Dic', time: '10:00 AM - 8:00 PM', location: 'Centro Comercial', type: 'Feria' }
  ];

  eventTypes = [
    { key: 'todos', name: 'Todos', icon: 'fa-calendar-alt' },
    { key: 'Feria', name: 'Ferias', icon: 'fa-store' },
    { key: 'Taller', name: 'Talleres', icon: 'fa-chalkboard-teacher' },
    { key: 'Lanzamiento', name: 'Lanzamientos', icon: 'fa-rocket' },
    { key: 'Cata', name: 'Catas', icon: 'fa-wine-glass-alt' }
  ];

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggleEvents(past: boolean): void {
    this.showPastEvents = past;
  }

  setType(key: string): void {
    this.activeType = key;
  }

  get activeEvents() {
    const events = this.showPastEvents ? this.past : this.upcoming;
    if (this.activeType === 'todos') return events;
    return events.filter(e => e.type === this.activeType);
  }
}
