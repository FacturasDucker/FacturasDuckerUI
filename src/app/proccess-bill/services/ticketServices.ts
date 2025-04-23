// services/ticketServices.ts
import { Injectable, signal } from '@angular/core';
import { Ticket } from '../interfaces/ticket';
import { usoCfdi } from '../data/uso_cfdi';
import { formaPago } from '../data/forma_pago';
import { regimenFiscal } from '../data/regimen_fiscal';

@Injectable({providedIn: 'root'})
export class TicketService {
    ticket = signal<Ticket>({
        formaPago: "01",
        tokenTicket: "4285065926RSV91",
        regimenFiscal: "605", // Cambiado a string para ser coherente
        usoCfdi: "s01",
        evidenciaImagen: null
    });

    getTicket(): Ticket {
        return this.ticket();
    }

    getCfdi(): string[] {
        return usoCfdi;
    }

    getFormasPago() {
        return formaPago;
    }

    getRegimenesFiscales() {
        return regimenFiscal;
    }

    // Método para actualizar el ticket completo
    updateTicket(newTicket: Ticket) {
        this.ticket.set(newTicket);
    }

    // Método para actualizar campos individuales
    updateTicketField<K extends keyof Ticket>(field: K, value: Ticket[K]) {
        this.ticket.update(currentTicket => ({
            ...currentTicket,
            [field]: value
        }));
    }

    // Método específico para actualizar la imagen de evidencia
    updateEvidenciaImagen(file: File | null) {
        this.updateTicketField('evidenciaImagen', file);
    }
}
