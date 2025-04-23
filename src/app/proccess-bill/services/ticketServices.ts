import { Injectable, signal } from '@angular/core';
import { Ticket } from '../interfaces/ticket';
import { usoCfdi } from '../data/uso_cfdi';
import { formaPago } from '../data/forma_pago';
import { regimenFiscal } from '../data/regimen_fiscal';

@Injectable({providedIn: 'root'})
export class TicketService {
  // Reactive signal to store ticket information
  ticket = signal<Ticket>({
    formaPago: "01",          // Default payment method
    tokenTicket: "4285065926RSV91", // Unique ticket identifier
    regimenFiscal: "605",     // Default fiscal regime
    usoCfdi: "s01",           // Default CFDI usage
    evidenciaImagen: null     // Optional evidence image
  });

  // Retrieve current ticket information
  getTicket(): Ticket {
    return this.ticket();
  }

  // Get list of CFDI usage codes
  getCfdi(): string[] {
    return usoCfdi;
  }

  // Get list of payment methods
  getFormasPago() {
    return formaPago;
  }

  // Get list of fiscal regimes
  getRegimenesFiscales() {
    return regimenFiscal;
  }

  // Update entire ticket object
  updateTicket(newTicket: Ticket) {
    this.ticket.set(newTicket);
  }

  // Partially update a specific field of the ticket
  updateTicketField<K extends keyof Ticket>(field: K, value: Ticket[K]) {
    this.ticket.update(currentTicket => ({
      ...currentTicket,
      [field]: value
    }));
  }

  // Specific method to update evidence image
  updateEvidenciaImagen(file: File | null) {
    this.updateTicketField('evidenciaImagen', file);
  }
}
