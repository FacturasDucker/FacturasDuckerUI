import { Component, inject } from '@angular/core';
import { TicketService } from '../../services/ticketServices';

@Component({
  selector: 'bill-form-ticket',
  imports: [],
  templateUrl: './form-ticket.component.html',
  styleUrl: './form-ticket.component.css'
})
export class FormTicketComponent {
  ticketServices = inject(TicketService)  
  
}
