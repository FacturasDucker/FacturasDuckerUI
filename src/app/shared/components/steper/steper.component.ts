import { Component, Input, Output, EventEmitter, ContentChild, TemplateRef, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface StepItem {
  value: number;
  header: string;
  content: string;
}

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './steper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements OnChanges {
  // Pasos fijos predeterminados
  @Input() steps: StepItem[] = [
    { value: 1, header: 'Datos básicos', content: 'Paso 1' },
    { value: 2, header: 'Confirmacion', content: 'Paso 2' },
    { value: 3, header: 'Detalles token', content: 'Paso 3' },
  ];
  
  @Input() currentStep = 1;
  @Output() stepChange = new EventEmitter<number>();
  @Output() complete = new EventEmitter<void>();

  // Referencias a las plantillas de contenido personalizado
  @ContentChild('content1') content1?: TemplateRef<any>;
  @ContentChild('content2') content2?: TemplateRef<any>;
  @ContentChild('content3') content3?: TemplateRef<any>;
  
  // Propiedades para el seguimiento del progreso
  completedSteps: boolean[] = [false, false, false];
  previousStepValue = 1; // Para rastrear la dirección del cambio
  direction: 'forward' | 'backward' = 'forward'; // Para CSS
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentStep']) {
      this.updateCompletedSteps();
    }
  }
  
  // Actualiza el estado de los pasos completados
  updateCompletedSteps(): void {
    for (let i = 0; i < this.steps.length; i++) {
      this.completedSteps[i] = this.currentStep > this.steps[i].value;
    }
  }
  
  // Métodos públicos para ser utilizados externamente
  activateStep(stepValue: number): void {
    // Determinar dirección para animaciones CSS
    this.direction = stepValue > this.currentStep ? 'forward' : 'backward';
    
    // Marcar todos los pasos anteriores como completados
    const oldStep = this.currentStep;
    this.previousStepValue = this.currentStep; // Guardar el valor anterior
    this.currentStep = stepValue;
    
    // Si avanzamos hacia adelante, marcar todos los pasos intermedios como completados
    if (stepValue > oldStep) {
      for (let i = oldStep; i < stepValue; i++) {
        this.completedSteps[i-1] = true;
      }
    }
    
    this.updateCompletedSteps();
    this.stepChange.emit(stepValue);
  }
  
  // Método para avanzar al siguiente paso
  nextStep(): void {
    if (this.currentStep < this.steps.length) {
      this.activateStep(this.currentStep + 1);
    } else {
      this.completeProcess();
    }
  }
  
  // Método para regresar al paso anterior
  previousStep(): void {
    if (this.currentStep > 1) {
      this.activateStep(this.currentStep - 1);
    }
  }
  
  // Método para completar el proceso
  completeProcess(): void {
    this.completedSteps[this.steps.length - 1] = true;
    this.complete.emit();
  }

  isActive(step: number): boolean {
    return this.currentStep === step;
  }

  isCompleted(step: number): boolean {
    return this.completedSteps[step - 1];
  }
  
  // Método para obtener la plantilla correspondiente al paso actual
  getContentTemplate(stepValue: number): TemplateRef<any> | null {
    switch (stepValue) {
      case 1: return this.content1 || null;
      case 2: return this.content2 || null;
      case 3: return this.content3 || null;
      default: return null;
    }
  }
  
  // Comprueba si hay contenido personalizado para este paso
  hasCustomContent(stepValue: number): boolean {
    return this.getContentTemplate(stepValue) !== null;
  }
}