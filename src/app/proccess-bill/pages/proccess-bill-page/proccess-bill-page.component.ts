import { Component, inject, ViewChild } from '@angular/core';
import { NavBarHomeComponent } from "../../../shared/components/navBarHome/navBarHome.component";
import { ProccessBillService } from '../../services/proccess-bill-services';
import { StepperComponent } from "../../../shared/components/steper/steper.component";
import { HeaderSectionComponent } from "../../components/header-section/header-section.component";
import { SituationFiscalTemplateComponent } from "../../templates/situation-fiscal-template/situation-fiscal-template.component";
import { VerificacionTemplateComponent } from "../../templates/verificacion-template/verificacion-template.component";
import { InformationTicketTemplateComponent } from "../../templates/information-ticket-template/information-ticket-template.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-proccess-bill-page',
  standalone: true,
  // Import necessary components for the billing process page
  imports: [
    CommonModule,
    NavBarHomeComponent,
    StepperComponent,
    HeaderSectionComponent,
    SituationFiscalTemplateComponent,
    VerificacionTemplateComponent,
    InformationTicketTemplateComponent
  ],
  templateUrl: './proccess-bill-page.component.html',
  styleUrls: ['./proccess-bill-page.component.css']
})
export class ProccessBillPageComponent {
  // Reference to the stepper component in the template
  @ViewChild('stepper') stepper!: StepperComponent;

  // Inject billing process service
  private proccessBillService = inject(ProccessBillService);

  // Steps configuration from the service
  mySteps = this.proccessBillService.mySteps;

  // Current active step from the service
  activeStep = this.proccessBillService.activeStep;

  // Method to handle step changes, bound to the service method
  onStepChange = this.proccessBillService.onStepChange.bind(this.proccessBillService);

  // Method to handle file uploads, bound to the service method
  onUpload = this.proccessBillService.onUpload.bind(this.proccessBillService);

  // Method to handle process completion, bound to the service method
  onComplete = this.proccessBillService.onComplete.bind(this.proccessBillService);
}
