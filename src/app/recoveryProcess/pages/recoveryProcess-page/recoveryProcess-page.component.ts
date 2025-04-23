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
  // Enum for easy access to process states in template
  readonly RecoveryProcessState = RecoveryProcessState;

  // Current process state using signal - initialized with loading state
  currentState = signal<RecoveryProcessState>(RecoveryProcessState.LOADING);

  // User data signal
  userData = signal<PersonalData>({});

  // Inject invoice recovery service
  private invoiceRecoveryService = inject(InvoiceRecoveryService);

  // Component initialization method
  ngOnInit(): void {
    // Automatically initiate search if necessary
    this.simulateLoadingProcess();
  }

  // Method to simulate loading process
  simulateLoadingProcess(): void {
    // Define example data for simulation
    const demoData: PersonalData = {
      empresa: 'Bus Tickets',
      rfcCliente: 'GOMR220829EV8',
      token: '4289089289EV91',
      numeroGuia: '37536'
    };

    // Set user data
    this.userData.set(demoData);

    // Call service to simulate invoice recovery
    this.invoiceRecoveryService.recoverInvoice(demoData).subscribe({
      next: (success) => {
        if (success) {
          this.currentState.set(RecoveryProcessState.INVOICE_READY);
        } else {
          // In case of error, return to personal data form
          this.currentState.set(RecoveryProcessState.PERSONAL_DATA);
        }
      },
      error: (err) => {
        console.error('Error recovering invoice:', err);
        this.currentState.set(RecoveryProcessState.PERSONAL_DATA);
      }
    });
  }

  // Handle personal data form submission
  handleFormSubmit(data: PersonalData): void {
    this.userData.set(data);
    this.currentState.set(RecoveryProcessState.LOADING);

    // Call service to recover invoice
    this.invoiceRecoveryService.recoverInvoice(data).subscribe({
      next: (success) => {
        if (success) {
          this.currentState.set(RecoveryProcessState.INVOICE_READY);
        } else {
          // Handle error case
          this.currentState.set(RecoveryProcessState.PERSONAL_DATA);
        }
      },
      error: (err) => {
        console.error('Error recovering invoice:', err);
        this.currentState.set(RecoveryProcessState.PERSONAL_DATA);
      }
    });
  }

  // Restart the process
  restartProcess(): void {
    this.currentState.set(RecoveryProcessState.PERSONAL_DATA);
    this.userData.set({});
  }
}
