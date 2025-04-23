import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-pdf-preview-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pdf-preview-modal.component.html'
})
export class PdfPreviewModalComponent implements OnInit, OnDestroy {
  @Input() show = false;
  @Input() fileName = '';
  @Input() pdfUrl: SafeUrl | null = null;
  @Output() closeModal = new EventEmitter<void>();
  
  ngOnInit(): void {
    // Escuchar la tecla Escape para cerrar el modal
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
  }
  
  ngOnDestroy(): void {
    // Eliminar el event listener cuando se destruye el componente
    document.removeEventListener('keydown', this.handleKeyDown.bind(this));
    
    // Asegurarse de que el scroll del body esté habilitado al destruir el componente
    document.body.style.overflow = 'auto';
  }
  
  ngOnChanges(): void {
    // Controlar el scroll del body basado en si el modal está visible
    if (this.show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }
  
  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.show) {
      this.close();
    }
  }
  
  close(): void {
    this.closeModal.emit();
    document.body.style.overflow = 'auto';
  }
}