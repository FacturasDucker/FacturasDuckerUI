// test-page.component.ts
import { Component } from '@angular/core';
import { StepperComponent,StepItem } from '../../shared/components/steper/steper.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test-page',
  imports: [StepperComponent,CommonModule],
  standalone: true,
  templateUrl: './test-page.component.html',
})
export class TestPageComponent {
  activeStep = 1;

  mySteps: StepItem[] = [
    { value: 1, header: 'Inicio', content: 'Paso inicial' },
    { value: 2, header: 'Configuración', content: 'Opciones' },
    { value: 3, header: 'Configuración de ticket', content: 'Opciones' },
    { value: 4, header: 'Finalizar', content: 'Completado' }
  ];

  onStepChange(step: number): void {
    console.log(`Paso cambiado a: ${step}`);
    this.activeStep = step;
    
    // Aquí puedes agregar tu lógica personalizada al cambiar de paso
  }
}