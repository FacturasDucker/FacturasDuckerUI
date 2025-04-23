import { Component } from '@angular/core';
import { FormTicketComponent } from "../../components/form-ticket/form-ticket.component";
import { ComplementIneComponent } from "../../components/complement-ine/complement-ine.component";

@Component({
  selector: 'app-information-ticket-template',
  imports: [FormTicketComponent, ComplementIneComponent],
  templateUrl: './information-ticket-template.component.html',
  styleUrl: './information-ticket-template.component.css'
})
export class InformationTicketTemplateComponent {

}
