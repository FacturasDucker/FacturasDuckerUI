import { Component, signal, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BasicUserInfo } from '../../interfaces/basicUserInfo';

@Component({
  selector: 'app-basic-info',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './basic-info.component.html',
})
export class BasicInfoComponent {
  @Output() formSubmit = new EventEmitter<BasicUserInfo>();

  userData = signal<BasicUserInfo>({
    rfc: '',
    nombre: '',
    correo: '',
    cp: '',
    estado: '',
    ciudad: '',
    colonia: '',
    calle: '',
    numeroExt: '',
  });

  updateField<K extends keyof BasicUserInfo>(key: K, value: BasicUserInfo[K]) {
    this.userData.set({
      ...this.userData(),
      [key]: value,
    });
  }

  onSubmit() {
    console.log('Datos del formulario:', this.userData());
    this.formSubmit.emit(this.userData());
  }

  // Public method to obtain the current data from the form
  // To be used by the parent component that has the external button.
  getUserData(): BasicUserInfo {
    return this.userData();
  }
}
