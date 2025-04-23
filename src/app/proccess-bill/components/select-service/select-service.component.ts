import { Component, signal, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'select-service-bill',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './select-service.component.html'
})
export class SelectServiceComponent implements OnInit {
  // Lista de opciones disponibles
  typeFacturations = signal<string[]>([
    "Facturacion de los boletos",
    "Facturacion de envios de primera plus",
    "Facturacion de consumo de boletos"
  ]);
  
  // Lista de constancias CF
  constanciasCf = signal<{id: string, nombre: string}[]>([]);
  
  // Valores seleccionados actualmente
  selectedService = signal<string>(this.typeFacturations()[0]);
  selectedConstanciaCf = signal<string>('');
  
  // Eventos para notificar al componente padre cuando cambia la selección
  @Output() serviceChange = new EventEmitter<string>();
  @Output() constanciaCfChange = new EventEmitter<string>();
  
  ngOnInit() {
    // Cargar las constancias CF al inicializar el componente
    this.loadConstanciasCf();
  }
  
  // Método para manejar el cambio de selección del servicio
  onServiceChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedService.set(select.value);
    this.serviceChange.emit(select.value);
  }
  
  // Método para manejar el cambio de selección de la constancia CF
  onConstanciaCfChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedConstanciaCf.set(select.value);
    this.constanciaCfChange.emit(select.value);
  }
  
  // Método para cargar las constancias CF (por ahora con datos de prueba)
  loadConstanciasCf(): void {
    // En un caso real, aquí llamarías a un servicio para obtener los datos de una API
    const constanciasFake = [
      { id: '1', nombre: 'Alejandro Pérez' },
      { id: '2', nombre: 'Rodriguez García' },
      { id: '3', nombre: 'María Sánchez' },
      { id: '4', nombre: 'José Luis Martínez' },
      { id: '5', nombre: 'Ana González' }
    ];
    
    this.constanciasCf.set(constanciasFake);
    
    // Establecer el primer valor como seleccionado por defecto si hay elementos
    if (constanciasFake.length > 0) {
      this.selectedConstanciaCf.set(constanciasFake[0].id);
      this.constanciaCfChange.emit(constanciasFake[0].id);
    }
  }
}