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

  // Variables for date and time
  fechaActual: string = '';
  horaActual: string = '';

  ngOnInit() {
    // Initialize current date and time
    this.setCurrentDateTime();
  }

  // Method to set current date and time
  setCurrentDateTime() {
    const now = new Date();

    // Date format: YYYYY-MM-DD (for input type="date").
    this.fechaActual = now.toISOString().split('T')[0];

    // Format for time: HH:MM (for input type="time")
    this.horaActual = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  }

  // Method to update individual ticket fields
  updateTicket<K extends keyof Ticket>(key: K, value: Ticket[K]) {
    // Creamos una copia con los valores actualizados
    const updatedTicket = {
      ...this.ticket,
      [key]: value
    };

    // We update the service
    this.ticketServices.updateTicket(updatedTicket);

    // We update the local reference
    this.ticket = updatedTicket;
  }
}
