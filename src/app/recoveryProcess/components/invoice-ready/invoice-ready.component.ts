// components/invoice-ready/invoice-ready.component.ts
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceRecoveryService } from '../../services/invoice-recovery.service';

@Component({
  selector: 'app-invoice-ready',
  templateUrl: './invoice-ready.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class InvoiceReadyComponent {
  // Event emitter to trigger process restart
  @Output() restart = new EventEmitter<void>();

  // Inject invoice recovery service using dependency injection
  private invoiceRecoveryService = inject(InvoiceRecoveryService);

  // Client email to display in confirmation
  emailCliente = 'ru.gomez@flecha-amarilla.com';

  // Method to download the invoice
  downloadInvoice(): void {
    this.invoiceRecoveryService.downloadInvoice();
  }

  // Method to restart the process
  restartProcess(): void {
    this.restart.emit();
  }
}
