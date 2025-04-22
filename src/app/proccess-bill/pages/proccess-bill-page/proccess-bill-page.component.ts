import { Component, inject } from '@angular/core';
import { NavBarHomeComponent } from "../../../shared/components/navBarHome/navBarHome.component";

import { ProccessBillService } from '../../services/proccess-bill-services';
import { StepperComponent } from "../../../shared/components/steper/steper.component";
import { HeaderSectionComponent } from "../../components/header-section/header-section.component";
import { SituationFiscalTemplateComponent } from "../../templates/situation-fiscal-template/situation-fiscal-template.component";
import { VerificacionTemplateComponent } from "../../templates/verificacion-template/verificacion-template.component";
import { InformationTicketTemplateComponent } from "../../templates/information-ticket-template/information-ticket-template.component";

@Component({
  selector: 'app-proccess-bill-page',
  standalone: true,
  imports: [NavBarHomeComponent, StepperComponent, HeaderSectionComponent, SituationFiscalTemplateComponent, VerificacionTemplateComponent, InformationTicketTemplateComponent],
  templateUrl: './proccess-bill-page.component.html',
  styleUrls: ['./proccess-bill-page.component.css']
})
export class ProccessBillPageComponent {
  private proccessBillService = inject(ProccessBillService);
  
  mySteps = this.proccessBillService.mySteps;
  activeStep = this.proccessBillService.activeStep;
  
  onStepChange = this.proccessBillService.onStepChange.bind(this.proccessBillService);
  onUpload = this.proccessBillService.onUpload.bind(this.proccessBillService);
  onComplete = this.proccessBillService.onComplete.bind(this.proccessBillService);
}