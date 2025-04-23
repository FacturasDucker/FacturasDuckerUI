// form-ticket.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TicketService } from '../../services/ticketServices';
import { Ticket } from '../../interfaces/ticket';

@Component({
  selector: 'bill-form-ticket',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-ticket.component.html',
  styleUrl: './form-ticket.component.css'
})
export class FormTicketComponent implements OnInit {
  ticketServices = inject(TicketService);
  ticket = this.ticketServices.getTicket();
  usosCfdi: string[] = this.ticketServices.getCfdi();
  formasPago = this.ticketServices.getFormasPago();
  regimenesFiscales = this.ticketServices.getRegimenesFiscales(); // Obtenemos los regímenes fiscales
  
  // Variables para fecha y hora
  fechaActual: string = '';
  horaActual: string = '';
  
  ngOnInit() {
    // Inicializar fecha y hora actuales
    this.setCurrentDateTime();
  }
  
  // Método para establecer fecha y hora actuales
  setCurrentDateTime() {
    const now = new Date();
    
    // Formato para fecha: YYYY-MM-DD (para input type="date")
    this.fechaActual = now.toISOString().split('T')[0];
    
    // Formato para hora: HH:MM (para input type="time")
    this.horaActual = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  }

  // Método para actualizar campos individuales del ticket
  updateTicket<K extends keyof Ticket>(key: K, value: Ticket[K]) {
    // Creamos una copia con los valores actualizados
    const updatedTicket = {
      ...this.ticket,
      [key]: value
    };
    
    // Actualizamos el servicio
    this.ticketServices.updateTicket(updatedTicket);
    
    // Actualizamos la referencia local
    this.ticket = updatedTicket;
  }
}