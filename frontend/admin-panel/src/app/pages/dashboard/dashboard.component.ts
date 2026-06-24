import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, BaseChartDirective],
  templateUrl: './dashboard.component.html',
  styles: [':host { display: contents; }']
})
export class DashboardComponent implements OnInit {
  statCards: any[] = [];

  visitasPorDia: ChartConfiguration<'line'> = {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        data: [],
        label: 'Visitas',
        borderColor: '#4A6B3F',
        backgroundColor: 'rgba(74,107,63,0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#4A6B3F',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
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
        backgroundColor: ['#4A6B3F', '#5B9B8C', '#6B8F5E', '#7DBDB0', '#3A5A2F'],
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

  topProducts: any[] = [];
  topPosts: any[] = [];

  ngOnInit() {
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    this.setMockData();
  }

  private setMockData(): void {
    this.statCards = [
      { value: 284, label: 'Visitas Hoy', icon: 'fa-eye', bg: '#E6F7EE', color: '#48BB78', trend: 12 },
      { value: 24, label: 'Productos', icon: 'fa-box', bg: '#F0F5EE', color: '#4A6B3F', trend: 8 },
      { value: 18, label: 'Posts', icon: 'fa-newspaper', bg: '#EEF6F4', color: '#5B9B8C', trend: 5 },
      { value: 6, label: 'Eventos', icon: 'fa-calendar-alt', bg: '#FEF3E2', color: '#ED8936' },
      { value: 12, label: 'Usuarios', icon: 'fa-users', bg: '#E0F5FE', color: '#4FD1C5' },
      { value: 47, label: 'Mensajes', icon: 'fa-envelope', bg: '#FDE8E8', color: '#FC5454' },
      { value: 1847, label: 'Visitas Semanales', icon: 'fa-chart-line', bg: '#F0F5EE', color: '#4A6B3F', trend: -3 },
      { value: 8234, label: 'Visitas Mensuales', icon: 'fa-chart-bar', bg: '#EEF6F4', color: '#5B9B8C', trend: 15 }
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
