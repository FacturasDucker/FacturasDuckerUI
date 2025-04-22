import { Injectable, signal } from '@angular/core';
import { Ticket } from '../interfaces/ticket';

@Injectable({providedIn: 'root'})
export class TicketService {
    
    ticket = signal<Ticket>({
        formaPago:"Efectivo",
        tokenTicket:"4285065926RSV91",
        regimenFiscal:605,
        usoCfdi:"s01"
    })
    

}