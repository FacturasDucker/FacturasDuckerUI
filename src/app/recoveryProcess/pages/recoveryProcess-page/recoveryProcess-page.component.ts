// pages/recoveryProcess-page/recoveryProcess-page.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalDataFormComponent } from '../../components/personal-data-form/personal-data-form.component';
import { LoadingStateComponent } from '../../components/loading-state/loading-state.component';
import { InvoiceReadyComponent } from '../../components/invoice-ready/invoice-ready.component';
import { InvoiceRecoveryService } from '../../services/invoice-recovery.service';
import { PersonalData, RecoveryProcessState } from '../../interfaces/recovery-process.interface';
import { signal, inject } from '@angular/core';
import { NavBarHomeComponent } from "../../../shared/components/navBarHome/navBarHome.component";

@Component({
  selector: 'app-recovery-process-page',
  templateUrl: './recoveryProcess-page.component.html',
  standalone: true,
  imports: [
    CommonModule,
    PersonalDataFormComponent,
    LoadingStateComponent,
    InvoiceReadyComponent,
    NavBarHomeComponent
  ]
})
export class RecoveryProcessPageComponent {
  // Enumeración para facilitar el acceso a los estados en el template
  readonly RecoveryProcessState = RecoveryProcessState;

  // Estado actual del proceso usando signal - inicializamos directamente con el estado de carga
  currentState = signal<RecoveryProcessState>(RecoveryProcessState.LOADING);

  // Datos del usuario
  userData = signal<PersonalData>({});

  // Usando inject() en lugar de constructor
  private invoiceRecoveryService = inject(InvoiceRecoveryService);

  // Método para inicializar el componente
  ngOnInit(): void {
    // Aquí puedes iniciar una búsqueda automática si es necesario
    this.simulateLoadingProcess();
  }

  // Método para simular el proceso de carga
  simulateLoadingProcess(): void {
    // Definimos datos de ejemplo para la simulación
    const demoData: PersonalData = {
      empresa: 'Boletos de Autobús',
      rfcCliente: 'GOMR220829EV8',
      token: '4289089289EV91',
      numeroGuia: '37536'
    };

    // Establecemos los datos del usuario
    this.userData.set(demoData);

    // Llamamos al servicio para simular la recuperación
    this.invoiceRecoveryService.recoverInvoice(demoData).subscribe({
      next: (success) => {
        if (success) {
          this.currentState.set(RecoveryProcessState.INVOICE_READY);
        } else {
          // En caso de error, pasamos al formulario de datos
          this.currentState.set(RecoveryProcessState.PERSONAL_DATA);
        }
      },
      error: (err) => {
        console.error('Error al recuperar la factura:', err);
        this.currentState.set(RecoveryProcessState.PERSONAL_DATA);
      }
    });
  }

  // Maneja el envío del formulario de datos personales
  handleFormSubmit(data: PersonalData): void {
    this.userData.set(data);
    this.currentState.set(RecoveryProcessState.LOADING);

    // Llamar al servicio para recuperar la factura
    this.invoiceRecoveryService.recoverInvoice(data).subscribe({
      next: (success) => {
        if (success) {
          this.currentState.set(RecoveryProcessState.INVOICE_READY);
        } else {
          // Manejar caso de error
          this.currentState.set(RecoveryProcessState.PERSONAL_DATA);
        }
      },
      error: (err) => {
        console.error('Error al recuperar la factura:', err);
        this.currentState.set(RecoveryProcessState.PERSONAL_DATA);
      }
    });
  }

  // Reinicia el proceso
  restartProcess(): void {
    this.currentState.set(RecoveryProcessState.PERSONAL_DATA);
    this.userData.set({});
  }
}
