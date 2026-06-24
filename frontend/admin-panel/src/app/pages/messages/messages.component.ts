import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Message } from '../../shared/models';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  messages: Message[] = [];
  filteredMessages: Message[] = [];
  selectedMessage: Message | null = null;
  search = '';
  filterRead = '';
  replyText = '';
  showReplyForm = false;

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages(): void {
    // TODO: Replace with actual API call
    this.messages = [
      { id: 1, nombre: 'María García', email: 'maria@example.com', telefono: '555-0101', asunto: 'Consulta sobre productos', mensaje: 'Hola, me gustaría saber si tienen chocolates sin azúcar disponibles para celíacos.', leido: false, respondido: false, fechaEnvio: '2026-06-15T10:30:00' },
      { id: 2, nombre: 'Juan Pérez', email: 'juan@example.com', asunto: 'Pedido especial', mensaje: 'Quisiera hacer un pedido de 50 cajas de bombones para un evento corporativo.', leido: true, respondido: false, fechaEnvio: '2026-06-14T15:20:00' },
      { id: 3, nombre: 'Ana López', email: 'ana@example.com', asunto: 'Sugerencia', mensaje: 'Sería genial que agregaran más opciones veganas a su catálogo.', leido: true, respondido: true, respuesta: '¡Gracias por tu sugerencia! Estamos trabajando en nuevas opciones veganas.', fechaEnvio: '2026-06-13T09:15:00' },
    ];
    this.applyFilter();
  }

  applyFilter(): void {
    let filtered = this.messages;
    if (this.search) {
      const s = this.search.toLowerCase();
      filtered = filtered.filter(m =>
        m.nombre.toLowerCase().includes(s) ||
        m.asunto.toLowerCase().includes(s) ||
        m.mensaje.toLowerCase().includes(s)
      );
    }
    if (this.filterRead === 'unread') {
      filtered = filtered.filter(m => !m.leido);
    } else if (this.filterRead === 'read') {
      filtered = filtered.filter(m => m.leido);
    } else if (this.filterRead === 'answered') {
      filtered = filtered.filter(m => m.respondido);
    }
    this.filteredMessages = filtered;
  }

  selectMessage(msg: Message): void {
    this.selectedMessage = msg;
    this.showReplyForm = false;
    this.replyText = '';
    if (!msg.leido) {
      msg.leido = true;
    }
  }

  markAsRead(msg: Message): void {
    msg.leido = true;
  }

  toggleReplyForm(): void {
    this.showReplyForm = !this.showReplyForm;
  }

  sendReply(): void {
    if (!this.replyText.trim() || !this.selectedMessage) return;
    this.selectedMessage.respuesta = this.replyText;
    this.selectedMessage.respondido = true;
    this.showReplyForm = false;
    this.replyText = '';
  }

  deleteMessage(id: number): void {
    if (confirm('¿Eliminar este mensaje?')) {
      this.messages = this.messages.filter(m => m.id !== id);
      if (this.selectedMessage?.id === id) this.selectedMessage = null;
      this.applyFilter();
    }
  }

  get unreadCount(): number {
    return this.messages.filter(m => !m.leido).length;
  }
}
