import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() show = false;
  @Input() title = '';
  @Input() modalType: 'default' | 'welcome' | 'final' | 'warning' | 'success' = 'default';
  @Input() buttonText = 'Aceptar';
  @Output() close = new EventEmitter<void>();
  @Output() buttonClick = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }

  onButtonClick(): void {
    this.buttonClick.emit();
    // También cerramos el modal por defecto al hacer clic en el botón
    this.close.emit();
  }

  // Previene que los clics dentro del contenido del modal se propaguen al overlay
  stopPropagation(event: MouseEvent): void {
    event.stopPropagation();
  }

  // Determina la clase de color para el botón según el tipo de modal
  get buttonColorClass(): string {
    switch (this.modalType) {
      case 'welcome':
        return 'bg-orange-500 hover:bg-orange-600';
      case 'final':
        return 'bg-blue-600 hover:bg-blue-700';
      case 'warning':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'success':
        return 'bg-green-600 hover:bg-green-700';
      default:
        return 'bg-orange-500 hover:bg-orange-600';
    }
  }

  // Determina el icono según el tipo de modal
  get modalIcon(): string {
    switch (this.modalType) {
      case 'welcome':
        return 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'; // Checkmark in circle
      case 'final':
        return 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'; // Info icon
      case 'warning':
        return 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'; // Warning triangle
      case 'success':
        return 'M5 13l4 4L19 7'; // Simple checkmark
      default:
        return '';
    }
  }
}
