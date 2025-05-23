import { Component } from '@angular/core';
import { FormTicketComponent } from "../../components/form-ticket/form-ticket.component";

@Component({
  selector: 'app-information-ticket-template',
  standalone: true, // Added standalone decorator
  imports: [FormTicketComponent],
  templateUrl: './information-ticket-template.component.html',
  styleUrl: './information-ticket-template.component.css'
})
export class InformationTicketTemplateComponent {
  // Template component for ticket information
  // Responsible for rendering the ticket form component
}
