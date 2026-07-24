import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="admin-footer">
      <div class="footer-left">
        <span>&copy; {{ currentYear }} <strong>Chocolates Web</strong>. Todos los derechos reservados.</span>
      </div>
      <div class="footer-right">
        <span class="version">Versión 1.0.0</span>
      </div>
    </footer>
  `,
  styles: [`
    :host { display: contents; }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
