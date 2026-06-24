import { Component, OnInit } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NgClass, NgFor, NgIf, RouterLink],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  team = [
    { name: 'Carlos Mendoza', role: 'Maestro Chocolatero Fundador', image: 'assets/images/team-1.jpg', bio: 'Con más de 30 años de experiencia, es el alma creativa detrás de cada receta.' },
    { name: 'María Fernanda', role: 'Directora de Innovación', image: 'assets/images/team-2.jpg', bio: 'Lidera el desarrollo de nuevas líneas de productos y procesos innovadores.' },
    { name: 'José Torres', role: 'Jefe de Producción', image: 'assets/images/team-3.jpg', bio: 'Supervisa cada etapa del proceso de elaboración garantizando la máxima calidad.' },
    { name: 'Ana Lucía', role: 'Directora de Marketing', image: 'assets/images/team-4.jpg', bio: 'Responsable de comunicar la pasión por el chocolate a nuestros clientes.' }
  ];

  awards = [
    { title: 'Mejor Chocolate Artesanal', year: '2025', organization: 'International Chocolate Awards', icon: 'fas fa-trophy' },
    { title: 'Premio a la Innovación', year: '2024', organization: 'Cacao & Chocolate Expo', icon: 'fas fa-lightbulb' },
    { title: 'Sello de Comercio Justo', year: '2024', organization: 'Fair Trade International', icon: 'fas fa-handshake' },
    { title: 'Excelencia en Sostenibilidad', year: '2023', organization: 'Premios Verdes', icon: 'fas fa-leaf' },
    { title: 'Mejor Cacao Peruano', year: '2023', organization: 'Salón del Cacao', icon: 'fas fa-award' },
    { title: 'Calidad Superior', year: '2022', organization: 'Ministerio de la Producción', icon: 'fas fa-medal' }
  ];

  timeline = [
    { year: '1995', title: 'Fundación', description: 'Carlos Mendoza abre el primer taller de chocolate artesanal en el centro de Lima.' },
    { year: '2000', title: 'Primer Local Comercial', description: 'Abrimos nuestra primera tienda en Miraflores, ampliando el alcance de nuestros productos.' },
    { year: '2005', title: 'Reconocimiento Nacional', description: 'Recibimos nuestro primer premio a la calidad, consolidándonos como referentes.' },
    { year: '2010', title: 'Expansión Internacional', description: 'Comenzamos a exportar nuestros chocolates a mercados de Estados Unidos y Europa.' },
    { year: '2015', title: 'Nueva Fábrica', description: 'Inauguramos nuestra planta de producción con tecnología de punta.' },
    { year: '2020', title: 'Comercio Electrónico', description: 'Lanzamos nuestra tienda online, llevando nuestros productos a todo el Perú.' },
    { year: '2026', title: 'Innovación Continua', description: 'Seguimos creciendo con nuevas líneas de productos y expansión de mercado.' }
  ];

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
