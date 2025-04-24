import { inject, Injectable } from '@angular/core';
import { StepItem } from '../../shared/components/steper/steper.component';
import { GetDataBillService } from './processBill/get-data-bill-service';
import { catchError, EMPTY } from 'rxjs';
import { DataBillAdapter } from '../adapters/data-bill-adapter';

@Injectable({providedIn: 'root'})
export class ProccessBillService {
  private readonly _getDataBillService: GetDataBillService = inject(GetDataBillService);
  // Current active step in the billing process
  activeStep = 1;

  // Definition of steps in the billing workflow
  mySteps: StepItem[] = [
    { value: 1, header: 'Datos básicos', content: 'Información básica para tu factura' },      // Basic data step
    { value: 2, header: 'Verificacion', content: 'Información de colaboradores' },             // Verification step
    { value: 3, header: 'Detalles token', content: 'Detalle de servicios' },                   // Token details step
    { value: 4, header: 'Confirmación', content: 'Confirma los datos de tu factura' }          // Confirmation step
  ];

  dataBill: DataBillAdapter = new DataBillAdapter(); // Instance of the data bill adapter

  // Handle step change in the billing process
  onStepChange(step: number): void {
    console.log(`Paso cambiado a: ${step}`);
    this.activeStep = step;
  }

  // Method to handle file upload
  onUpload(file: File): void {
    console.log('Subiendo archivo...', file);
    this._getDataBillService
      .getDataBill(file)
      .pipe(
        catchError((err: string) => {
          console.error('Error al obtener los datos de la boleta:', err);
          return EMPTY;
        })
      )
      .subscribe((res) => {
        const dataBillResponse = DataBillAdapter.toAdapter(res?.data);
        console.log('Respuesta de la API:', dataBillResponse);
        this.dataBill = dataBillResponse; // Update the data bill with the response
        // Handle the adapted data here if needed
      });
    // TODO: Implement file upload logic
    // For example: API call, file processing, etc.
  }

  // Method to complete the billing process
  onComplete(): void {
    console.log('Proceso de facturación completado');
    // TODO: Implement process completion logic
    // For example: send data, redirect, etc.
  }
}
