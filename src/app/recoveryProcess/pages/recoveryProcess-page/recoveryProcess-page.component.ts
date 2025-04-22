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

  // Estado actual del proceso usando signal (Angular 17+)
  currentState = signal<RecoveryProcessState>(RecoveryProcessState.PERSONAL_DATA);

  // Datos del usuario
  userData = signal<PersonalData>({});

  // Usando inject() en lugar de constructor
  private invoiceRecoveryService = inject(InvoiceRecoveryService);

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
          // Aquí se podría mostrar un mensaje de error
        }
      },
      error: (err) => {
        console.error('Error al recuperar la factura:', err);
        this.currentState.set(RecoveryProcessState.PERSONAL_DATA);
        // Aquí se podría mostrar un mensaje de error
      }
    });
  }

  // Reinicia el proceso
  restartProcess(): void {
    this.currentState.set(RecoveryProcessState.PERSONAL_DATA);
    this.userData.set({});
  }
}
