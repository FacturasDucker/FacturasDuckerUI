import { Component, Input, Output, EventEmitter, ContentChild, TemplateRef, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

// Interface defining structure of a step
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
  // Default predefined steps
  @Input() steps: StepItem[] = [
    { value: 1, header: 'Basic Data', content: 'Step 1' },
    { value: 2, header: 'Confirmation', content: 'Step 2' },
    { value: 3, header: 'Token Details', content: 'Step 3' },
  ];

  @Input() currentStep = 1;
  @Output() stepChange = new EventEmitter<number>();
  @Output() complete = new EventEmitter<void>();

  // References to custom content templates
  @ContentChild('content1') content1?: TemplateRef<any>;
  @ContentChild('content2') content2?: TemplateRef<any>;
  @ContentChild('content3') content3?: TemplateRef<any>;

  // Properties for tracking progress
  completedSteps: boolean[] = [false, false, false];
  previousStepValue = 1; // To track change direction
  direction: 'forward' | 'backward' = 'forward'; // For CSS

  // Lifecycle hook to update completed steps
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentStep']) {
      this.updateCompletedSteps();
    }
  }

  // Update the state of completed steps
  updateCompletedSteps(): void {
    for (let i = 0; i < this.steps.length; i++) {
      this.completedSteps[i] = this.currentStep > this.steps[i].value;
    }
  }

  // Activate a specific step
  activateStep(stepValue: number): void {
    // Determine direction for CSS animations
    this.direction = stepValue > this.currentStep ? 'forward' : 'backward';

    // Mark previous steps as completed
    const oldStep = this.currentStep;
    this.previousStepValue = this.currentStep; // Save previous value
    this.currentStep = stepValue;

    // If moving forward, mark intermediate steps as completed
    if (stepValue > oldStep) {
      for (let i = oldStep; i < stepValue; i++) {
        this.completedSteps[i-1] = true;
      }
    }

    this.updateCompletedSteps();
    this.stepChange.emit(stepValue);
  }

  // Move to next step
  nextStep(): void {
    if (this.currentStep < this.steps.length) {
      this.activateStep(this.currentStep + 1);
    } else {
      this.completeProcess();
    }
  }

  // Move to previous step
  previousStep(): void {
    if (this.currentStep > 1) {
      this.activateStep(this.currentStep - 1);
    }
  }

  // Complete the entire process
  completeProcess(): void {
    this.completedSteps[this.steps.length - 1] = true;
    this.complete.emit();
  }

  // Check if a step is currently active
  isActive(step: number): boolean {
    return this.currentStep === step;
  }

  // Check if a step is completed
  isCompleted(step: number): boolean {
    return this.completedSteps[step - 1];
  }

  // Get content template for a specific step
  getContentTemplate(stepValue: number): TemplateRef<any> | null {
    switch (stepValue) {
      case 1: return this.content1 || null;
      case 2: return this.content2 || null;
      case 3: return this.content3 || null;
      default: return null;
    }
  }

  // Check if there's custom content for a step
  hasCustomContent(stepValue: number): boolean {
    return this.getContentTemplate(stepValue) !== null;
  }
}
