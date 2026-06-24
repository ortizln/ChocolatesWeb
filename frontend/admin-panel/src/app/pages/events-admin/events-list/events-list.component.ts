import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminEventService } from '../../../shared/services/admin-event.service';
import { Evento } from '../../../shared/models';

@Component({
  selector: 'app-events-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {
  events: Evento[] = [];
  filteredEvents: Evento[] = [];
  search = '';
  filterActive = '';
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;

  constructor(private eventService: AdminEventService) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents(): void {
    const params: any = { page: this.currentPage - 1, size: this.pageSize };
    if (this.search) params.search = this.search;
    this.eventService.getEvents(params).subscribe({
      next: (res) => {
        this.events = res.content || res;
        this.totalItems = res.totalElements || this.events.length;
        this.applyFilter();
      }
    });
  }

  applyFilter(): void {
    let filtered = this.events;
    if (this.search) {
      const s = this.search.toLowerCase();
      filtered = filtered.filter(e => e.titulo.toLowerCase().includes(s));
    }
    if (this.filterActive) {
      filtered = filtered.filter(e => this.filterActive === 'active' ? e.activo : !e.activo);
    }
    this.filteredEvents = filtered;
  }

  deleteEvent(id: number): void {
    if (confirm('¿Eliminar este evento?')) {
      this.eventService.deleteEvent(id).subscribe(() => this.loadEvents());
    }
  }
}
