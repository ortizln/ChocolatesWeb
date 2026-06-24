import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm = { name: '', email: '', phone: '', message: '' };
  formSubmitted = false;
  formSuccess = false;

  socialLinks = [
    { platform: 'Facebook', url: 'https://facebook.com', icon: 'fab fa-facebook-f', color: '#1877F2' },
    { platform: 'Instagram', url: 'https://instagram.com', icon: 'fab fa-instagram', color: '#E1306C' },
    { platform: 'Twitter', url: 'https://twitter.com', icon: 'fab fa-twitter', color: '#1DA1F2' },
    { platform: 'Pinterest', url: 'https://pinterest.com', icon: 'fab fa-pinterest-p', color: '#E60023' },
    { platform: 'YouTube', url: 'https://youtube.com', icon: 'fab fa-youtube', color: '#FF0000' },
    { platform: 'TikTok', url: 'https://tiktok.com', icon: 'fab fa-tiktok', color: '#000000' }
  ];

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  submitForm(): void {
    this.formSubmitted = true;
    if (this.contactForm.name && this.contactForm.email && this.contactForm.message) {
      this.formSuccess = true;
      setTimeout(() => {
        this.formSuccess = false;
        this.formSubmitted = false;
        this.contactForm = { name: '', email: '', phone: '', message: '' };
      }, 3000);
    }
  }

  isValid(field: string): boolean {
    if (!this.formSubmitted) return true;
    switch (field) {
      case 'name': return !!this.contactForm.name;
      case 'email': return !!this.contactForm.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.contactForm.email);
      case 'message': return !!this.contactForm.message;
      default: return true;
    }
  }
}
