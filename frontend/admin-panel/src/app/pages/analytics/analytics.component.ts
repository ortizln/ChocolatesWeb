import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, FormsModule, BaseChartDirective],
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  @ViewChild('visitasChart') visitasChart!: BaseChartDirective;
  @ViewChild('productosChart') productosChart!: BaseChartDirective;

  dateRange = 'month';
  startDate = '';
  endDate = '';

  stats = {
    totalVisitas: 28453,
    visitasHoy: 284,
    usuariosRegistrados: 12,
    tasaConversion: 3.2,
    pedidosTotales: 342,
    ingresosTotales: 45890
  };

  visitasPorDia: ChartConfiguration<'line'> = {
    type: 'line',
    data: {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
      datasets: [{
        data: [3200, 4100, 3800, 5200, 4800, 5900],
        label: 'Visitas',
        borderColor: '#4A0E4E',
        backgroundColor: 'rgba(74,14,78,0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#4A0E4E',
        pointRadius: 4
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true }, x: { grid: { display: false } } }
    }
  };

  productosMasVendidos: ChartConfiguration<'bar'> = {
    type: 'bar',
    data: {
      labels: ['Chocolate Amargo', 'Trufa de Cajú', 'Tableta de Leche', 'Bombones', 'Cacao Polvo'],
      datasets: [{
        data: [156, 134, 98, 87, 65],
        backgroundColor: ['#4A0E4E', '#D4A017', '#2E7D32', '#1565C0', '#C62828'],
        borderRadius: 8
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

  ngOnInit() {
    const now = new Date();
    this.startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
    this.endDate = now.toISOString().split('T')[0];
  }

  applyDateFilter(): void {
    // TODO: Reload chart data with new date range
  }

  exportCSV(): void {
    alert('Exportando datos a CSV...');
  }

  exportPDF(): void {
    alert('Exportando datos a PDF...');
  }

  exportExcel(): void {
    alert('Exportando datos a Excel...');
  }
}
