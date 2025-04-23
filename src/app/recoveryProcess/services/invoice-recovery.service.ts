// Service responsible for managing invoice recovery workflow and loading states

import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { PersonalData } from '../interfaces/recovery-process.interface';

@Injectable({
  providedIn: 'root'
})
export class InvoiceRecoveryService {
  // Señal para manejar el estado de carga
  isLoading = signal(false);

  constructor() { }

  /**
   * Simula el proceso de recuperación de una factura
   * @param personalData Datos personales del usuario
   * @returns Observable que emite un booleano cuando el proceso finaliza
   */
  recoverInvoice(personalData: PersonalData): Observable<boolean> {
    this.isLoading.set(true);

    // Simulamos un retraso de 3 segundos para emular la llamada al servidor
    return of(true).pipe(delay(3000));
  }

  /**
   * Descarga la factura recuperada
   */
  downloadInvoice(): void {
    console.log('Descargando factura...');
    // Aquí iría la lógica real para descargar el archivo
  }
}
