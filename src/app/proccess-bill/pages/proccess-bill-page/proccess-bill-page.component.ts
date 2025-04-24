import { Component, inject, ViewChild, OnInit, signal, effect } from '@angular/core';
import { NavBarHomeComponent } from "../../../shared/components/navBarHome/navBarHome.component";
import { ProccessBillService } from '../../services/proccess-bill-services';
import { StepperComponent } from "../../../shared/components/steper/steper.component";
import { HeaderSectionComponent } from "../../components/header-section/header-section.component";
import { SituationFiscalTemplateComponent } from "../../templates/situation-fiscal-template/situation-fiscal-template.component";
import { VerificacionTemplateComponent } from "../../templates/verificacion-template/verificacion-template.component";
import { InformationTicketTemplateComponent } from "../../templates/information-ticket-template/information-ticket-template.component";
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../../shared/components/modal/modal.component';

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
    InformationTicketTemplateComponent,
    ModalComponent
  ],
  templateUrl: './proccess-bill-page.component.html',
  styleUrls: ['./proccess-bill-page.component.css']
})
export class ProccessBillPageComponent implements OnInit {
  // Reference to the stepper component in the template
  @ViewChild('stepper') stepper!: StepperComponent;

  // Inject billing process service
  private proccessBillService = inject(ProccessBillService);

  // Modal control
  showWelcomeModal = signal<boolean>(false);
  showFinalModal = signal<boolean>(false);
  modalType = signal<'welcome' | 'final'>('welcome');

  // Modal content signals
  modalTitle = signal<string>('');
  modalContent = signal<string>('');

  // Steps configuration from the service
  mySteps = this.proccessBillService.mySteps;

  // Current active step from the service
  activeStep = signal<number>(this.proccessBillService.activeStep);

  constructor() {
    // Efecto para observar cambios en el paso activo
    effect(() => {
      const currentStep = this.activeStep();

      // Actualizar el valor en el servicio
      this.proccessBillService.activeStep = currentStep;

      // Mostrar modal según el paso
      if (currentStep === 1) {
        this.showWelcomeModalForStep1();
      } else if (currentStep === 3 || currentStep === 4) {
        this.showFinalModalForStep3();
      }
    });
  }

  ngOnInit() {
    // Mostrar el modal de bienvenida automáticamente al iniciar
    setTimeout(() => {
      this.showWelcomeModalForStep1();
    }, 300);
  }

  // Método para configurar y mostrar el modal de bienvenida (paso 1)
  showWelcomeModalForStep1() {
    this.modalType.set('welcome');
    this.modalTitle.set('Bienvenido al Proceso de Facturación');
    this.modalContent.set(`
      <p class="mb-4">Bienvenido al sistema de facturación de Flecha Amarilla.</p>
      <p class="mb-4">Para generar su factura, necesitará seguir los siguientes pasos:</p>
      <ol class="list-decimal pl-5 mb-4">
        <li class="mb-2">Cargar su constancia de situación fiscal (opcional pero recomendado)</li>
        <li class="mb-2">Verificar y proporcionar sus datos fiscales</li>
        <li class="mb-2">Ingresar la información del ticket o servicio a facturar</li>
      </ol>
      <p>El proceso es sencillo y le tomará solo unos minutos completarlo.</p>
    `);
    this.showWelcomeModal.set(true);
  }

  // Método para configurar y mostrar el modal del paso final (paso 3)
  showFinalModalForStep3() {
    this.modalType.set('final');
    this.modalTitle.set('Confirmación de Datos');
    this.modalContent.set(`
      <p class="mb-4">Estás en el último paso del proceso de facturación.</p>
      <p class="mb-4">Por favor, verifica que todos los datos ingresados sean correctos antes de continuar:</p>
      <ul class="list-disc pl-5 mb-4">
        <li class="mb-2">Datos fiscales</li>
        <li class="mb-2">Información del ticket</li>
        <li class="mb-2">Método de pago seleccionado</li>
      </ul>
      <p class="font-semibold">Una vez emitida la factura, no se podrán realizar cambios.</p>
    `);
    this.showFinalModal.set(true);
  }

  // Method to handle step changes
  onStepChange(step: number): void {
    this.activeStep.set(step);
    this.proccessBillService.onStepChange(step);
  }

  // Method to handle file uploads, bound to the service method
  onUpload = this.proccessBillService.onUpload.bind(this.proccessBillService);

  // Method to handle process completion, bound to the service method
  onComplete = this.proccessBillService.onComplete.bind(this.proccessBillService);

  // Method to close welcome modal
  closeWelcomeModal() {
    this.showWelcomeModal.set(false);
  }

  // Method to close final modal
  closeFinalModal() {
    this.showFinalModal.set(false);
  }
}
