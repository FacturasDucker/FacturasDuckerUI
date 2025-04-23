import { Injectable } from '@angular/core';
import { StepItem } from '../../shared/components/steper/steper.component';

@Injectable({providedIn: 'root'})
export class ProccessBillService {
  // Current active step in the billing process
  activeStep = 1;

  // Definition of steps in the billing workflow
  mySteps: StepItem[] = [
    { value: 1, header: 'Datos básicos', content: 'Información básica para tu factura' },      // Basic data step
    { value: 2, header: 'Verificacion', content: 'Información de colaboradores' },             // Verification step
    { value: 3, header: 'Detalles token', content: 'Detalle de servicios' },                   // Token details step
    { value: 4, header: 'Confirmación', content: 'Confirma los datos de tu factura' }          // Confirmation step
  ];

  // Handle step change in the billing process
  onStepChange(step: number): void {
    console.log(`Paso cambiado a: ${step}`);
    this.activeStep = step;
  }

  // Method to handle file upload
  onUpload(): void {
    console.log('Subiendo archivo...');
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
