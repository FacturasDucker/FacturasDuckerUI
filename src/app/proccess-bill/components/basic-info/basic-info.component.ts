import { Component, signal, Output, EventEmitter, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BasicUserInfo } from '../../interfaces/basicUserInfo';
import { DataBillAdapter } from '../../adapters/data-bill-adapter';

@Component({
  selector: 'app-basic-info',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './basic-info.component.html',
})
export class BasicInfoComponent implements OnInit, OnChanges{
  @Input() dataBillAdapter : DataBillAdapter = new DataBillAdapter(); // Input property to receive data bill information
  @Output() formSubmit = new EventEmitter<BasicUserInfo>();
  userData : any;

  ngOnInit(): void {
    this.initializeUserData(); // Initialize user data when the component is created
    console.log('DataBillAdapter in OnInit:', this.dataBillAdapter);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Re-initialize user data when dataBillAdapter changes
    if (changes['dataBillAdapter']) {
      this.initializeUserData();
      console.log('DataBillAdapter changed:', this.dataBillAdapter);
    }
  }

  initializeUserData(): void {
    this.userData = signal<BasicUserInfo>({
      rfc: this.dataBillAdapter?.rfc || '',
      nombre: this.dataBillAdapter?.nombre || '',
      correo: 'IDS.WALTERFRANCO@GMAIL.COM',
      cp: this.dataBillAdapter?.codigo_postal || '',
      estado: 'CHIAPAS',
      ciudad: 'TUXTLA GUTIERREZ',
      colonia: 'CAPULINES 1',
      calle: '8 MANZANA L',
      numeroExt: '30',
    });
    console.log('Datos iniciales:', this.userData());
  }

  updateField<K extends keyof BasicUserInfo>(key: K, value: BasicUserInfo[K]) {
    this.userData.set({
      ...this.userData(),
      [key]: value,
    });
    console.log(this.userData());
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
