import { Component, signal, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'select-service-bill',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './select-service.component.html'
})
export class SelectServiceComponent {
  // Lista de opciones disponibles
  typeFacturations = signal<string[]>([
    "Facturacion de los boletos",
    "Facturacion de envios de primera plus",
    "Facturacion de consumo de boletos"
  ]);
  
  // Valor seleccionado actualmente
  selectedService = signal<string>(this.typeFacturations()[0]);
  
  // Evento para notificar al componente padre cuando cambia la selección
  @Output() serviceChange = new EventEmitter<string>();
  
  // Método para manejar el cambio de selección
  onServiceChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedService.set(select.value)
    this.serviceChange.emit(select.value);
  }
}