import { Injectable } from '@angular/core';
import { StepItem } from '../../shared/components/steper/steper.component';

@Injectable({providedIn: 'root'})
export class ProccessBillService {
    
    activeStep = 1;
    
    mySteps: StepItem[] = [
      { value: 1, header: 'Datos básicos', content: 'Información básica para tu factura' },
      { value: 2, header: 'Verificacion', content: 'Información de colaboradores' },
      { value: 3, header: 'Detalles token', content: 'Detalle de servicios' },
      { value: 4, header: 'Confirmación', content: 'Confirma los datos de tu factura' }
    ];
    
    onStepChange(step: number): void {
      console.log(`Paso cambiado a: ${step}`);
      this.activeStep = step;
    }
    
    // Nuevos métodos para manejar acciones adicionales
    onUpload(): void {
      console.log('Subiendo archivo...');
      // Implementar lógica de carga de archivo
      // Por ejemplo: llamada a API, procesamiento, etc.
    }
    
    onComplete(): void {
      console.log('Proceso de facturación completado');
      // Implementar lógica de finalización
      // Por ejemplo: enviar datos, redirigir, etc.
    }
}