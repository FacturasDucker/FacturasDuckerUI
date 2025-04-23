/**
 * Nombre: UploadFiscalConstancyComponent
 * Ubicación: src/app/profile/components/upload-fiscal-constancy/upload-fiscal-constancy.component.ts
 * Descripción: Componente para la carga de constancias fiscales.
 * Permite arrastrar y soltar archivos PDF o seleccionarlos mediante un botón.
 */
import { Component, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload-fiscal-constancy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload-fiscal-constancy.component.html'
})
export class UploadFiscalConstancyComponent {
  @Output() uploadComplete = new EventEmitter<File>();

  isDragging = signal<boolean>(false);
  selectedFile = signal<File | null>(null);

  get fileName(): string {
    return this.selectedFile()?.name || '';
  }

  // Método para manejar cuando se arrastra un archivo sobre el componente
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(true);
  }

  // Método para manejar cuando se deja de arrastrar sobre el componente
  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);
  }

  // Método para manejar cuando se suelta un archivo en el componente
  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFile(files[0]);
    }
  }

  // Método para manejar cuando se selecciona un archivo a través del input
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFile(input.files[0]);
    }
  }

  // Método común para procesar el archivo seleccionado
  handleFile(file: File): void {
    // Verificar si es un PDF
    if (file.type !== 'application/pdf') {
      alert('Por favor, selecciona un archivo PDF');
      return;
    }

    this.selectedFile.set(file);
  }

  // Método para borrar el archivo seleccionado
  clearFile(): void {
    this.selectedFile.set(null);
  }

  // Método para cargar el archivo
  uploadFile(): void {
    const file = this.selectedFile();
    if (file) {
      this.uploadComplete.emit(file);
    } else {
      alert('Por favor, selecciona un archivo primero');
    }
  }
}
