// components/personal-data-form/personal-data-form.component.ts

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
  @Output() formSubmit = new EventEmitter<PersonalData>();

  // Uso de inject() en vez de inyección por constructor
  private fb = inject(FormBuilder);

  personalDataForm: FormGroup = this.fb.group({
    empresa: ['', Validators.required],
    rfcCliente: ['', Validators.required],
    token: ['', Validators.required],
    numeroGuia: ['', Validators.required]
  });

  onSubmit(): void {
    if (this.personalDataForm.valid) {
      this.formSubmit.emit(this.personalDataForm.value);
    } else {
      // Marcar todos los campos como touched para mostrar los errores
      Object.keys(this.personalDataForm.controls).forEach(key => {
        const control = this.personalDataForm.get(key);
        control?.markAsTouched();
      });
    }
  }
}
