// stepper.component.ts
import { Component, Input, Output, EventEmitter, ContentChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface StepItem {
  value: number;
  header: string;
  content: string;
}

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [CommonModule], // Importando CommonModule para poder usar ngTemplateOutlet
  templateUrl: './steper.component.html',
})
export class StepperComponent {
  @Input() steps: StepItem[] = [
    { value: 1, header: 'Header I', content: 'Content I' },
    { value: 2, header: 'Header II', content: 'Content II' },
    { value: 3, header: 'Header III', content: 'Content III' }
  ];
  
  @Input() currentStep = 1;
  @Output() stepChange = new EventEmitter<number>();

  // Referencias a las plantillas de contenido personalizado
  @ContentChild('content1') content1?: TemplateRef<any>;
  @ContentChild('content2') content2?: TemplateRef<any>;
  @ContentChild('content3') content3?: TemplateRef<any>;
  @ContentChild('content4') content4?: TemplateRef<any>;
  
  activateStep(stepValue: number): void {
    this.currentStep = stepValue;
    this.stepChange.emit(stepValue);
  }

  isActive(step: number): boolean {
    return this.currentStep === step;
  }

  isCompleted(step: number): boolean {
    return this.currentStep > step;
  }
  
  // Método para obtener la plantilla correspondiente al paso actual
  getContentTemplate(stepValue: number): TemplateRef<any> | null {
    switch (stepValue) {
      case 1: return this.content1 || null;
      case 2: return this.content2 || null;
      case 3: return this.content3 || null;
      case 4: return this.content4 || null;
      default: return null;
    }
  }
  
  // Comprueba si hay contenido personalizado para este paso
  hasCustomContent(stepValue: number): boolean {
    return this.getContentTemplate(stepValue) !== null;
  }
}