import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PersonalData } from '../../interfaces/recovery-process.interface';

@Component({
  selector: 'app-personal-data-form',
  templateUrl: './personal-data-form.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class PersonalDataFormComponent {
  // Event emitter for form submission
  @Output() formSubmit = new EventEmitter<PersonalData>();

  // Inject FormBuilder using dependency injection
  private fb = inject(FormBuilder);

  // Reactive form group with validation
  personalDataForm: FormGroup = this.fb.group({
    empresa: ['', Validators.required],      // Company name (required)
    rfcCliente: ['', Validators.required],   // Client RFC (required)
    token: ['', Validators.required],        // Token (required)
    numeroGuia: ['', Validators.required]    // Guide number (required)
  });

  // Handle form submission
  onSubmit(): void {
    if (this.personalDataForm.valid) {
      // Emit form values if form is valid
      this.formSubmit.emit(this.personalDataForm.value);
    } else {
      // Mark all form controls as touched to show validation errors
      Object.keys(this.personalDataForm.controls).forEach(key => {
        const control = this.personalDataForm.get(key);
        control?.markAsTouched();
      });
    }
  }
}
