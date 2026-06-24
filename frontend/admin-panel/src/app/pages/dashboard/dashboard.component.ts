import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { AnalyticsData } from '../../shared/models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, BaseChartDirective],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('visitasChart') visitasChart!: BaseChartDirective;
  @ViewChild('likesChart') likesChart!: BaseChartDirective;

  stats = {
    visitasHoy: 0,
    visitasSemana: 0,
    visitasMes: 0,
    totalProductos: 0,
    totalPosts: 0,
    totalEventos: 0,
    totalUsuarios: 0,
    totalMensajes: 0
  };

  topProducts: any[] = [];
  topPosts: any[] = [];

  statCards: any[] = [];

  visitasPorDia: ChartConfiguration<'line'> = {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        data: [],
        label: 'Visitas',
        borderColor: '#4A0E4E',
        backgroundColor: 'rgba(74,14,78,0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#4A0E4E',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } },
        x: { grid: { display: false } }
      }
    }
  };

  likesPorProducto: ChartConfiguration<'doughnut'> = {
    type: 'doughnut',
    data: {
      labels: [],
      datasets: [{
        data: [],
        backgroundColor: ['#4A0E4E', '#D4A017', '#2E7D32', '#C62828', '#1565C0', '#6A1B9A', '#FF8F00'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { padding: 16, usePointStyle: true, font: { size: 12 } }
        }
      }
    }
  };

  ngOnInit() {
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    // TODO: Replace with actual API call
    // this.analyticsService.getAnalytics().subscribe(data => { ... });
    this.setMockData();
  }

  private setMockData(): void {
    this.stats = {
      visitasHoy: 284,
      visitasSemana: 1847,
      visitasMes: 8234,
      totalProductos: 24,
      totalPosts: 18,
      totalEventos: 6,
      totalUsuarios: 12,
      totalMensajes: 47
    };

    this.statCards = [
      { value: this.stats.visitasHoy, label: 'Visitas Hoy', icon: 'fa-eye', bg: '#e3f2fd', color: '#1565C0' },
      { value: this.stats.totalProductos, label: 'Productos', icon: 'fa-box', bg: '#f3e5f5', color: '#4A0E4E' },
      { value: this.stats.totalPosts, label: 'Posts', icon: 'fa-newspaper', bg: '#e8f5e9', color: '#2E7D32' },
      { value: this.stats.totalEventos, label: 'Eventos', icon: 'fa-calendar-alt', bg: '#fff3e0', color: '#E65100' },
      { value: this.stats.totalUsuarios, label: 'Usuarios', icon: 'fa-users', bg: '#e3f2fd', color: '#1565C0' },
      { value: this.stats.totalMensajes, label: 'Mensajes', icon: 'fa-envelope', bg: '#fce4ec', color: '#C62828' },
      { value: this.stats.visitasSemana, label: 'Visitas Semanales', icon: 'fa-chart-line', bg: '#f3e5f5', color: '#6A1B9A' },
      { value: this.stats.visitasMes, label: 'Visitas Mensuales', icon: 'fa-chart-bar', bg: '#e8f5e9', color: '#2E7D32' }
    ];

    this.visitasPorDia.data.labels = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    this.visitasPorDia.data.datasets[0].data = [120, 190, 170, 210, 250, 180, 140];

    this.likesPorProducto.data.labels = ['Chocolate Amargo', 'Trufa de Cajú', 'Tableta de Leche', 'Bombones Mixtos', 'Cacao Orgánico'];
    this.likesPorProducto.data.datasets[0].data = [45, 32, 28, 22, 15];

    this.topProducts = [
      { id: 1, nombre: 'Chocolate Amargo 70%', ventas: 156 },
      { id: 2, nombre: 'Trufa de Cajú', ventas: 134 },
      { id: 3, nombre: 'Tableta de Leche', ventas: 98 },
      { id: 4, nombre: 'Bombones Mixtos', ventas: 87 },
      { id: 5, nombre: 'Cacao Orgánico en Polvo', ventas: 65 }
    ];

    this.topPosts = [
      { id: 1, titulo: 'Beneficios del Cacao Orgánico', visitas: 342 },
      { id: 2, titulo: 'Cómo Elegir el Chocolate Perfecto', visitas: 289 },
      { id: 3, titulo: 'Nuestra Visita a la Finca de Cacao', visitas: 221 }
    ];
  }
}
