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
  @Output() restart = new EventEmitter<void>();

  // Usando inject() en lugar de inyección por constructor
  private invoiceRecoveryService = inject(InvoiceRecoveryService);

  // Email del cliente para mostrar en la confirmación
  emailCliente = 'ru.gomez@flecha-amarilla.com';

  // Método para descargar la factura
  downloadInvoice(): void {
    this.invoiceRecoveryService.downloadInvoice();
  }

  // Método para reiniciar el proceso
  restartProcess(): void {
    this.restart.emit();
  }
}
